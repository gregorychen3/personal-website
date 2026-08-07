import { Box, Divider, Stack, Typography } from "@mui/material";
import {
  gigDay,
  gigLocation,
  gigMonth,
  gigTime,
  gigWeekday,
  ParsedGig,
} from "../gigs";

export function GigList({ gigs }: { gigs: ParsedGig[] }) {
  return (
    <Box>
      {gigs.map((gig, i) => (
        <Box key={gig.id}>
          {i > 0 && <Divider />}
          <GigRow gig={gig} />
        </Box>
      ))}
    </Box>
  );
}

function GigRow({ gig }: { gig: ParsedGig }) {
  const time = gigTime(gig);
  // Where the calendar gives no venue the billing carries the row instead of
  // leaving an empty headline.
  const heading = gig.venue ?? gig.billing;
  const detail = gig.venue ? gig.billing : undefined;

  // When the venue came from the location itself and carries no street
  // address, the two lines would read identically.
  const rawLocation = gigLocation(gig);
  const location =
    rawLocation?.toLowerCase() === heading.toLowerCase()
      ? undefined
      : rawLocation;

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
        <Typography variant="h4" sx={{ lineHeight: 1 }}>
          {gigDay(gig)}
        </Typography>
        <Typography variant="overline" sx={{ color: "text.disabled", mt: 0.5 }}>
          {gigWeekday(gig)}
        </Typography>
      </Stack>

      <Box sx={{ minWidth: 0, flexGrow: 1 }}>
        <Stack
          direction="row"
          sx={{ gap: 1, alignItems: "baseline", flexWrap: "wrap" }}
        >
          {/* Venues keep the capitalisation they were written with — the
              display face lowercases headings, which is wrong for names. */}
          <Typography
            variant="h6"
            sx={{ textTransform: "none", wordBreak: "break-word" }}
          >
            {heading}
          </Typography>
          {gig.tentative && <TentativeTag />}
        </Stack>

        {location && (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {location}
          </Typography>
        )}

        {detail && (
          <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
            {detail}
          </Typography>
        )}

        <Typography variant="body2" sx={{ color: "text.disabled" }}>
          {time ?? "time tbd"}
        </Typography>
      </Box>
    </Stack>
  );
}

function TentativeTag() {
  return (
    <Typography
      variant="overline"
      sx={{
        px: 0.75,
        py: 0.25,
        color: "text.disabled",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      tbd
    </Typography>
  );
}
