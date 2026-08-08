import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navLinks } from "../navConfig";

const sxDrawerItem = {
  display: "block",
  width: "100%",
  px: 3,
  py: 1.5,
  color: "text.secondary",
  textAlign: "left",
  fontSize: "1.125rem",
};

const sxActive = { color: "primary.main" };

export function TopNav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  // Each destination closes the drawer itself, so it never stays open over the
  // page the visitor just navigated to.
  const close = () => setOpen(false);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{ backgroundColor: "background.default" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          component={Link}
          to="/"
          variant="h6"
          sx={{ color: "text.primary", textDecoration: "none" }}
        >
          gregory chen
        </Typography>
        <IconButton
          onClick={() => setOpen(true)}
          aria-label="Open navigation menu"
          sx={{ color: "text.primary" }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <Drawer
        anchor="right"
        open={open}
        onClose={close}
        slotProps={{
          paper: {
            sx: {
              width: "min(80vw, 320px)",
              backgroundColor: "background.default",
              backgroundImage: "none",
              borderLeft: "1px solid",
              borderColor: "divider",
            },
          },
        }}
      >
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <IconButton
            onClick={close}
            aria-label="Close navigation menu"
            sx={{ color: "text.primary" }}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>

        <Box component="nav" sx={{ pt: 2 }}>
          {navLinks.map((link) =>
            link.external ? (
              <Button
                key={link.label}
                href={link.to}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                sx={sxDrawerItem}
              >
                {link.label}
              </Button>
            ) : (
              <Button
                key={link.label}
                component={Link}
                to={link.to}
                onClick={close}
                sx={
                  pathname === link.to
                    ? { ...sxDrawerItem, ...sxActive }
                    : sxDrawerItem
                }
              >
                {link.label}
              </Button>
            ),
          )}
        </Box>
      </Drawer>
    </AppBar>
  );
}
