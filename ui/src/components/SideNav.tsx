import { Box, Button, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { contactHref, navLinks } from "../navConfig";

const sxItem = {
  display: "block",
  width: "100%",
  px: 1.5,
  py: 0.75,
  color: "text.secondary",
  textAlign: "left",
  borderLeft: "2px solid transparent",
  "&:hover": {
    color: "text.primary",
    backgroundColor: "action.hover",
    borderLeftColor: "divider",
  },
};

const sxActive = {
  color: "primary.main",
  borderLeftColor: "primary.main",
  "&:hover": { color: "primary.main", borderLeftColor: "primary.main" },
};

export function SideNav() {
  const { pathname } = useLocation();

  return (
    <Box component="nav" sx={{ position: "sticky", top: 48 }}>
      <Typography
        component={Link}
        to="/"
        variant="h5"
        sx={{
          display: "block",
          mb: 3,
          px: 1.5,
          color: "text.primary",
          textDecoration: "none",
          "&:hover": { color: "primary.main" },
        }}
      >
        gregory
        <Box component="span" sx={{ display: "block" }}>
          chen
        </Box>
      </Typography>

      {navLinks.map((link) =>
        link.external ? (
          <Button
            key={link.label}
            href={link.to}
            target="_blank"
            rel="noopener noreferrer"
            sx={sxItem}
          >
            {link.label}
          </Button>
        ) : (
          <Button
            key={link.label}
            component={Link}
            to={link.to}
            sx={pathname === link.to ? { ...sxItem, ...sxActive } : sxItem}
          >
            {link.label}
          </Button>
        ),
      )}

      <Button href={contactHref} sx={sxItem}>
        contact
      </Button>
    </Box>
  );
}
