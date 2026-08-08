import { Box, Skeleton } from "@mui/material";
import { useState } from "react";

export interface YoutubeVideoProps {
  title: string;
  src: string;
}

export function YoutubeVideo({ title, src }: YoutubeVideoProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    // A 16:9 box reserves the right space up front. The previous fixed 315px
    // height against a fluid width letterboxed the player at every width except
    // exactly 560px.
    <Box sx={{ position: "relative", width: "100%", aspectRatio: "16 / 9" }}>
      {!loaded && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
      )}
      <Box
        component="iframe"
        src={src}
        title={title}
        // Each embed pulls a substantial amount of third-party script and sets
        // cookies; five of them loading on page open is most of this page's
        // cost. Defer until the visitor scrolls near one.
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        onLoad={() => setLoaded(true)}
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          border: 0,
          // Faded rather than hidden while loading. A lazy iframe with
          // `display: none` has no layout box, so it never counts as near the
          // viewport, never loads, and the skeleton never clears.
          opacity: loaded ? 1 : 0,
          transition: "opacity 200ms",
        }}
      />
    </Box>
  );
}
