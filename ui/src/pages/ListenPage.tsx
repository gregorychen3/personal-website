import { Box, Grid, SvgIcon } from "@mui/material";
import { YoutubeVideo } from "../components/YoutubeVideo";
import sessionsVol1Img from "../assets/sessions-vol-1-album-cover.png";
import { SocialLink } from "../components/SocialLink";
import { YoutubeMusicIcon } from "../components/YoutubeMusicIcon";

export function ListenPage() {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} sm={6}>
        New Album Out!
        <SocialLink
          icon={
            <SvgIcon>
              <YoutubeMusicIcon />
            </SvgIcon>
          }
          text="youtube music"
          to="asdf"
        />
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
