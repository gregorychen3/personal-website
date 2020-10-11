import express from "express";
import { google } from "googleapis";
import { GOOGLE_API_KEY } from "../config";

const websiteSheetmusicFolderId = "1XDfbY6K4GzA3Etm-dlwN0-HGhrIICkgw";

const drive = google.drive({
  version: "v3",
  auth: GOOGLE_API_KEY,
});

const songsController = express.Router();

songsController.get("/", async (req, res, next) => {
  try {
    const songs = await drive.files.list({
      pageSize: 1000,
      fields: "nextPageToken, files(id, name, modifiedTime)",
      q: `"${websiteSheetmusicFolderId}" in parents and trashed=false`,
      orderBy: "name",
    });
    return res.send(songs.data.files);
  } catch (e) {
    console.error(e);
    return res.status(e.code).send(e.errors ? { errors: e.errors } : e);
  }
});

export default songsController;
