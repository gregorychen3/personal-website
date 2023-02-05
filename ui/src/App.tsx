import { Box, Button, Container, CssBaseline, Toolbar } from "@mui/material";

export function App() {
  return (
    <Box display="flex">
      <CssBaseline />
      <Box component="main" sx={{ flexGrow: 1, height: "100vh", overflow: "auto" }}>
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Button variant="contained">Hello World</Button>
        </Container>
      </Box>
    </Box>
  );
}
