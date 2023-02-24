const fs = require("fs");
const prompt = require("prompt-sync")({ sigint: true });

const songsDir = "/Users/gregorychen3/GoogleDrive/music_docs/sheetmusic";
const mdFileName = "metadata.json";
const songIndexFileName = "songIndex.json";

const main = async () => {
  const dirs = (await fs.promises.readdir(songsDir, { withFileTypes: true })).filter((entry) => entry.isDirectory());

  const tuneNames = [];
  await Promise.all(
    dirs.map(async (dir) => {
      const tune = await isTune(dir);
      if (tune) {
        tuneNames.push(dir.name);
      }
    })
  );

  tuneNames.sort();

  const tuneIndex = {};

  for (const tune of tuneNames) {
    const files = await fs.promises.readdir(`${songsDir}/${tune}`);

    const mdFile = files.find((f) => f === mdFileName);
    if (!mdFile) {
      const md = await ensureMd(tune);
      tuneIndex[tune] = {
        name: tune,
        year: md.year,
        authors: md.authors,
      };

      continue;
    }

    const mdFileContents = await fs.promises.readFile(`${songsDir}/${tune}/${mdFileName}`, "utf8");
    const mdFileJson = JSON.parse(mdFileContents);
    tuneIndex[tune] = {
      name: tune,
      year: mdFileJson.year,
      authors: mdFileJson.authors,
    };
  }

  const songIndexFilePath = `${songsDir}/${songIndexFileName}`;
  fs.writeFileSync(songIndexFilePath, JSON.stringify(tuneIndex));
};

const isTune = async (dirEntry) => {
  try {
    const files = await fs.promises.readdir(`${songsDir}/${dirEntry.name}`);
    const score = files.find((file) => file.toLowerCase().includes("score"));
    return !!score;
  } catch {
    return false;
  }
};

const ensureMd = async (tune) => {
  console.log(`Please initialize metadata for ${tune}:`);

  const yearStr = prompt("Year: ").trim();
  const year = parseInt(yearStr) ?? 0;

  const authors = [];
  while (true) {
    const author = prompt("Author: ").trim();
    if (!author) {
      break;
    }

    authors.push(author);
  }

  const mdFilePath = `${songsDir}/${tune}/${mdFileName}`;
  fs.writeFileSync(mdFilePath, JSON.stringify(md));

  return md;
};

main();
