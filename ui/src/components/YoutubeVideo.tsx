import { styled } from "@mui/material";

const Iframe = styled("iframe")(() => ({ border: "unset" }));

export interface YoutubeVideoProps {
  title: string;
  src: string;
}

export function YoutubeVideo({ title, src }: YoutubeVideoProps) {
  return (
    <Iframe
      width="100%"
      height="315"
      src={src}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  );
}
