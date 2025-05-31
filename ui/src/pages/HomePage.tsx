import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Grid, Stack, Typography } from "@mui/material";
import avatarImg from "../assets/avatar.png";
import { SocialLink } from "../components/SocialLink";

const sxIcon = { color: "text.disabled" };

const socialLinks = [
  {
    icon: <YouTubeIcon sx={sxIcon} />,
    text: "youtube",
    to: "https://www.youtube.com/channel/UCihTPpCdKn2H7aaJ4bU7QNA",
  },
  {
    icon: <LinkedInIcon sx={sxIcon} />,
    text: "linkedin",
    to: "https://www.linkedin.com/in/gregorychen3",
  },
  {
    icon: <GitHubIcon sx={sxIcon} />,
    text: "github",
    to: "https://github.com/gregorychen3",
  },
];

export function HomePage() {
  return (
    <Grid container spacing={8}>
      <Grid item xs={12}>
        <Typography variant="h4">Gregory Chen</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2">
          Jazz pianist based in New York City, Boston, and San Francisco.
        </Typography>
      </Grid>
      <Grid item xs={6} md={3}>
        <img src={avatarImg} alt="headshot" style={{ width: "100%" }} />
      </Grid>
      <Grid item xs={6} md={9}>
        <Stack
          alignItems="flex-start"
          justifyContent="space-around"
          sx={{ height: "100%" }}
        >
          {socialLinks.map((props) => (
            <SocialLink {...props} key={props.text} />
          ))}
        </Stack>
      </Grid>
      <Grid item xs={12}></Grid>
    </Grid>
  );
}
