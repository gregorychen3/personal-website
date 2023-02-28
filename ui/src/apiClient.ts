import axios from "axios";

export interface Song {
  id: string;
  name: string;
  year?: number;
  authors: string[];
}

axios.defaults.headers.post["Content-Type"] = "application/json";

const fetchSongs = async () => {
  const path = `/api/songs`;
  const resp: any[] = (await axios.get(path)).data;

  const songs = resp.map((resp) => ({
    id: resp.id ?? "",
    name: resp.name ?? "",
    year: resp.year,
    authors: resp.authors ?? [],
  }));

  return songs;
};

export const apiClient = {
  fetchSongs,
};
