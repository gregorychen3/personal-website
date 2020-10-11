import axios, { AxiosPromise } from "axios";
import { ISongModel } from "./types";

axios.defaults.headers.post["Content-Type"] = "application/json";

const apiClient = {
  fetchSongs: (): AxiosPromise<ISongModel[]> => {
    const path = `/api/songs`;
    return axios.get(path);
  },
};

export default apiClient;
