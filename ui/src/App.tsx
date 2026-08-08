import { Box, Container, CssBaseline, Grid, Toolbar } from "@mui/material";
import { Route, Routes } from "react-router";
import { SideNav } from "./components/SideNav";
import { TopNav } from "./components/TopNav";
import { HomePage } from "./pages/HomePage";
import { ListenPage } from "./pages/ListenPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { SchedulePage } from "./pages/SchedulePage";
import { SheetmusicPage } from "./pages/SheetmusicPage";

export function App() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <TopNav />
        {/* Spacer for the fixed app bar; there is no app bar on desktop. */}
        <Toolbar />
      </Box>
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
        <Grid container spacing={{ xs: 0, md: 4 }}>
          <Grid
            sx={{ display: { xs: "none", md: "block" } }}
            size={{ md: 3 }}
          >
            <SideNav />
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/listen" element={<ListenPage />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/sheetmusic" element={<SheetmusicPage />} />
              {/* Historical URLs are 301'd by Express before they reach here.
                  Anything else is genuinely missing: Express serves this route
                  with a 404 status rather than redirecting it away. */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
