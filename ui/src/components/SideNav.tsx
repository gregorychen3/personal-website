import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { Link, useLocation } from "react-router-dom";

export function SideNav() {
  return (
    <Stack alignItems="flex-start" spacing={0.5}>
      <HeaderItem to="/" label="home" />

      <HeaderItem to="music/listen" label="music" />
      <NavItem to="/music/listen" label="listen" />
      <NavItem to="/music/schedule" label="schedule" />
      <NavItem to="/music/songbook" label="songbook" />
      <AnchorItem href={`${process.env.PUBLIC_URL}/music_resume.pdf`} label="resume" />

      <HeaderItem to="software/projects" label="software" />
      <NavItem to="/software/projects" label="projects" />
      <AnchorItem href="https://www.linkedin.com/in/gregorychen3" label="linkedin" />
      <AnchorItem href={`${process.env.PUBLIC_URL}/software_resume.pdf`} label="resume" />
    </Stack>
  );
}

const sxHeaderItem = { fontWeight: "normal", textTransform: "none", color: "text.primary" };

function HeaderItem({ to, label }: { to: string; label: string }) {
  const { pathname } = useLocation();
  const sx = pathname === to ? { ...sxHeaderItem, backgroundColor: activeColor } : sxHeaderItem;

  return (
    <Button component={Link} to={to} sx={sx}>
      {label}
    </Button>
  );
}

const sxSubItem = { pl: 3, pr: 3, fontWeight: "normal" };
const activeColor = "rgba(255, 255, 255, 0.08)";

function NavItem({ to, label }: { to: string; label: string }) {
  const { pathname } = useLocation();
  const sx = pathname === to ? { ...sxSubItem, backgroundColor: activeColor } : sxSubItem;

  return (
    <Button component={Link} to={to} sx={sx}>
      {label}
    </Button>
  );
}

function AnchorItem({ label, href }: { label: string; href: string }) {
  return (
    <Button href={href} target="_blank" rel="noopener noreferrer" sx={sxSubItem}>
      {label}
    </Button>
  );
}
