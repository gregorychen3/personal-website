import express from "express";
import { google } from "googleapis";

const songsController = express.Router();

songsController.get("/", async (req, res, next) => {
  return res.send("ok");
});

export default songsController;
