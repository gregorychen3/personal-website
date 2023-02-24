import express from "express";
import { google } from "googleapis";
import { GOOGLE_API_KEY } from "../config";

interface Song {
  id: string;
  name: string;
  authors: string[];
  year: number;
}

const websiteSheetmusicFolderId = "1XDfbY6K4GzA3Etm-dlwN0-HGhrIICkgw";

const drive = google.drive({
  version: "v3",
  auth: GOOGLE_API_KEY,
});

const songsController = express.Router();

songsController.get("/", async (req, res, next) => {
  try {
    const songDirs = (
      await drive.files.list({
        pageSize: 1000,
        fields: "nextPageToken, files(id, name)",
        q: `"${websiteSheetmusicFolderId}" in parents and trashed=false and mimeType = 'application/vnd.google-apps.folder'`,
        orderBy: "name",
      })
    ).data.files;

    const manifestFile = (
      await drive.files.list({
        pageSize: 1,
        fields: "nextPageToken, files(id, name)",
        q: `"${websiteSheetmusicFolderId}" in parents and trashed=false and name = 'manifest.json'`,
        orderBy: "name",
      })
    ).data.files[0];

    const manifestFileData = (
      await drive.files.get({
        fileId: manifestFile.id,
        alt: "media",
      })
    ).data;

    console.log(manifestFileData);
    console.log(typeof manifestFileData);
    const songs: Song[] = [];

    for (const songDir of songDirs) {
      songs.push({
        id: songDir.id,
        name: songDir.name,
        authors: [],
        year: 0,
      });
    }

    return res.send(songDirs);
  } catch (e) {
    console.error(e);
    return res.status(e.code).send(e.errors ? { errors: e.errors } : e);
  }
});

export default songsController;
