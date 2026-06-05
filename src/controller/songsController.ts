import express from "express";
import { google } from "googleapis";
import { GOOGLE_API_KEY } from "../config";

interface Song {
  id: string;
  name: string;
  year: number;
  authors: string[];
}

interface SongIndexEntry {
  name: string;
  authors: string[];
  year: number;
}

const websiteSheetmusicFolderId = "10czZ43fMvAURo_xoNHk-fKqUwCeTE0fu";

const drive = google.drive({
  version: "v3",
  auth: GOOGLE_API_KEY,
});

const songsController = express.Router();

songsController.get("/", async (req, res) => {
  try {
    const songDirs =
      (
        await drive.files.list({
          pageSize: 1000,
          fields: "nextPageToken, files(id, name)",
          q: `"${websiteSheetmusicFolderId}" in parents and trashed=false and mimeType = 'application/vnd.google-apps.folder'`,
          orderBy: "name",
        })
      ).data.files ?? [];

    const indexFile = (
      await drive.files.list({
        pageSize: 1,
        fields: "nextPageToken, files(id, name)",
        q: `"${websiteSheetmusicFolderId}" in parents and trashed=false and name = 'songIndex.json'`,
        orderBy: "name",
      })
    ).data.files?.[0];

    if (!indexFile?.id) {
      return res.status(500).send({ error: "songIndex.json not found" });
    }

    const indexFileData = (
      await drive.files.get({
        fileId: indexFile.id,
        alt: "media",
      })
    ).data;

    const index: Record<string, SongIndexEntry> = JSON.parse(
      JSON.stringify(indexFileData),
    );

    const songs: Song[] = [];
    for (const songDir of songDirs) {
      const { id, name } = songDir;
      const entry = name ? index[name] : undefined;
      // Skip dirs missing an id/name or without a matching index entry, rather
      // than throwing and failing the whole request.
      if (!id || !name || !entry) {
        continue;
      }

      songs.push({
        id,
        name,
        year: entry.year,
        authors: entry.authors,
      });
    }

    return res.send(songs);
  } catch (e) {
    console.error(e);
    const err = e as { code?: number; errors?: unknown };
    const status = typeof err.code === "number" ? err.code : 500;
    return res.status(status).send(err.errors ? { errors: err.errors } : e);
  }
});

export default songsController;
