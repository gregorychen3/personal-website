import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { Link, useLocation } from "react-router-dom";

export function SideNav() {
  return (
    <Grid container spacing={0.5}>
      <Grid item xs={12}>
        <HeaderItem to="/" label="home" />
      </Grid>

      <Grid item xs={12}>
        <HeaderItem to="music/listen" label="music" />
      </Grid>

      <Grid item xs={12}>
        <NavItem to="/music/listen" label="listen" />
      </Grid>
      <Grid item xs={12}>
        <NavItem to="/music/schedule" label="schedule" />
      </Grid>
      <Grid item xs={12}>
        <NavItem to="/music/songbook" label="songbook" />
      </Grid>
      <Grid item xs={12}>
        <AnchorItem href={`${process.env.PUBLIC_URL}/music_resume.pdf`} label="resume" />
      </Grid>

      <Grid item xs={12}>
        <HeaderItem to="software/projects" label="software" />
      </Grid>
      <Grid item xs={12}>
        <NavItem to="/software/projects" label="projects" />
      </Grid>
      <Grid item xs={12}>
        <AnchorItem href="https://www.linkedin.com/in/gregorychen3" label="linkedin" />
      </Grid>
      <Grid item xs={12}>
        <AnchorItem href={`${process.env.PUBLIC_URL}/software_resume.pdf`} label="resume" />
      </Grid>
      <Grid item xs={12}>
        <Button href="mailto:gregorychen3@gmail.com" target="_blank" rel="noopener noreferrer" sx={sxItem}>
          contact
        </Button>
      </Grid>
    </Grid>
  );
}

const sxItem = { color: "text.disabled", justifyContent: "flex-start" };
const sxIndentedItem = { ...sxItem, pl: 3, pr: 3 };
const activeColor = "rgba(0, 157, 219, 0.20)";

function HeaderItem({ to, label }: { to: string; label: string }) {
  const { pathname } = useLocation();
  const sx = pathname === to ? { ...sxItem, backgroundColor: activeColor } : sxItem;

  return (
    <Button component={Link} to={to} sx={sx}>
      {label}
    </Button>
  );
}

function NavItem({ to, label }: { to: string; label: string }) {
  const { pathname } = useLocation();
  const sx = pathname === to ? { ...sxIndentedItem, backgroundColor: activeColor } : sxIndentedItem;

  return (
    <Button component={Link} to={to} sx={sx}>
      {label}
    </Button>
  );
}

function AnchorItem({ label, href }: { label: string; href: string }) {
  return (
    <Button href={href} target="_blank" rel="noopener noreferrer" sx={sxIndentedItem}>
      {label}
    </Button>
  );
}
