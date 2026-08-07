import { Box, Container, CssBaseline, Grid, Toolbar } from "@mui/material";
import { Navigate, Route, Routes } from "react-router";
import { SideNav } from "./components/SideNav";
import { TopNav } from "./components/TopNav";
import { legacyRedirects } from "./navConfig";
import { HomePage } from "./pages/HomePage";
import { ListenPage } from "./pages/ListenPage";
import { SchedulePage } from "./pages/SchedulePage";
import { SongbookPage } from "./pages/SongbookPage";

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
              <Route path="/songbook" element={<SongbookPage />} />
              {legacyRedirects.map(({ from, to }) => (
                <Route
                  key={from}
                  path={from}
                  element={<Navigate to={to} replace />}
                />
              ))}
              {/* Anything unrecognised lands on the home page rather than a
                  blank content column. */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
