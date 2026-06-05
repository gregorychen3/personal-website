import express, { NextFunction, Request, Response } from "express";
import createError, { HttpError } from "http-errors";
import logger from "morgan";
import path from "path";
import songsController from "./controller/songsController";
import testController from "./controller/testController";

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/../ui/dist")));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/", testController);
app.use("/api/songs", songsController);

// the "catchall" handler: for any non-API request that doesn't match one
// above, send back React's index.html file. Unmatched /api paths fall through
// to the 404 handler so clients get a real error instead of the SPA shell.
app.get("/{*splat}", (req, res, next) => {
  if (req.path.startsWith("/api/")) {
    return next();
  }
  const file = path.join(__dirname + "/../ui/dist/index.html");
  res.sendFile(file);
});

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// error handler
app.use((err: HttpError, _req: Request, res: Response, _next: NextFunction) => {
  return res.sendStatus(err.status ? err.status : 500);
});

module.exports = app;
