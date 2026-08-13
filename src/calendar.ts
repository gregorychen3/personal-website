import { google } from "googleapis";
import { GOOGLE_API_KEY } from "./config";

// The public "Gregory Chen Public Performances" calendar. This is the same
// calendar the site used to embed as a Google Calendar iframe.
const gigCalendarId = "toactmj2ehimlgf5b4ru2ppvh4@group.calendar.google.com";

const calendar = google.calendar({
  version: "v3",
  auth: GOOGLE_API_KEY,
});

/** A run of description text. Runs carrying an `href` are rendered as links. */
export interface GigTextRun {
  text: string;
  href?: string;
}

export interface Gig {
  id: string;
  title: string;
  location?: string;
  /** Event notes, flattened to text and link runs. */
  description?: GigTextRun[];
  /** RFC3339 timestamp, or a bare YYYY-MM-DD for all-day entries. */
  start: string;
  /**
   * IANA zone the event was authored in, when the calendar records one.
   * Google only sets this for recurring events or events given an explicit
   * custom zone; otherwise the offset in `start` is all we have.
   */
  timeZone?: string;
  allDay: boolean;
}

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

/**
 * One pass, so an escaped entity such as "&amp;lt;" decodes to "&lt;" rather
 * than being decoded twice into a tag. Anything unrecognised is left as-is.
 */
const decodeEntities = (value: string): string =>
  value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (entity, body: string) => {
    if (!body.startsWith("#")) {
      return NAMED_ENTITIES[body.toLowerCase()] ?? entity;
    }

    const hex = body[1] === "x" || body[1] === "X";
    const code = hex ? parseInt(body.slice(2), 16) : Number(body.slice(1));
    const valid = Number.isInteger(code) && code > 0 && code <= 0x10ffff;
    return valid ? String.fromCodePoint(code) : entity;
  });

const toText = (html: string): string =>
  decodeEntities(html.replace(/<[^>]*>/g, ""));

/** Block boundaries become newlines; the rest of the markup is dropped. */
const withBreaks = (html: string): string =>
  html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|tr|h[1-6])>/gi, "\n");

const ANCHOR =
  /<a\b[^>]*\bhref\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)[^>]*>([\s\S]*?)<\/a>/gi;

/**
 * Only these become links. A "javascript:" or "data:" href in a note would
 * otherwise be handed straight to the browser as a working link.
 */
const SAFE_SCHEME = /^(https?:|mailto:|tel:)/i;

