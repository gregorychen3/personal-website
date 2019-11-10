import React, { useEffect, useState } from "react";
import apiClient from "../apiClient";
import { ISongModel } from "../types";
import moment from "moment";

export default () => {
  const folderId = "1XDfbY6K4GzA3Etm-dlwN0-HGhrIICkgw";

  const [songs, setSongs] = useState<ISongModel[]>([]);

  useEffect(() => {
    const getSongs = async () => {
      const songs = await apiClient.fetchSongs();
      setSongs(
        songs.data.map(s => ({
          ...s,
          modifiedTime: moment(s.modifiedTime).format("M/D/YYYY")
        }))
      );
    };
    getSongs();
  }, []);

  return (
    <section className="section">
      <div className="container">
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th />
              <th>Name</th>
              <th>Last Modified</th>
            </tr>
          </thead>
          <tbody>
            {songs.map(s => (
              <tr>
                <td>
                  <span className="icon has-text-grey">
                    <i className="fas fa-folder" />
                  </span>
                </td>
                <td>{s.name}</td>
                <td>{s.modifiedTime}</td>
              </tr>
            ))}
          </tbody>
        </table>

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
