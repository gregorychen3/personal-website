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
  const [searchText, setSearchText] = useState("");

  const handleSearchChanged = (e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value);

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

  const filterFn = (s: Song) => {
    if (!searchText) {
      return true;
    }

    const want = searchText.toLowerCase();

    if (s.name.toLowerCase().includes(want)) {
      return true;
    }

    if (s.year.toString().includes(want)) {
      return true;
    }

    if (s.authors.find((author) => author.toLowerCase().includes(want))) {
      return true;
    }

    return false;
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <TextField label="Search songs" variant="filled" fullWidth onChange={handleSearchChanged} />
      </Grid>
      {songs.filter(filterFn).map((s) => (
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
        <Typography variant="h6" component="div">
          {song.name}
        </Typography>
        <Typography color="text.secondary">
          {song.year}; {song.authors.join(", ")}
        </Typography>
      </CardContent>
    </Card>
  );
};
