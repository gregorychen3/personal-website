import { Gig } from "./apiClient";

export interface ParsedGig extends Gig {
  /** Entries prefixed "TBD:" in the calendar are not yet confirmed. */
  tentative: boolean;
  /** Who the gig is with, e.g. "w/ Aaron Johnson". */
  billing: string;
  venue?: string;
  date: Date;
}

const TBD_PREFIX = /^TBD:\s*/i;
const RFC3339_OFFSET = /([+-])(\d{2}):(\d{2})$/;

/**
 * All-day entries arrive as a bare YYYY-MM-DD. Passing that to `new Date()`
 * parses it as UTC midnight, which lands on the previous day for anyone west
 * of Greenwich — so build those from local components instead.
 */
const toDate = (gig: Gig): Date => {
  if (!gig.allDay) {
    return new Date(gig.start);
  }

  const [year, month, day] = gig.start.split("-").map(Number);
  return new Date(year, month - 1, day);
};

/**
 * Titles follow the convention "[TBD: ]w/ <who>[ @ <venue>]". Where the title
 * carries no venue we fall back to the first segment of the calendar's
 * location, which is the venue name ahead of the street address.
 */
export const parseGig = (gig: Gig): ParsedGig => {
  const tentative = TBD_PREFIX.test(gig.title);
  const title = gig.title.replace(TBD_PREFIX, "").trim();

  const separator = title.indexOf(" @ ");
  const billing = separator === -1 ? title : title.slice(0, separator).trim();
  const titleVenue =
    separator === -1 ? undefined : title.slice(separator + 3).trim();

  const locationVenue = gig.location
    ?.replace(TBD_PREFIX, "")
    .split(",")[0]
    .trim();

  return {
    ...gig,
    tentative,
    billing,
    venue: titleVenue || locationVenue || undefined,
    date: toDate(gig),
  };
};

export const parseGigs = (gigs: Gig[]): ParsedGig[] => gigs.map(parseGig);

/** Full location as recorded on the calendar, minus any "TBD:" marker. */
export const gigLocation = (gig: ParsedGig) =>
  gig.location?.replace(TBD_PREFIX, "").trim() || undefined;

/**
 * Minutes east of UTC for an RFC3339 offset, used when Google records no IANA
 * zone for an event and the offset in the timestamp is all we have.
 */
const offsetMinutes = (start: string): number | undefined => {
  const match = RFC3339_OFFSET.exec(start);
  if (!match) {
    return undefined;
  }

  const [, sign, hours, minutes] = match;
  const magnitude = Number(hours) * 60 + Number(minutes);
  return sign === "-" ? -magnitude : magnitude;
};

/**
 * Every gig is shown in the zone it was booked in, so a Taipei date reads as
 * Taipei local time rather than being converted to the viewer's clock. Dates
 * are zoned too: an evening set in Taipei can otherwise land on the wrong day.
 */
const zoned = (gig: ParsedGig, options: Intl.DateTimeFormatOptions): string => {
  // All-day dates were built from local components, so leave them local.
  if (gig.allDay) {
    return new Intl.DateTimeFormat("en-US", options).format(gig.date);
  }

  if (gig.timeZone) {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: gig.timeZone,
      ...options,
    }).format(gig.date);
  }

  // No IANA zone: shift the instant by its own offset and render as UTC,
  // which reproduces the wall-clock time exactly as the calendar stored it.
  const minutes = offsetMinutes(gig.start) ?? 0;
  const shifted = new Date(gig.date.getTime() + minutes * 60_000);
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    ...options,
  }).format(shifted);
};

const gmtLabel = (minutes: number) => {
  if (minutes === 0) {
    return "UTC";
  }

  const sign = minutes < 0 ? "-" : "+";
  const hours = Math.floor(Math.abs(minutes) / 60);
  const rest = Math.abs(minutes) % 60;
  return `GMT${sign}${hours}${rest ? `:${String(rest).padStart(2, "0")}` : ""}`;
};

export const gigMonth = (gig: ParsedGig) => zoned(gig, { month: "short" });

export const gigDay = (gig: ParsedGig) => zoned(gig, { day: "numeric" });

export const gigWeekday = (gig: ParsedGig) => zoned(gig, { weekday: "short" });

/** Time of day with its zone, e.g. "11:55 PM EDT" or "7:00 PM GMT+8". */
export const gigTime = (gig: ParsedGig): string | undefined => {
  if (gig.allDay) {
    return undefined;
  }

  const clock: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
  };

  if (gig.timeZone) {
    return new Intl.DateTimeFormat("en-US", {
      timeZone: gig.timeZone,
      ...clock,
      timeZoneName: "short",
    }).format(gig.date);
  }

  // Intl cannot name a bare offset, so label it ourselves.
  return `${zoned(gig, clock)} ${gmtLabel(offsetMinutes(gig.start) ?? 0)}`;
};
