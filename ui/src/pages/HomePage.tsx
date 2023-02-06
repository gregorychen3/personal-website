import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Grid, Stack, Typography } from "@mui/material";
import { SocialLink } from "../components/SocialLink";

export function HomePage() {
  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <Typography variant="h4">Gregory Chen</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2">
          Jazz pianist and software engineer based in New York City and the Bay Area, CA.
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <img src="/avatar.png" alt="headshot" style={{ width: "100%" }} />
      </Grid>
      <Grid item xs={9}>
        <Stack alignItems="flex-start">
          <SocialLink
            icon={<YouTubeIcon />}
            text="youtube"
            to="https://www.youtube.com/channel/UCihTPpCdKn2H7aaJ4bU7QNA"
          />
          <SocialLink icon={<LinkedInIcon />} text="linkedin" to="https://www.linkedin.com/in/gregorychen3" />
          <SocialLink icon={<GitHubIcon />} text="github" to="https://github.com/gregorychen3" />
        </Stack>
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
}
