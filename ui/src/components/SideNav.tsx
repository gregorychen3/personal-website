import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { contactHref, navSections } from "../navConfig";

export function SideNav() {
  return (
    <Grid container spacing={0.5}>
      <Grid size={12}>
        <HeaderItem to="/" label="home" />
      </Grid>
      {navSections.map((section) => (
        <Fragment key={section.label}>
          <Grid size={12}>
            <HeaderItem to={section.to} label={section.label} />
          </Grid>
          {section.links.map((link) => (
            <Grid size={12} key={`${section.label}/${link.label}`}>
              {link.external ? (
                <AnchorItem href={link.to} label={link.label} />
              ) : (
                <NavItem to={link.to} label={link.label} />
              )}
            </Grid>
          ))}
        </Fragment>
      ))}
      <Grid size={12}>
        <Button
          href={contactHref}
          target="_blank"
          rel="noopener noreferrer"
          sx={sxItem}
        >
          contact
        </Button>
      </Grid>
    </Grid>
  );
}

const sxItem = {
  color: "text.secondary",
  justifyContent: "flex-start",
  "&:hover": { color: "text.primary", backgroundColor: "action.hover" },
};
const sxIndentedItem = { ...sxItem, pl: 3, pr: 3 };
const sxActive = {
  color: "primary.main",
  fontWeight: 600,
  backgroundColor: "rgba(60, 185, 240, 0.12)",
  "&:hover": { color: "primary.main", backgroundColor: "rgba(60, 185, 240, 0.18)" },
};

function HeaderItem({ to, label }: { to: string; label: string }) {
  const { pathname } = useLocation();
  const sx = pathname === to ? { ...sxItem, ...sxActive } : sxItem;

  return (
    <Button component={Link} to={to} sx={sx}>
      {label}
    </Button>
  );
}

function NavItem({ to, label }: { to: string; label: string }) {
  const { pathname } = useLocation();
  const sx = pathname === to ? { ...sxIndentedItem, ...sxActive } : sxIndentedItem;

  return (
    <Button component={Link} to={to} sx={sx}>
      {label}
    </Button>
  );
}

function AnchorItem({ label, href }: { label: string; href: string }) {
  return (
    <Button
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      sx={sxIndentedItem}
    >
      {label}
    </Button>
  );
}
