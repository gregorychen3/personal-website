import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { albums, ServiceLink } from "../albums";
import { apiClient } from "../apiClient";
import avatarImg from "../assets/avatar.webp";
import { GigList } from "../components/GigList";
import { SectionLabel } from "../components/PageHeading";
import { ServiceLinks } from "../components/ServiceLinks";
import { StatusMessage } from "../components/StatusMessage";
import { parseGigs } from "../gigs";
import { useAsync } from "../useAsync";

/** Enough to show what's next without duplicating the schedule page. */
const HOME_GIG_COUNT = 3;

const CONTACT_EMAIL = "gregorychen3@proton.me";

const sxMoreLink = {
  mt: 2,
  ml: -1,
  color: "primary.main",
  "&:hover": { backgroundColor: "action.hover" },
};

export function HomePage() {
  const record = albums[0];

  return (
    <Box>
      <Hero />

      <Box sx={{ mb: 8 }}>
        <SectionLabel>{record.upcoming ? "new record" : "latest record"}</SectionLabel>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, sm: 5 }}>
            <Box
              component={Link}
              to="/listen"
              sx={{ display: "block", lineHeight: 0 }}
            >
              <Box
                component="img"
                src={record.cover}
                alt={`${record.title} album cover`}
                width={record.coverWidth}
                height={record.coverHeight}
                loading="lazy"
                sx={{ width: "100%", height: "auto", display: "block" }}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, sm: 7 }}>
            <Stack
              direction="row"
              sx={{ alignItems: "baseline", gap: 1.5, flexWrap: "wrap", mb: 2 }}
            >
              <Typography variant="h4" component="h3">
                {record.title}
              </Typography>
              {record.upcoming && (
                <Typography variant="overline" sx={{ color: "primary.main" }}>
                  coming soon
                </Typography>
              )}
            </Stack>
            {record.personnel.map((line) => (
              <Typography
                key={line}
                variant="body2"
                sx={{ color: "text.secondary" }}
              >
                {line}
              </Typography>
            ))}
            <Button component={Link} to="/listen" sx={sxMoreLink}>
              listen →
            </Button>
          </Grid>
        </Grid>
      </Box>

      <NextDates />
      <Booking />
    </Box>
  );
}

/**
 * The address is shown as text rather than hidden behind a "contact" link.
 * A mailto is a dead end for anyone without a working default mail client —
 * this way the link still works for those who do, and everyone else can read
 * or copy the address directly.
 */
function Booking() {
  const [copied, setCopied] = useState(false);
  const emailRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!copied) {
      return;
    }
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
    } catch {
      // The clipboard API is blocked outside secure contexts and can be
      // refused by permissions policy. Select the address instead, so the
      // button always does something rather than failing silently.
      const node = emailRef.current;
      if (!node) {
        return;
      }
      const range = document.createRange();
      range.selectNodeContents(node);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  };

  return (
    <Box sx={{ mt: 8 }}>
      <SectionLabel>booking</SectionLabel>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.5 }}>
        For performances, sessions, and enquiries.
      </Typography>
      <Stack
        direction="row"
        sx={{ alignItems: "center", gap: 1, flexWrap: "wrap" }}
      >
        <Typography
          component="a"
          ref={emailRef}
          href={`mailto:${CONTACT_EMAIL}`}
          variant="h5"
          sx={{
            // The display face lowercases headings, which would quietly
            // misrepresent an address that happened to contain capitals.
            textTransform: "none",
            color: "primary.main",
            textDecoration: "none",
            wordBreak: "break-all",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          {CONTACT_EMAIL}
        </Typography>
        <Button
          onClick={copy}
          aria-label={copied ? "Email address copied" : "Copy email address"}
          sx={{
            minWidth: 0,
            color: copied ? "primary.main" : "text.secondary",
            "&:hover": { color: "text.primary", backgroundColor: "action.hover" },
          }}
        >
          {copied ? "copied" : "copy"}
        </Button>
      </Stack>
    </Box>
  );
}

/**
 * Profile links. Rendered through the same component as the album links, so
 * they share its badge set, ordering, and 2x2 layout.
 */
const socialLinks: ServiceLink[] = [
  {
    kind: "spotify",
    to: "https://open.spotify.com/artist/6kfl8Cg6QSQZUetovdNLyj",
  },
  {
    kind: "youtube",
    to: "https://www.youtube.com/channel/UCihTPpCdKn2H7aaJ4bU7QNA",
  },
  {
    kind: "apple",
    to: "https://music.apple.com/au/artist/gregory-chen/1778527626",
  },
  {
    kind: "amazon",
    to: "https://music.amazon.com/artists/B0DVW2H16K/gregory-chen",
  },
];

function Hero() {
  return (
    <Grid container spacing={4} sx={{ mb: 8, alignItems: "center" }}>
      <Grid size={{ xs: 12, sm: 7 }}>
        <Typography variant="h1">gregory chen</Typography>
        <Box
          sx={{ width: 64, height: 4, backgroundColor: "primary.main", my: 2.5 }}
        />
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Jazz pianist based in New York City, Boston, and San Francisco.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <ServiceLinks links={socialLinks} />
        </Box>
      </Grid>
      <Grid size={{ xs: 12, sm: 5 }}>
        <Box
          component="img"
          src={avatarImg}
          alt="Gregory Chen"
          width={1200}
          height={1200}
          // In the hero and almost certainly the LCP element, so not lazy.
          loading="eager"
          sx={{ width: "100%", height: "auto", display: "block" }}
        />
      </Grid>
    </Grid>
  );
}

function NextDates() {
  const state = useAsync(apiClient.fetchGigs);

  return (
    <Box>
      <SectionLabel>next dates</SectionLabel>

      {state.status === "loading" && <StatusMessage>loading…</StatusMessage>}

      {state.status === "error" && (
        <StatusMessage>The schedule could not be loaded just now.</StatusMessage>
      )}

      {state.status === "ready" &&
        (state.data.length === 0 ? (
          <StatusMessage>No dates on the calendar right now.</StatusMessage>
        ) : (
          <>
            <GigList gigs={parseGigs(state.data).slice(0, HOME_GIG_COUNT)} />
            {state.data.length > HOME_GIG_COUNT && (
              <Button component={Link} to="/schedule" sx={sxMoreLink}>
                full schedule →
              </Button>
            )}
          </>
        ))}
    </Box>
  );
}
