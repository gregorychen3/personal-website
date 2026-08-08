import { Box, Divider, Typography } from "@mui/material";
import { ReactNode } from "react";

/**
 * Rendered as an h2: these label the real sections of a page, but the overline
 * variant defaults to a <span>, which left them invisible to anything
 * navigating by headings.
 */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="overline"
        component="h2"
        sx={{ color: "primary.main" }}
      >
        {children}
      </Typography>
      <Divider sx={{ mt: 1 }} />
    </Box>
  );
}

export function PageHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: ReactNode;
}) {
  return (
    <Box sx={{ mb: 5 }}>
      {/* h3 styling, h1 semantics: the display scale is a design decision, but
          every page still needs exactly one top-level heading. */}
      <Typography variant="h3" component="h1">
        {title}
      </Typography>
      {/* Short cyan rule under the heading — the flat, graphic accent the
          cover art uses, without turning every divider into a stripe. */}
      <Box sx={{ width: 48, height: 3, backgroundColor: "primary.main", mt: 1.5 }} />
      {subtitle && (
        <Typography variant="body2" sx={{ color: "text.secondary", mt: 2 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
