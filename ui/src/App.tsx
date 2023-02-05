import { Box, Container, CssBaseline, Toolbar } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";

export function App() {
  return (
    <Box display="flex">
      <CssBaseline />
      <Box component="main" sx={{ flexGrow: 1, height: "100vh", overflow: "auto" }}>
        <Toolbar />
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Container>
      </Box>
    </Box>
  );
}
