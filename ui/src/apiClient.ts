import axios, { AxiosPromise } from "axios";

export interface Song {
  id: string;
  name: string;
  year: number;
  authors: string[];
}

axios.defaults.headers.post["Content-Type"] = "application/json";

export const apiClient = {
  fetchSongs: (): AxiosPromise<Song[]> => {
    const path = `/api/songs`;
    return axios.get(path);
  },
};
