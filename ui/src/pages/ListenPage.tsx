import { Box, Divider, Grid, SvgIcon, Typography } from "@mui/material";
import sessionsVol1Img from "../assets/sessions-vol-1-album-cover.png";
import { AppleMusicIcon } from "../components/AppleMusicIcon";
import { SocialLink } from "../components/SocialLink";
import { SpotifyIcon } from "../components/SpotifyIcon";
import { YoutubeMusicIcon } from "../components/YoutubeMusicIcon";
import { YoutubeVideo } from "../components/YoutubeVideo";

export function ListenPage() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">Albums</Typography>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h5">Sessions, Vol. 1</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box
          component="img"
          src={sessionsVol1Img}
          alt="alt"
          sx={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box>Gregory Chen, piano</Box>
        <Box>Kevin Hsieh, bass</Box>
        <Box>Benjamin Zweig, drums</Box>

        <Box>
          <SocialLink
            icon={
              <SvgIcon>
                <AppleMusicIcon />
              </SvgIcon>
            }
            text="apple music"
            to="https://music.apple.com/us/album/sessions-vol-1/1794181040"
          />
        </Box>
        <Box>
          <SocialLink
            icon={
              <SvgIcon>
                <YoutubeMusicIcon />
              </SvgIcon>
            }
            text="youtube music"
            to="https://music.youtube.com/playlist?list=OLAK5uy_kW68C9nTy7JtCQ45pqL0Hm7pKMc4FkT-c&si=44XlD7dyuZWQI1_m"
          />
        </Box>
        <Box>
          <SocialLink
            icon={
              <SvgIcon>
                <SpotifyIcon />
              </SvgIcon>
            }
            text="spotify"
            to="https://open.spotify.com/album/3w1HU04iwsL5igisYk7QdT?si=LPsQIqi5Tnmt6g0--XcoAQ"
          />
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4">Videos</Typography>
        <Divider />
      </Grid>
      <Grid item xs={12} sm={6}>
        <YoutubeVideo
          title="Bye Bye Baby"
          src="https://www.youtube.com/embed/VlYeIZZwdqc"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <YoutubeVideo
          title="Aaron Johnson Quintet 07-03-2022"
          src="https://www.youtube.com/embed/bkfCbIMIqA4?start=88"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <YoutubeVideo
          title="Alex Hoffman Quintet - Smalls 10/31/2021 Set 1"
          src="https://www.youtube.com/embed/D9ulpdTD6hY"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <YoutubeVideo
          title="Alex Hoffman Quintet - Smalls 10/31/2021 Set 2"
          src="https://www.youtube.com/embed/wkXdCbxZD2w"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <YoutubeVideo
          title="I Concentrate On You - Alex Hoffman Quintet 04-29-2018"
          src="https://www.youtube.com/embed/9u3LmdqAwDA"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <YoutubeVideo
          title="Too Late Now - Alex Hoffman Quintet 04-29-2018"
          src="https://www.youtube.com/embed/56r7TQrSnPo"
        />
      </Grid>
    </Grid>
  );
}
