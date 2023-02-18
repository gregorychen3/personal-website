import { Box, Button, styled } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MuiToolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router-dom";

const sxButton = { color: "text.disabled" };

const LogoButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  ":hover": {
    color: theme.palette.primary.main,
    backgroundColor: "transparent",
  },
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontFamily: "serif",
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));
LogoText.defaultProps = {
  variant: "h6",
  color: "inherit",
  noWrap: true,
};

const Toolbar = styled(MuiToolbar)(() => ({
  paddingLeft: "0px!important",
}));

export function TopNav() {
  const nav = useNavigate();
  return (
    <AppBar position="absolute" sx={{ backgroundColor: "background.default" }}>
      <Toolbar>
        <LogoButton onClick={() => nav("/")}>
          <LogoText>gc</LogoText>
        </LogoButton>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: "flex" }}>
          <MusicMenu />
          <SoftwareMenu />
          <Button href="mailto:gregorychen3@gmail.com" target="_blank" rel="noopener noreferrer" sx={sxButton}>
            contact
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function MusicMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const nav = useNavigate();
  const handleItemClicked =
    (to: string, newTab: boolean = false) =>
    () => {
      handleClose();
      newTab ? window.open(to, "_blank", "noreferrer") : nav(to);
    };

  return (
    <div>
      <Button onClick={handleOpen} sx={sxButton}>
        music
      </Button>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
        <MenuItem onClick={handleItemClicked("/music/listen")}>listen</MenuItem>
        <MenuItem onClick={handleItemClicked("/music/schedule")}>schedule</MenuItem>
        <MenuItem onClick={handleItemClicked("/music/songbook")}>songbook</MenuItem>
        <MenuItem onClick={handleItemClicked(`${process.env.PUBLIC_URL}/music_resume.pdf`, true)}>resume</MenuItem>
      </Menu>
    </div>
  );
}

function SoftwareMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const nav = useNavigate();
  const handleItemClicked =
    (to: string, newTab: boolean = false) =>
    () => {
      handleClose();
      newTab ? window.open(to, "_blank", "noreferrer") : nav(to);
    };
  return (
    <div>
      <Button onClick={handleOpen} sx={sxButton}>
        software
      </Button>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
        <MenuItem onClick={handleItemClicked("/software/projects")}>projects</MenuItem>
        <MenuItem onClick={handleItemClicked("https://www.linkedin.com/in/gregorychen3", true)}>linkedin</MenuItem>
        <MenuItem onClick={handleItemClicked(`${process.env.PUBLIC_URL}/software_resume.pdf`, true)}>resume</MenuItem>
      </Menu>
    </div>
  );
}
