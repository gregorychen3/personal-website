import { google } from "googleapis";
import { GOOGLE_API_KEY } from "./config";

// The public "Gregory Chen Public Performances" calendar. This is the same
// calendar the site used to embed as a Google Calendar iframe.
const gigCalendarId = "toactmj2ehimlgf5b4ru2ppvh4@group.calendar.google.com";

const calendar = google.calendar({
  version: "v3",
  auth: GOOGLE_API_KEY,
});

export interface Gig {
  id: string;
  title: string;
  location?: string;
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

    gigs.push({
      id: item.id,
      title: item.summary ?? "",
      location: item.location ?? undefined,
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
