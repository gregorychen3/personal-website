import express from "express";
import { getGigs } from "../calendar";

const eventsController = express.Router();

eventsController.get("/", async (_req, res) => {
  try {
    return res.send(await getGigs());
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
