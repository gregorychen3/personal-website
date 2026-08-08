import { Box, Grid, Stack, Typography } from "@mui/material";
import { Album, albums } from "../albums";
import { PageHeading, SectionLabel } from "../components/PageHeading";
import { ServiceLinks } from "../components/ServiceLinks";
import { YoutubeVideo } from "../components/YoutubeVideo";

const videos = [
  {
    title: "Aaron Johnson Quintet 07-03-2022",
    src: "https://www.youtube.com/embed/bkfCbIMIqA4?start=88",
  },
  {
    title: "Alex Hoffman Quintet - Smalls 10-31-2021 Set 1",
    src: "https://www.youtube.com/embed/D9ulpdTD6hY",
  },
  {
    title: "Alex Hoffman Quintet - Smalls 10-31-2021 Set 2",
    src: "https://www.youtube.com/embed/wkXdCbxZD2w",
  },
  {
    title: "I Concentrate On You - Alex Hoffman Quintet 04-29-2018",
    src: "https://www.youtube.com/embed/9u3LmdqAwDA",
  },
  {
    title: "Too Late Now - Alex Hoffman Quintet 04-29-2018",
    src: "https://www.youtube.com/embed/56r7TQrSnPo",
  },
];

export function ListenPage() {
  return (
    <Box>
      <PageHeading title="listen" />

      <SectionLabel>albums</SectionLabel>
      {albums.map((album) => (
        <AlbumBlock key={album.title} album={album} />
      ))}

      <Box sx={{ mt: 8 }}>
        <SectionLabel>videos</SectionLabel>
        <Grid container spacing={3}>
          {videos.map((video) => (
            <Grid key={video.src} size={{ xs: 12, sm: 6 }}>
              <YoutubeVideo title={video.title} src={video.src} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

function AlbumBlock({ album }: { album: Album }) {
  return (
    <Grid container spacing={4} sx={{ mb: 7 }}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Box
          component="img"
          src={album.cover}
          alt={`${album.title} album cover`}
          sx={{ width: "100%", display: "block" }}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <Stack
          direction="row"
          sx={{ alignItems: "baseline", gap: 1.5, flexWrap: "wrap", mb: 2 }}
        >
          <Typography variant="h4">{album.title}</Typography>
          {album.upcoming && (
            <Typography variant="overline" sx={{ color: "primary.main" }}>
              coming soon
            </Typography>
          )}
        </Stack>

        {album.personnel.map((line) => (
          <Typography key={line} variant="body2" sx={{ color: "text.secondary" }}>
            {line}
          </Typography>
        ))}

        <Box sx={{ mt: 3 }}>
          {album.credits.map((line) => (
            <Typography key={line} variant="body2" sx={{ color: "text.disabled" }}>
              {line}
            </Typography>
          ))}
        </Box>

        {album.links.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <ServiceLinks links={album.links} />
          </Box>
        )}
      </Grid>
    </Grid>
  );
}
