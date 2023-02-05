import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Grid, IconButton, Typography } from "@mui/material";

export function HomePage() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h3" fontFamily="serif">
          Gregory Chen
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          Hello, I'm Gregory Chen. I'm a jazz pianist and software engineer based in New York City and the Bay Area, CA.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <IconButton color="primary">
          <YouTubeIcon />
        </IconButton>
        <IconButton color="primary">
          <LinkedInIcon />
        </IconButton>
        <IconButton color="primary">
          <GitHubIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
}
