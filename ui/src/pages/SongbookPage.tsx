import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { apiClient, Song } from "../apiClient";
import { setShowLoading } from "../features/ui/uiSlice";

export function SongbookPage() {
  const d = useDispatch();

  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const getSongs = async () => {
      d(setShowLoading(true));

      const songs = await apiClient.fetchSongs();
      setSongs(songs.data);
      console.log(songs);

      d(setShowLoading(false));
    };

    getSongs();

    return () => {
      d(setShowLoading(false));
    };
  }, [d]);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TextField label="Search" variant="filled" fullWidth />
      </Grid>
      {songs.map((s) => (
        <Grid item xs={12}>
          <SongCard song={s} key={s.id} />
        </Grid>
      ))}
    </Grid>
  );
}

const SongCard = ({ song }: { song: Song }) => {
  const handleClick = () => window.open(`https://drive.google.com/open?id=${song.id}`, "_blank", "noreferrer");

  return (
    <Card onClick={handleClick}>
      <CardContent>
        <Typography variant="h5" component="div">
          {song.name}
        </Typography>
        <Typography color="text.secondary">
          {song.year}; {song.authors.join(", ")}
        </Typography>
      </CardContent>
    </Card>
  );
};
