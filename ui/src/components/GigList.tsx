import { Box, Divider, Link, Stack, Typography } from "@mui/material";
import { Fragment } from "react";
import { gigDay, gigMonth, gigTime, gigWeekday, ParsedGig } from "../gigs";

/**
 * `headingLevel` is the level the event titles sit at, which depends on the
 * caller: the schedule page puts this list straight under its h1, while the
 * home page nests it beneath a "next dates" section label.
 */
export function GigList({
  gigs,
  headingLevel = "h3",
}: {
  gigs: ParsedGig[];
  headingLevel?: "h2" | "h3";
}) {
  return (
    <Box>
      {gigs.map((gig, i) => (
        <Box key={gig.id}>
          {i > 0 && <Divider />}
          <GigRow gig={gig} headingLevel={headingLevel} />
        </Box>
      ))}
    </Box>
  );
}

function GigRow({
  gig,
  headingLevel,
}: {
  gig: ParsedGig;
  headingLevel: "h2" | "h3";
}) {
  return (
    <Stack direction="row" sx={{ gap: 3, py: 2.5, alignItems: "flex-start" }}>
      <Stack
        sx={{
          width: 56,
          flexShrink: 0,
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="overline" sx={{ color: "primary.main" }}>
          {gigMonth(gig)}
        </Typography>
        {/* A bare day number is not a heading. Left as an h4 element it was
            announced as "heading level 4, sixteen" once per gig. */}
        <Typography variant="h4" component="div" sx={{ lineHeight: 1 }}>
          {gigDay(gig)}
        </Typography>
        <Typography variant="overline" sx={{ color: "text.disabled", mt: 0.5 }}>
          {gigWeekday(gig)}
        </Typography>
      </Stack>

      {/* Time, title, location, then notes — each exactly as the calendar
          records it, on its own line. */}
      <Box sx={{ minWidth: 0, flexGrow: 1 }}>
        <Typography variant="body2" sx={{ color: "text.disabled" }}>
          {gigTime(gig) ?? "all day"}
        </Typography>

        {/* Titles keep the capitalisation they were written with — the display
            face lowercases headings, which is wrong for names. */}
        <Typography
          variant="h6"
          component={headingLevel}
          sx={{ textTransform: "none", wordBreak: "break-word" }}
        >
          {gig.title}
        </Typography>

        {gig.location && (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {gig.location}
          </Typography>
        )}

        {gig.description && (
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              mt: 0.5,
              // Notes are free text and may run to several lines; keep the
              // line breaks the calendar entry was written with.
              whiteSpace: "pre-line",
              // Link text is often a bare URL, which has nowhere to wrap.
              wordBreak: "break-word",
            }}
          >
            {gig.description.map((run, i) =>
              run.href ? (
                <Link
                  key={i}
                  href={run.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {run.text}
                </Link>
              ) : (
                <Fragment key={i}>{run.text}</Fragment>
              ),
            )}
          </Typography>
        )}
      </Box>
    </Stack>
  );
}
