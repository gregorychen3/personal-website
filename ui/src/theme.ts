import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: { main: "#009DDB" },
    secondary: { main: "#F09000" },
    error: { main: "#EC1600" },
    warning: { main: "#EBA300" },
    success: { main: "#00C78E" },
    background: { default: "#171717", paper: "#1E262E" },
    mode: "dark",
  },
  typography: {
    fontSize: 18,
    fontFamily: ["georgia", "serif"].join(","),
    button: {
      textTransform: "none",
      fontFamily: "serif",
      fontWeight: "bold",
    },
  },
});

theme.palette.primary.main = theme.palette.text.disabled;

theme.components = {
  MuiTextField: {
    defaultProps: {
      variant: "standard",
      InputLabelProps: { shrink: true },
    },
  },
};
