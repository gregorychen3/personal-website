import YouTubeIcon from "@mui/icons-material/YouTube";
import { Grid, Stack, SvgIcon, Typography, useTheme } from "@mui/material";
import avatarImg from "../assets/avatar.png";
import { SocialLink } from "../components/SocialLink";
import { SpotifyIcon } from "../components/SpotifyIcon";

const sxIcon = { color: "text.primary" };

export function HomePage() {
  // SpotifyIcon paints its own badge, so it needs the resolved color rather
  // than the `sx` token the MUI icons take.
  const iconColor = useTheme().palette.text.primary;

  const socialLinks = [
    {
      icon: <YouTubeIcon sx={sxIcon} />,
      text: "youtube",
      to: "https://www.youtube.com/channel/UCihTPpCdKn2H7aaJ4bU7QNA",
    },
    {
      icon: (
        <SvgIcon>
          <SpotifyIcon color={iconColor} />
        </SvgIcon>
      ),
      text: "spotify",
      to: "https://open.spotify.com/artist/6kfl8Cg6QSQZUetovdNLyj",
    },
  ];

  return (
    <Grid container spacing={4}>
      <Grid size={12}>
        <Typography variant="h4">Gregory Chen</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          Jazz pianist based in New York City, Boston, and San Francisco.
        </Typography>
      </Grid>
      <Grid
        size={{
          xs: 6,
          md: 3,
        }}
      >
        <img src={avatarImg} alt="headshot" style={{ width: "100%" }} />
      </Grid>
      <Grid
        size={{
          xs: 6,
          md: 9,
        }}
      >
        <Stack
          sx={{
            alignItems: "flex-start",
            justifyContent: "center",
            height: "100%",
            gap: 0.5,
          }}
        >
          {socialLinks.map((props) => (
            <SocialLink {...props} key={props.text} />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}
