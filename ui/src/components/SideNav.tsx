import { Stack, styled } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Header = styled(Button)(({ theme }) => ({
  fontFamily: "georgia",
  textTransform: "none",
  color: theme.palette.text.primary,
  pointerEvents: "none",
  fontWeight: "normal",
}));

const sxButton = { fontFamily: "georgia", pl: 3, pr: 3, fontWeight: "normal" };

export function SideNav() {
  return (
    <Stack alignItems="flex-start">
      <Header>home</Header>
      <Header>music</Header>
      <Item to="music/resume" label="resume" />
      <Item to="music/listen" label="listen" />
      <Item to="music/schedule" label="schedule" />
      <Item to="music/songbook" label="songbook" />

      <Header>software</Header>
      <Item to="software/resume" label="resume" />
      <Item to="software/linkedin" label="linkedin" />
      <Item to="software/projects" label="projects" />
    </Stack>
  );
}

function Item({ to, label }: { to: string; label: string }) {
  return (
    <Button component={Link} to={to} sx={sxButton}>
      {label}
    </Button>
  );
}
