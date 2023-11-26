import fs from "fs";
const prompt = require("prompt-sync")({ sigint: true });

const songsDir = `/Users/gregorychen3/My\ Drive/music_docs/sheetmusic`;
const mdFileName = "metadata.json";
const songIndexFileName = "songIndex.json";

interface SongMetadata {
  name: string;
  year: number;
  authors: string[];
}

const main = () => {
  const songNames = fs
    .readdirSync(songsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .filter(isSongbookTune)
    .map((dir) => dir.name);

  const tuneIndex: { [k: string]: SongMetadata } = songNames.reduce(
    (acc, cur) => {
      const songFiles = fs.readdirSync(`${songsDir}/${cur}`);

      if (!songFiles.includes(mdFileName)) {
        const { year, authors } = ensureMd(cur);
        return {
          ...acc,
          [cur]: { name: cur, year, authors },
        };
      }

      const { year, authors } = JSON.parse(
        fs.readFileSync(`${songsDir}/${cur}/${mdFileName}`, "utf8")
      );
      return {
        ...acc,
        [cur]: { name: cur, year, authors },
      };
    },
    {}
  );

  const songIndexFilePath = `${songsDir}/${songIndexFileName}`;
  fs.writeFileSync(songIndexFilePath, JSON.stringify(tuneIndex));
};

const isSongbookTune = (dirEntry: fs.Dirent) =>
  fs
    .readdirSync(`${songsDir}/${dirEntry.name}`)
    .some((file) => file.toLowerCase().includes("score"));

const ensureMd = (tune: string) => {
  console.log(`Please initialize metadata for ${tune}:`);

  const yearStr = prompt("Year: ").trim();
  const year = parseInt(yearStr) ?? 0;

  const authors: string[] = [];
  while (true) {
    const author = prompt("Author: ").trim();
    if (!author) {
      break;
    }

    authors.push(author);
  }

  const mdFilePath = `${songsDir}/${tune}/${mdFileName}`;
  const md = { authors, year };
  fs.writeFileSync(mdFilePath, JSON.stringify(md));

  return md;
};

main();
