import { Grid, Skeleton, styled } from "@mui/material";
import { useState } from "react";

const Iframe = styled("iframe")(() => ({ border: "unset" }));

export interface YoutubeVideoProps {
  title: string;
  src: string;
}

export function YoutubeVideo({ title, src }: YoutubeVideoProps) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Iframe
        width="100%"
        height="315"
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        onLoad={() => setLoading(false)}
        hidden={loading}
      />
      {loading && <LoadingSkeleton />}
    </>
  );
}

function LoadingSkeleton() {
  return (
    <Grid container sx={{ height: "315px" }} spacing={2}>
      <Grid sx={{ height: "20%" }} size={3}>
        <Skeleton variant="circular" animation="wave" sx={{ height: "100%" }} />
      </Grid>
      <Grid sx={{ height: "20%" }} size={9}>
        <Skeleton variant="text" animation="wave" sx={{ height: "100%" }} />
      </Grid>
      <Grid sx={{ height: "80%" }} size={12}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ height: "100%" }}
        />
      </Grid>
    </Grid>
  );
}
