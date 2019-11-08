import express from "express";
import { google } from "googleapis";
import { GOOGLE_API_KEY } from "../config";

const calendar = google.calendar({
  version: "v3",
  auth: GOOGLE_API_KEY
});

const eventsController = express.Router();

eventsController.get("/", async (req, res, next) => {
  const events = await calendar.events.list({
    calendarId: "toactmj2ehimlgf5b4ru2ppvh4@group.calendar.google.com"
  });
  console.log(events);
  return res.send(events);
});

export default eventsController;
