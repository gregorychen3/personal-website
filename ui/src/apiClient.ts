import axios from "axios";

export interface Song {
  id: string;
  name: string;
  year?: number;
  authors: string[];
}

const fetchSongs = async () => {
  const path = `/api/songs`;
  const resp = (await axios.get<Partial<Song>[]>(path)).data;

  const songs = resp.map((song) => ({
    id: song.id ?? "",
    name: song.name ?? "",
    year: song.year,
    authors: song.authors ?? [],
  }));

  return songs;
};

export const apiClient = {
  fetchSongs,
};
