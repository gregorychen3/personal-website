import { Box, Container, CssBaseline, Grid, styled, Toolbar } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { SideNav } from "./components/SideNav";
import { selectShowLoading } from "./features/ui/uiSlice";
import { HomePage } from "./pages/HomePage";
import { ListenPage } from "./pages/ListenPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { SchedulePage } from "./pages/SchedulePage";
import { SongbookPage } from "./pages/SongbookPage";

const Main = styled(Box)(() => ({
  flexGrow: 1,
  height: "100vh",
  overflow: "auto",
}));
Main.defaultProps = { component: "main" };

export function App() {
  const showLoading = useSelector(selectShowLoading);

  return (
    <Box display="flex">
      <CssBaseline />
      <Main>
        <LinearProgress sx={showLoading ? undefined : { visibility: "hidden" }} />
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container>
            <Grid item xs={3}>
              <Grid item xs={12}>
                <SideNav />
              </Grid>
            </Grid>
            <Grid item xs={9}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/music/listen" element={<ListenPage />} />
                <Route path="/music/schedule" element={<SchedulePage />} />
                <Route path="/music/songbook" element={<SongbookPage />} />
                <Route path="/software/projects" element={<ProjectsPage />} />
              </Routes>
            </Grid>
          </Grid>
        </Container>
      </Main>
    </Box>
  );
}
