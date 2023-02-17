import { Grid } from "@mui/material";
import { YoutubeVideo } from "../components/YoutubeVideo";

export function ListenPage() {
  return (
    <Grid container spacing={6}>
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
      <Grid item xs={12} sm={6}>
        <YoutubeVideo
          title="If I Could Be With You, James P. Johnson"
          src="https://www.youtube.com/embed/bdLJmW7sR-4"
        />
      </Grid>
    </Grid>
  );
}
