import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { IconWithText } from "../components/IconWithText";

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
          <Button color="primary">
            <IconWithText icon={<YouTubeIcon />} text="youtube" />
          </Button>
          <Button color="primary">
            <IconWithText icon={<LinkedInIcon />} text="linkedin" />
          </Button>
          <Button color="primary">
            <IconWithText icon={<GitHubIcon />} text="github" />
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
}
