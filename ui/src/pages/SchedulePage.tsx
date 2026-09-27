import { Box, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { apiClient, Gig } from "../apiClient";
import { GigList } from "../components/GigList";
import { PageHeading } from "../components/PageHeading";
import { StatusMessage } from "../components/StatusMessage";
import { parseGigs } from "../gigs";
import { useAsync } from "../useAsync";

const PAST_PAGE_SIZE = 10;

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
        return [...gigs.filter((g) => !seen.has(g.id)), ...prev];
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
          // Defensive sort: past pages precede the upcoming listing by
          // construction, but an all-day entry near the seam could otherwise
          // interleave by a day.
          const gigs = parseGigs([...pastGigs, ...state.data]).sort(
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
