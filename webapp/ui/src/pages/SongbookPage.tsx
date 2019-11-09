import React, { useEffect, useState } from "react";
import apiClient from "../apiClient";
import { ISongModel } from "../types";

export default () => {
  const folderId = "1XDfbY6K4GzA3Etm-dlwN0-HGhrIICkgw";

  const [songs, setSongs] = useState<ISongModel[]>([]);

  useEffect(() => {
    const getSongs = async () => {
      const songs = await apiClient.fetchSongs();
      setSongs(songs.data);
    };
    getSongs();
  }, []);

  return (
    <section className="section">
      <div className="container">
        <iframe
          title="Songbook"
          id="idIframe"
          src={`https://drive.google.com/embeddedfolderview?id=${folderId}#list`}
          style={{ width: "100%", minHeight: "650px" }}
        />
      </div>
    </section>
  );
};
