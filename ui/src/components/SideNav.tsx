import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { Link, useLocation } from "react-router-dom";

export function SideNav() {
  return (
    <Stack alignItems="flex-start" spacing={0.5}>
      <HeaderItem to="/" label="home" />

      <HeaderItem to="music/listen" label="music" />
      <SubItem to="/music/listen" label="listen" />
      <SubItem to="/music/schedule" label="schedule" />
      <SubItem to="/music/songbook" label="songbook" />
      <SubItem to="/music/resume" label="resume" />

      <HeaderItem to="software/projects" label="software" />
      <SubItem to="/software/projects" label="projects" />
      <SubItem to="/software/linkedin" label="linkedin" />
      <SubItem to="/software/resume" label="resume" />
    </Stack>
  );
}

const sxHeaderItem = { fontFamily: "georgia", fontWeight: "normal", textTransform: "none", color: "text.primary" };

function HeaderItem({ to, label }: { to: string; label: string }) {
  return (
    <Button component={Link} to={to} sx={sxHeaderItem} size="small">
      {label}
    </Button>
  );
}

const sxSubItem = { fontFamily: "georgia", pl: 3, pr: 3, fontWeight: "normal" };
const activeColor = "rgba(255, 255, 255, 0.08)";

function SubItem({ to, label }: { to: string; label: string }) {
  const { pathname } = useLocation();
  const sx = pathname === to ? { ...sxSubItem, backgroundColor: activeColor } : sxSubItem;

  return (
    <Button component={Link} to={to} sx={sx} size="small">
      {label}
    </Button>
  );
}
