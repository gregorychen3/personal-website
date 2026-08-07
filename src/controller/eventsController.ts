import express from "express";
import { google } from "googleapis";
import { GOOGLE_API_KEY } from "../config";

// The public "Gregory Chen Public Performances" calendar. This is the same
// calendar the site used to embed as a Google Calendar iframe.
const gigCalendarId = "toactmj2ehimlgf5b4ru2ppvh4@group.calendar.google.com";

const calendar = google.calendar({
  version: "v3",
  auth: GOOGLE_API_KEY,
});

interface Gig {
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

const eventsController = express.Router();

eventsController.get("/", async (_req, res) => {
  try {
    const items =
      (
        await calendar.events.list({
          calendarId: gigCalendarId,
          timeMin: new Date().toISOString(),
          // Expand recurring entries into their individual instances,
          // otherwise a standing residency comes back as a single event with
          // one start date.
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

    return res.send(gigs);
  } catch (e) {
    // Log the full error server-side; return a generic message so we don't
    // leak internal/upstream details to the client.
    console.error(e);
    const err = e as { code?: number };
    const status =
      typeof err.code === "number" && err.code >= 400 && err.code < 600
        ? err.code
        : 500;
    return res.status(status).send({ error: "Failed to fetch events" });
  }
});

export default eventsController;
