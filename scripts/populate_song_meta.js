const fs = require("fs");
const prompt = require("prompt-sync")({ sigint: true });

const songsDir = "/Users/gregorychen3/GoogleDrive/music_docs/sheetmusic";
const mdFileName = "metadata.json";

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

  tuneNames.forEach(async (tune) => {
    const files = await fs.promises.readdir(`${songsDir}/${tune}`);
    if (!files.includes(mdFileName)) {
      await initMetadata(tune);
    }
  });
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

const initMetadata = async (tune) => {
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

  const md = { authors, year };

  const mdFilePath = `${songsDir}/${tune}/${mdFileName}`;
  fs.writeFileSync(mdFilePath, JSON.stringify(md));
};

main();
