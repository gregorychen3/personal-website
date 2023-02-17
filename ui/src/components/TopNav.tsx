import { Box, Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router-dom";

export function TopNav() {
  return (
    <AppBar position="absolute">
      <Toolbar>
        <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Gregory Chen
        </Typography>
        <Box sx={{ display: "flex" }}>
          <MusicMenu />
          <SoftwareMenu />
          <Button href="mailto:gregorychen3@gmail.com" target="_blank" rel="noopener noreferrer">
            contact
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function MusicMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const nav = useNavigate();
  const handleNav =
    (to: string, newTab: boolean = false) =>
    () =>
      newTab ? window.open(to, "_blank", "noreferrer") : nav(to);

  return (
    <div>
      <Button onClick={handleClick}>music</Button>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
        <MenuItem onClick={handleNav("/music/listen")}>listen</MenuItem>
        <MenuItem onClick={handleNav("/music/schedule")}>schedule</MenuItem>
        <MenuItem onClick={handleNav("/music/songbook")}>songbook</MenuItem>
        <MenuItem onClick={handleNav(`${process.env.PUBLIC_URL}/music_resume.pdf`, true)}>resume</MenuItem>
      </Menu>
    </div>
  );
}

function SoftwareMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const nav = useNavigate();
  const handleNav =
    (to: string, newTab: boolean = false) =>
    () =>
      newTab ? window.open(to, "_blank", "noreferrer") : nav(to);

  return (
    <div>
      <Button onClick={handleClick}>software</Button>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
        <MenuItem onClick={handleNav("/software/projects")}>projects</MenuItem>
        <MenuItem onClick={handleNav("https://www.linkedin.com/in/gregorychen3", true)}>linkedin</MenuItem>
        <MenuItem onClick={handleNav(`${process.env.PUBLIC_URL}/software_resume.pdf`, true)}>resume</MenuItem>
      </Menu>
    </div>
  );
}
