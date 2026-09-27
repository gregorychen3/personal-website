import express from "express";
import { FetchGigsParams, getGigs } from "../calendar";

const eventsController = express.Router();

const MAX_LIMIT = 50;
const DEFAULT_LIMIT = 10;

eventsController.get("/", async (req, res) => {
  // Optional paging into past gigs. Both params absent means the upcoming
  // listing, exactly as before. `before` is anything Date.parse accepts —
  // the client sends back gig `start` values, which are RFC3339 for timed
  // gigs and bare YYYY-MM-DD for all-day ones.
  const { before, limit } = req.query;

  let params: FetchGigsParams | undefined;
  if (before !== undefined || limit !== undefined) {
    if (
      before !== undefined &&
      (typeof before !== "string" || Number.isNaN(Date.parse(before)))
    ) {
      return res.status(400).send({ error: "Invalid 'before' cursor" });
    }

    let n = DEFAULT_LIMIT;
    if (limit !== undefined) {
      if (typeof limit !== "string" || !/^\d+$/.test(limit)) {
        return res.status(400).send({ error: "Invalid 'limit'" });
      }
      n = Number(limit);
      if (n < 1 || n > MAX_LIMIT) {
        return res.status(400).send({ error: "Invalid 'limit'" });
      }
    }

    // No cursor means the first past page: anchor to the server clock so
    // client clock skew can't create a gap or overlap at the past/upcoming
    // seam. A future cursor is clamped for the same reason — it must never
    // leak upcoming gigs into a past page.
    const at =
      before === undefined
        ? Date.now()
        : Math.min(Date.parse(before as string), Date.now());
    params = { timeMax: new Date(at).toISOString(), limit: n };
  }

  try {
    return res.send(await getGigs(params));
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
