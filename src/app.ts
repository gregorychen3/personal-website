import express, { NextFunction, Request, Response } from "express";
import createError, { HttpError } from "http-errors";
import logger from "morgan";
import path from "path";
import eventsController from "./controller/eventsController";
import songsController from "./controller/songsController";
import testController from "./controller/testController";

const app = express();

/**
 * Assets retired along with the software career. These are still in Google's
 * index — the software resume PDF currently outranks the home page — and the
 * SPA catch-all below would answer them with a 200, which gives search engines
 * no reason to ever drop them.
 *
 * 410 rather than 404: the removal is permanent, and Google retires 410s
 * considerably faster than 404s. `noindex` is belt-and-braces for crawlers
 * that read the header before the status.
 *
 * Matched by pattern rather than exact filename because the build fingerprints
 * assets (`software_resume-BRozrHHY.pdf`), the fingerprint changes whenever the
 * file does, and the pre-Vite site published under `/static/media/`.
 *
 * Registered ahead of express.static so a stale build artifact cannot resurrect
 * them.
 */
const retiredSoftwareAssets =
  /^\/(assets|static\/media)\/(software_resume|cs_resume)[-.][^/]*\.pdf$/i;

app.use((req, res, next) => {
  if (retiredSoftwareAssets.test(req.path)) {
    res.set("X-Robots-Tag", "noindex");
    return res.status(410).type("text/plain").send("410 Gone");
  }
  return next();
});

/**
 * Every path this site has served in the past, mapped to its current home.
 * Three URL schemes are represented: an early hyphenated one, a slash-nested
 * one, and the flat scheme in use now.
 *
 * These were previously client-side redirects inside the SPA, which meant a
 * crawler asking for /music/songbook got a 200 and an empty shell — no signal
 * passed, and the stale URL stayed indexed. Answering here makes them real
 * 301s, and keeps the retired software paths out of the browser bundle.
 */
const legacyRedirects: Record<string, string> = {
  "/music": "/listen",
  "/music-listen": "/listen",
  "/music/listen": "/listen",

  "/music-schedule": "/schedule",
  "/music/schedule": "/schedule",

  // The sheet music page has been renamed twice.
  "/music-songbook-tunes": "/sheetmusic",
  "/music/songbook": "/sheetmusic",
  "/songbook": "/sheetmusic",

  // Retired software content: there is no longer a page to land on. These
  // redirect rather than 410 so anyone following an old link still arrives
  // somewhere useful; the software *content* itself is gone above.
  "/programming-linkedin": "/",
  "/programming-recipe-app": "/",
  "/programming-resume": "/",
  "/software/projects": "/",

  // Contact is a mailto link in the nav now, not a page of its own.
  "/contact": "/",
  "/index": "/",
};

app.use((req, res, next) => {
  // Normalise a trailing slash so /music/listen/ matches /music/listen.
  const target = legacyRedirects[req.path.replace(/\/+$/, "") || "/"];
  if (target) {
    return res.redirect(301, target);
  }
  return next();
});

// Serve static files from the React app.
//
// `redirect: false` matters: by default express.static answers a request for a
// directory (`/assets`) with a 301 adding a trailing slash, which collides head
// on with the trailing-slash canonicalisation below and produces an infinite
// redirect loop. Directories should simply fall through to the 404 handler.
app.use(
  express.static(path.join(__dirname, "/../ui/dist"), { redirect: false }),
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"), { redirect: false }));

app.use("/api/", testController);
app.use("/api/songs", songsController);
app.use("/api/events", eventsController);

/**
 * The SPA's real routes. Kept in sync by hand with the <Route> list in
 * ui/src/App.tsx — there are only four, and the server has no other way to know
 * them.
 */
const appRoutes = new Set(["/", "/listen", "/schedule", "/sheetmusic"]);

// The "catchall" handler: any non-API request that reaches here is answered
// with React's index.html. Unmatched /api paths fall through to the 404 handler
// so clients get a real error instead of the SPA shell.
app.get("/{*splat}", (req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return next();
  }

  const normalised = req.path.replace(/\/+$/, "") || "/";

  // Canonicalise the trailing slash so /listen/ and /listen are not two URLs
  // competing for the same content. Preserve any query string.
  if (normalised !== req.path) {
    const query = req.url.slice(req.path.length);
    return res.redirect(301, normalised + query);
  }

  // Unknown paths still render the app, so the visitor gets the styled
  // not-found page, but must carry a 404 status. Serving 200 for every URL —
  // as this did previously — is a soft 404: search engines take it as proof the
  // page exists and keep it indexed indefinitely.
  const file = path.join(__dirname + "/../ui/dist/index.html");
  return res.status(appRoutes.has(normalised) ? 200 : 404).sendFile(file);
});

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
app.use((err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
  return res.sendStatus(err.status ? err.status : 500);
});

module.exports = app;
