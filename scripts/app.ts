import fs from "fs";
const prompt = require("prompt-sync")({ sigint: true });

const songsDir = "/Users/gregorychen3/My Drive/music_docs/sheetmusic";
const mdFileName = "metadata.json";
const songIdxFileName = "songIndex.json";
const songIdxFilePath = `${songsDir}/${songIdxFileName}`;
const websiteSongsDir =
  "/Users/gregorychen3/My Drive/music_docs/website_sheetmusic";

interface SongMetadata {
  name: string;
  year: number;
  authors: string[];
}

// The shape actually persisted in each song's metadata.json (name is derived
// from the directory name, not stored on disk).
interface SongFileMetadata {
  year: number;
  authors: string[];
}

/*
 * 1. Ensures each songbook tune directory has a metadata.json
 * 2. Creates a JSON object containing all song metadatas
 * 3. Publish each song by copying files to the website sheetmusic directory
 */
const main = () => {
  const songNames = fs
    .readdirSync(songsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter(isSongbookTune)
    .map((dir) => dir.name);

  songNames.forEach(ensureMetadata);

  const songIdx: { [k: string]: SongMetadata } = {};
  for (const song of songNames) {
    const mdPath = `${songsDir}/${song}/${mdFileName}`;
    let year: number;
    let authors: string[];
    try {
      ({ year, authors } = JSON.parse(
        fs.readFileSync(mdPath, "utf8")
      ) as SongFileMetadata);
    } catch (err) {
      throw new Error(`Failed to parse metadata for "${song}" (${mdPath}): ${err}`);
    }
    songIdx[song] = { name: song, year, authors };
  }

  fs.writeFileSync(songIdxFilePath, JSON.stringify(songIdx));

  fs.readdirSync(websiteSongsDir).forEach((file) =>
    fs.rmSync(`${websiteSongsDir}/${file}`, { recursive: true, force: true })
  );

  songNames.forEach(publishSong);

  fs.copyFileSync(songIdxFilePath, `${websiteSongsDir}/${songIdxFileName}`);
};

const isSongbookTune = (dirEntry: fs.Dirent) =>
  fs
    .readdirSync(`${songsDir}/${dirEntry.name}`)
    .some((file) => file.toLowerCase().includes("folio"));

const ensureMetadata = (song: string) => {
  const songFiles = fs.readdirSync(`${songsDir}/${song}`);
  if (songFiles.includes(mdFileName)) {
    return;
  }

  console.log(`Please initialize metadata for ${song}:`);

  const yearStr = prompt("Year: ").trim();
  const year = Number.parseInt(yearStr, 10) || 0;

  const authors: string[] = [];
  while (true) {
    const author = prompt("Author: ").trim();
    if (!author) {
      break;
    }

    authors.push(author);
  }

  const mdFilePath = `${songsDir}/${song}/${mdFileName}`;
  const md: SongFileMetadata = { authors, year };
  fs.writeFileSync(mdFilePath, JSON.stringify(md));
};

const publishSong = (song: string) => {
  fs.mkdirSync(`${websiteSongsDir}/${song}`, { recursive: true });

  const songFiles = fs.readdirSync(`${songsDir}/${song}`);
  songFiles
    .filter((file) => file.endsWith(".pdf"))
    .forEach((file) =>
      fs.copyFileSync(
        `${songsDir}/${song}/${file}`,
        `${websiteSongsDir}/${song}/${file}`
      )
    );
};

main();
