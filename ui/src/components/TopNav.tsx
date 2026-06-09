import { Box, Button, styled } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MuiToolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { useNavigate } from "react-router";
import { contactHref, NavLink, NavSection, navSections } from "../navConfig";

const sxButton = {
  color: "text.secondary",
  "&:hover": { color: "text.primary", backgroundColor: "action.hover" },
};

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

const Toolbar = styled(MuiToolbar)(() => ({
  paddingLeft: "0px!important",
}));

export function TopNav() {
  const nav = useNavigate();
  return (
    <AppBar position="absolute" sx={{ backgroundColor: "background.default" }}>
      <Toolbar>
        <LogoButton onClick={() => nav("/")}>
          <LogoText variant="h6" color="inherit" noWrap>
            gc
          </LogoText>
        </LogoButton>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: "flex" }}>
          {navSections.map((section) => (
            <DropdownMenu key={section.label} section={section} />
          ))}
          <Button
            href={contactHref}
            target="_blank"
            rel="noopener noreferrer"
            sx={sxButton}
          >
            contact
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function DropdownMenu({ section }: { section: NavSection }) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const nav = useNavigate();
  const handleItemClicked = (link: NavLink) => () => {
    handleClose();

    if (link.external) {
      window.open(link.to, "_blank", "noreferrer");
      return;
    }

    nav(link.to);
  };

  return (
    <div>
      <Button onClick={handleOpen} sx={sxButton}>
        {section.label}
      </Button>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
        {section.links.map((link) => (
          <MenuItem key={link.label} onClick={handleItemClicked(link)}>
            {link.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
