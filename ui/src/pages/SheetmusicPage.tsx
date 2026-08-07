import { Box, ButtonBase, Divider, Stack, TextField, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { apiClient, Song } from "../apiClient";
import { PageHeading } from "../components/PageHeading";
import { StatusMessage } from "../components/StatusMessage";
import { useAsync } from "../useAsync";

/** Stable reference so the filter memo does not rerun on every render. */
const NO_SONGS: Song[] = [];

const matches = (song: Song, query: string) => {
  if (!query) {
    return true;
  }

  const want = query.toLowerCase();

  return (
    song.name.toLowerCase().includes(want) ||
    !!song.year?.toString().includes(want) ||
    song.authors.some((author) => author.toLowerCase().includes(want))
  );
};

export function SheetmusicPage() {
  const state = useAsync(apiClient.fetchSongs);
  const [query, setQuery] = useState("");

  const songs = state.status === "ready" ? state.data : NO_SONGS;
  const visible = useMemo(
    () => songs.filter((song) => matches(song, query)),
    [songs, query],
  );

  return (
    <Box>
      <PageHeading
        title="vintage sheetmusic"
      />

      <TextField
        placeholder="Search by title, composer, or year"
        variant="filled"
        hiddenLabel
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={state.status !== "ready"}
        slotProps={{ htmlInput: { "aria-label": "Search songs" } }}
      />

      {state.status === "loading" && <StatusMessage>loading…</StatusMessage>}

      {state.status === "error" && (
        <StatusMessage>
          The sheetmusic collection could not be loaded just now. Please try again later.
        </StatusMessage>
      )}

      {state.status === "ready" && (
        <>
          <Typography
            variant="overline"
            sx={{ display: "block", color: "text.disabled", mt: 3, mb: 1 }}
          >
            {visible.length} {visible.length === 1 ? "tune" : "tunes"}
          </Typography>

          {visible.length === 0 ? (
            <StatusMessage>
              {songs.length === 0
                ? "No charts here yet."
                : `Nothing matching “${query}”.`}
            </StatusMessage>
          ) : (
            <Box>
              {visible.map((song, i) => (
                <Box key={song.id}>
                  {i > 0 && <Divider />}
                  <SongRow song={song} />
                </Box>
              ))}
            </Box>
          )}
        </>
      )}
    </Box>
  );
}

function SongRow({ song }: { song: Song }) {
  const open = () =>
    window.open(
      `https://drive.google.com/open?id=${song.id}`,
      "_blank",
      "noreferrer",
    );

  return (
    <ButtonBase
      onClick={open}
      sx={{
        display: "block",
        width: "100%",
        textAlign: "left",
        px: 1,
        py: 1.5,
        "&:hover": { backgroundColor: "action.hover" },
        "&:hover .song-title": { color: "primary.main" },
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{
          gap: { xs: 0, sm: 2 },
          alignItems: { xs: "flex-start", sm: "baseline" },
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body1" className="song-title">
          {song.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.disabled",
            textAlign: { xs: "left", sm: "right" },
            flexShrink: 0,
          }}
        >
          {[song.authors.join(", "), song.year].filter(Boolean).join(" · ")}
        </Typography>
      </Stack>
    </ButtonBase>
  );
}
