import { Box, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { apiClient, Gig } from "../apiClient";
import { GigList } from "../components/GigList";
import { PageHeading } from "../components/PageHeading";
import { StatusMessage } from "../components/StatusMessage";
import { parseGigs } from "../gigs";
import { useAsync } from "../useAsync";

const PAST_PAGE_SIZE = 10;

/**
 * Gigs in `gigs` whose id is not in `ids`, order preserved. Used at both
 * seams where independently fetched lists can overlap: page boundaries in
 * `loadEarlier`, and the past/upcoming seam at render.
 */
const withoutIds = (gigs: Gig[], ids: Set<string>): Gig[] =>
  gigs.filter((g) => !ids.has(g.id));

export function SchedulePage() {
  const state = useAsync(apiClient.fetchGigs);

  // Past gigs paged in by the "Load earlier gigs" button. The cursor is
  // undefined until the first click: the server then anchors the page to its
  // own clock, so client clock skew can't create a gap or overlap at the
  // past/upcoming seam.
  const [pastGigs, setPastGigs] = useState<Gig[]>([]);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadMoreError, setLoadMoreError] = useState(false);

  const loadEarlier = async () => {
    if (loadingMore || !hasMore) {
      return;
    }
    setLoadingMore(true);
    setLoadMoreError(false);
    try {
      const gigs = await apiClient.fetchGigs({
        before: cursor,
        limit: PAST_PAGE_SIZE,
      });
      // The server returns the page ascending; prepending keeps one ascending
      // list. Dedupe by id: the cursor itself is exclusive server-side, but
      // two gigs sharing the cursor instant could straddle a page boundary.
      setPastGigs((prev) => {
        const seen = new Set(prev.map((g) => g.id));
        return [...withoutIds(gigs, seen), ...prev];
      });
      if (gigs.length > 0) {
        setCursor(gigs[0].start);
      }
      if (gigs.length < PAST_PAGE_SIZE) {
        setHasMore(false);
      }
    } catch (e) {
      console.error(e);
      // Cursor and pastGigs are untouched, so retrying re-issues the same
      // request.
      setLoadMoreError(true);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <Box>
      <PageHeading title="schedule" />

      {state.status === "loading" && <StatusMessage>loading…</StatusMessage>}

      {state.status === "error" && (
        <StatusMessage>
          The schedule could not be loaded just now. Please try again later.
        </StatusMessage>
      )}

      {state.status === "ready" &&
        (() => {
          // Dedupe across the seam: the upcoming listing and the first past
          // page anchor to `now` at different times (and the upcoming listing
          // may be a minutes-old cache hit), so a gig starting in between
          // shows up in both. GigList keys rows by gig id, so a duplicate is
          // not just cosmetic.
          const pastIds = new Set(pastGigs.map((g) => g.id));
          const upcoming = withoutIds(state.data, pastIds);
          // Defensive sort: past pages precede the upcoming listing by
          // construction, but an all-day entry near the seam could otherwise
          // interleave by a day.
          const gigs = parseGigs([...pastGigs, ...upcoming]).sort(
            (a, b) => a.date.getTime() - b.date.getTime(),
          );

          return (
            <>
              {hasMore && (
                <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={loadEarlier}
                    disabled={loadingMore}
                    startIcon={
                      loadingMore ? <CircularProgress size={16} /> : undefined
                    }
                  >
                    {loadingMore ? "loading…" : "Load earlier gigs"}
                  </Button>
                </Box>
              )}

              {loadMoreError && (
                <StatusMessage>
                  Earlier gigs could not be loaded just now. Please try again.
                </StatusMessage>
              )}

              {gigs.length === 0 ? (
                <StatusMessage>No dates on the calendar right now.</StatusMessage>
              ) : (
                // Sits directly under the page h1, with no section label between.
                <GigList gigs={gigs} headingLevel="h2" />
              )}
            </>
          );
        })()}
    </Box>
  );
}
