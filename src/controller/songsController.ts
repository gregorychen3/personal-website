import express from "express";
import { google } from "googleapis";
import { GOOGLE_API_KEY } from "../config";

interface Song {
  id: string;
  name: string;
  year: number;
  authors: string[];
}

const websiteSheetmusicFolderId = "10czZ43fMvAURo_xoNHk-fKqUwCeTE0fu";

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

    const indexFile = (
      await drive.files.list({
        pageSize: 1,
        fields: "nextPageToken, files(id, name)",
        q: `"${websiteSheetmusicFolderId}" in parents and trashed=false and name = 'songIndex.json'`,
        orderBy: "name",
      })
    ).data.files[0];

    const indexFileData = (
      await drive.files.get({
        fileId: indexFile.id,
        alt: "media",
      })
    ).data;

    const index: {
      [key: string]: { name: string; authors: string[]; year: number };
    } = JSON.parse(JSON.stringify(indexFileData));
    const songs: Song[] = [];

    for (const songDir of songDirs) {
      songs.push({
        id: songDir.id,
        name: songDir.name,
        year: index[songDir.name].year,
        authors: index[songDir.name].authors,
      });
    }

    return res.send(songs);
  } catch (e) {
    console.error(e);
    return res.status(e.code).send(e.errors ? { errors: e.errors } : e);
  }
});

export default songsController;
