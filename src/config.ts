const exitWithError = (msg: string) => {
  console.error(`${msg} environment variable not set. Exiting.`);
  process.exit(1);
};

if (!process.env.GOOGLE_API_KEY) {
  exitWithError("GOOGLE_API_KEY");
}
export const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
