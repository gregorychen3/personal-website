import { createTheme } from "@mui/material";

/**
 * The palette is sampled from the Serenade In Blue cover art: the flat cyan
 * field is 58% of the image, with black line work and near-white lettering.
 * Using the record's own ink keeps the site and the release visually of a
 * piece. Cyan on the near-black canvas measures 7.7:1, so it carries body
 * text and not just decoration.
 */
const CYAN = "#30B0C8";
const INK = "#0B0B0B";
const CREAM = "#F0EBE0";

const alpha = (hex: string, a: number) => {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
};

// Headlines are set in a heavy grotesque, lowercase and tightly tracked, the
// way the cover sets "serenade in blue". Chasing a true condensed face across
// platforms is unreliable — weight plus negative tracking gets the same
// density everywhere.
const displayFamily = [
  '"Helvetica Neue"',
  "Helvetica",
  "Inter",
  '"Segoe UI"',
  "system-ui",
  "Arial",
  "sans-serif",
].join(",");

// Gill Sans leads the body stack: a humanist face with genuine mid-century
// credentials that sits comfortably beside the display grotesque. It only
// ships on Apple devices, so a humanist system stack follows it.
const bodyFamily = [
  '"Gill Sans"',
  '"Gill Sans MT"',
  "Seravek",
  '"Segoe UI"',
  "system-ui",
  "-apple-system",
  "Roboto",
  "sans-serif",
].join(",");

const display = {
  fontFamily: displayFamily,
  fontWeight: 800,
  textTransform: "lowercase" as const,
};

let theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: CYAN, contrastText: INK },
    secondary: { main: "#E8B33C" },
    error: { main: "#EC5B45" },
    warning: { main: "#EBA300" },
    success: { main: "#5BC28E" },
    background: { default: INK, paper: "#151515" },
    divider: alpha(CREAM, 0.14),
    text: {
      primary: CREAM,
      secondary: alpha(CREAM, 0.66),
      disabled: alpha(CREAM, 0.4),
    },
  },
  // Mid-century print has no rounded corners. Everything is a hard edge.
  shape: { borderRadius: 0 },
  typography: {
    fontFamily: bodyFamily,
    fontSize: 16,
    h1: { ...display, fontSize: "4rem", letterSpacing: "-0.035em", lineHeight: 0.95 },
    h2: { ...display, fontSize: "3rem", letterSpacing: "-0.03em", lineHeight: 1 },
    h3: { ...display, fontSize: "2.25rem", letterSpacing: "-0.03em", lineHeight: 1.05 },
    h4: { ...display, fontSize: "1.75rem", letterSpacing: "-0.025em", lineHeight: 1.1 },
    h5: {
      ...display,
      fontWeight: 700,
      fontSize: "1.3125rem",
      letterSpacing: "-0.02em",
      lineHeight: 1.2,
    },
    h6: {
      ...display,
      fontWeight: 700,
      fontSize: "1.0625rem",
      letterSpacing: "-0.01em",
      lineHeight: 1.3,
    },
    body1: { lineHeight: 1.6 },
    body2: { lineHeight: 1.6 },
    // The wide-tracked uppercase label is the other half of the idiom: it
    // marks sections without competing with the display type.
    overline: {
      fontFamily: displayFamily,
      fontWeight: 700,
      fontSize: "0.6875rem",
      letterSpacing: "0.18em",
      lineHeight: 1,
      textTransform: "uppercase",
    },
    button: { textTransform: "none", fontWeight: 500, letterSpacing: "0.01em" },
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
        "::selection": { backgroundColor: CYAN, color: INK },
        "*:focus-visible": {
          outline: `2px solid ${CYAN}`,
          outlineOffset: 2,
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true, disableRipple: true },
      styleOverrides: {
        root: {
          borderRadius: 0,
          transition: theme.transitions.create(
            ["background-color", "color", "border-color"],
            { duration: theme.transitions.duration.shorter },
          ),
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "transparent",
          border: `1px solid ${theme.palette.divider}`,
          transition: theme.transitions.create(
            ["border-color", "background-color"],
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
      styleOverrides: { root: { borderColor: theme.palette.divider } },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: { height: 2, backgroundColor: "transparent" },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          backgroundColor: alpha(CREAM, 0.05),
          "&:hover": { backgroundColor: alpha(CREAM, 0.08) },
          "&.Mui-focused": { backgroundColor: alpha(CREAM, 0.08) },
        },
      },
    },
  },
});

export { theme };