const safeHref = (raw: string): string | undefined => {
  const href = decodeEntities(raw.replace(/^["']|["']$/g, "")).trim();
  return SAFE_SCHEME.test(href) ? href : undefined;
};

const BARE_URL = /https?:\/\/[^\s<>"']+/gi;

const occurrences = (value: string, char: string) => value.split(char).length - 1;

/**
 * A URL at the end of a sentence should not swallow the full stop, and
 * "(see https://example.com/a)" should not take the closing bracket with it.
 */
const trimUrlTail = (url: string): string => {
  let trimmed = url.replace(/[.,;:!?'"]+$/, "");
  while (
    trimmed.endsWith(")") &&
    occurrences(trimmed, ")") > occurrences(trimmed, "(")
  ) {
    trimmed = trimmed.slice(0, -1);
  }
  return trimmed;
};

/**
 * Notes are usually typed as plain text with a bare URL, which the calendar's
 * own UI shows as a link — so the site does the same rather than printing an
 * unclickable address.
 */
const autolink = (text: string): GigTextRun[] => {
  const runs: GigTextRun[] = [];
  let index = 0;

  BARE_URL.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = BARE_URL.exec(text))) {
    const url = trimUrlTail(match[0]);
    if (match.index > index) {
      runs.push({ text: text.slice(index, match.index) });
    }
    runs.push({ text: url, href: url });
    // Resume after the URL itself: any punctuation trimmed off the end is
    // ordinary text and belongs to the next run.
    index = match.index + url.length;
    BARE_URL.lastIndex = index;
  }

  if (index < text.length) {
    runs.push({ text: text.slice(index) });
  }

  return runs;
};

/**
 * Google Calendar's editor stores event notes as HTML. Rather than ship markup
 * to the browser to be rendered blind, flatten it here to plain runs of text
 * and links — the only formatting the schedule shows.
 *
 * An anchor whose href is not a safe scheme keeps its text and loses the link.
 */
const descriptionRuns = (html: string): GigTextRun[] => {
  const normalized = withBreaks(html);
  const runs: GigTextRun[] = [];

  // Anchor text already has its link; only loose text is scanned for URLs.
  const push = (text: string, href?: string) => {
    if (!text) {
      return;
    }
    if (href) {
      runs.push({ text, href });
      return;
    }
    runs.push(...autolink(text));
  };

  let index = 0;
  ANCHOR.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = ANCHOR.exec(normalized))) {
    push(toText(normalized.slice(index, match.index)));
    push(toText(match[2]).trim(), safeHref(match[1]));
    index = match.index + match[0].length;
  }
  push(toText(normalized.slice(index)));

  const collapsed = runs.map((run) => ({
    ...run,
    text: run.text.replace(/\n{3,}/g, "\n\n"),
  }));

  // Trim only the outer edges: whitespace between runs is real content.
  const last = collapsed.length - 1;
  if (last >= 0) {
    collapsed[0].text = collapsed[0].text.replace(/^\s+/, "");
    collapsed[last].text = collapsed[last].text.replace(/\s+$/, "");
  }

  return collapsed.filter((run) => run.text);
};

const fetchGigs = async (): Promise<Gig[]> => {
  const items =
    (
      await calendar.events.list({
        calendarId: gigCalendarId,
        timeMin: new Date().toISOString(),
        // Expand recurring entries into their individual instances, otherwise
        // a standing residency comes back as a single event with one start
        // date.
        singleEvents: true,
        orderBy: "startTime",
        maxResults: 50,
      })
    ).data.items ?? [];

  const gigs: Gig[] = [];
  for (const item of items) {
    // All-day entries carry `date`; timed ones carry `dateTime`.
    const start = item.start?.dateTime ?? item.start?.date;
    // Skip entries with nothing to render rather than failing the request.
    if (!item.id || !start) {
      continue;
    }

    const description = item.description
      ? descriptionRuns(item.description)
      : [];

    gigs.push({
      id: item.id,
      title: item.summary ?? "",
      location: item.location ?? undefined,
      description: description.length ? description : undefined,
      start,
      timeZone: item.start?.timeZone ?? undefined,
      allDay: !item.start?.dateTime,
    });
  }

  return gigs;
};

const TTL_MS = 5 * 60 * 1000;

let cached: { at: number; gigs: Gig[] } | undefined;
let inFlight: Promise<Gig[]> | undefined;

/**
 * Shared by the /api/events endpoint and the server-rendered Event structured
 * data, so a page view costs at most one upstream call per TTL rather than one
 * per request.
 *
 * On a refresh failure with a warm cache the stale copy is served: a transient
 * Google outage should not blank the schedule or strip the structured data.
 * Only a cold failure throws, and callers decide what that means — the API
 * returns an error, the SEO layer omits the markup.
 */
export const getGigs = async (): Promise<Gig[]> => {
  const fresh = cached && Date.now() - cached.at < TTL_MS;
  if (fresh) {
    return cached!.gigs;
  }

  // Collapse concurrent misses into a single upstream request.
  if (!inFlight) {
    inFlight = fetchGigs()
      .then((gigs) => {
        cached = { at: Date.now(), gigs };
        return gigs;
      })
      .finally(() => {
        inFlight = undefined;
      });
  }

  try {
    return await inFlight;
  } catch (e) {
    if (cached) {
      console.error("Calendar refresh failed; serving stale gigs", e);
      return cached.gigs;
    }
    throw e;
  }
};
