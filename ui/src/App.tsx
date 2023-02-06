import { Box, Container, CssBaseline, Grid, Toolbar } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { HomeLogo } from "./components/HomeLogo";
import { SideNav } from "./components/SideNav";
import { HomePage } from "./pages/HomePage";

export function App() {
  return (
    <Box display="flex">
      <CssBaseline />
      <Box component="main" sx={{ flexGrow: 1, height: "100vh", overflow: "auto" }}>
        <Toolbar />
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Grid container>
            <Grid item xs={3}>
              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={12}>
                    <HomeLogo />
                  </Grid>
                  <Grid item xs={12}>
                    <SideNav />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={9}>
              <Routes>
                <Route path="/" element={<HomePage />} />
              </Routes>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
