import { createTheme } from "@mui/material";

// Brand font (Gill Sans) leads, but it only ships on Apple devices — so we
// follow it with a humanist system stack so Windows/Android visitors still get
// a clean, intentional typeface rather than default sans-serif.
const fontFamily = [
  '"Gill Sans"',
  '"Gill Sans MT"',
  "Seravek",
  '"Segoe UI"',
  "system-ui",
  "-apple-system",
  "BlinkMacSystemFont",
  "Roboto",
  "sans-serif",
].join(",");

let theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#3CB9F0" }, // brightened from #009DDB for AA contrast on dark
    secondary: { main: "#F09000" },
    error: { main: "#EC1600" },
    warning: { main: "#EBA300" },
    success: { main: "#00C78E" },
    // Soften pure black; layer surfaces with a subtle elevation step.
    background: { default: "#0A0A0A", paper: "#161616" },
    divider: "rgba(255, 255, 255, 0.10)",
    text: {
      primary: "rgba(255, 255, 255, 0.92)",
      secondary: "rgba(255, 255, 255, 0.62)",
      disabled: "rgba(255, 255, 255, 0.38)",
    },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily,
    fontSize: 16,
    h1: { fontWeight: 600, fontSize: "3rem", letterSpacing: "-0.02em", lineHeight: 1.1 },
    h2: { fontWeight: 600, fontSize: "2.25rem", letterSpacing: "-0.02em", lineHeight: 1.15 },
    h3: { fontWeight: 600, fontSize: "1.875rem", letterSpacing: "-0.015em", lineHeight: 1.2 },
    h4: { fontWeight: 600, fontSize: "1.5rem", letterSpacing: "-0.01em", lineHeight: 1.25 },
    h5: { fontWeight: 500, fontSize: "1.25rem", letterSpacing: "-0.005em", lineHeight: 1.3 },
    h6: { fontWeight: 500, fontSize: "1.0625rem", lineHeight: 1.4 },
    body1: { lineHeight: 1.6 },
    body2: { lineHeight: 1.6, color: "rgba(255, 255, 255, 0.62)" },
    button: { textTransform: "none", fontWeight: 500 },
  },
});

theme = createTheme(theme, {
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollBehavior: "smooth" },
        body: {
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        },
        "*:focus-visible": {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: 2,
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: theme.transitions.create(
            ["background-color", "color", "box-shadow"],
            { duration: theme.transitions.duration.shorter },
          ),
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          border: `1px solid ${theme.palette.divider}`,
          transition: theme.transitions.create(
            ["border-color", "background-color", "transform"],
            { duration: theme.transitions.duration.shorter },
          ),
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: theme.palette.divider },
      },
    },
  },
});

export { theme };
