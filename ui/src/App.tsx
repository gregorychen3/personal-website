import {
  Box,
  Container,
  CssBaseline,
  Grid,
  styled,
  Toolbar,
} from "@mui/material";
import MuiLinearProgress from "@mui/material/LinearProgress";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import "./App.css";
import { SideNav } from "./components/SideNav";
import { TopNav } from "./components/TopNav";
import { selectShowLoading } from "./features/ui/uiSlice";
import { HomePage } from "./pages/HomePage";
import { ListenPage } from "./pages/ListenPage";
import { ProjectsPage } from "./pages/ProjectsPage";
import { SchedulePage } from "./pages/SchedulePage";
import { SongbookPage } from "./pages/SongbookPage";

const LinearProgress = styled(MuiLinearProgress)<{ show: boolean }>(({
  theme,
  show,
}) => {
  if (show) {
    return { zIndex: theme.zIndex.appBar + 1 };
  }

  return { visibility: "hidden" };
});

const Main = styled(Box)(() => ({
  flexGrow: 1,
  height: "100vh",
  overflow: "auto",
}));

export function App() {
  const showLoading = useSelector(selectShowLoading);

  return (
    <Box display="flex">
      <CssBaseline />
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <TopNav />
      </Box>
      <Main>
        <LinearProgress show={showLoading} />
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: { xs: 4, md: 0 } }}>
          <Grid container>
            <Grid item md={3} sx={{ display: { xs: "none", md: "flex" } }}>
              <Grid item xs={12}>
                <SideNav />
              </Grid>
            </Grid>
            <Grid item xs={12} md={9}>
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
