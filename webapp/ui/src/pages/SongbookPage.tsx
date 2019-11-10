import moment from "moment";
import React, { useEffect, useState } from "react";
import apiClient from "../apiClient";
import { ISongModel } from "../types";

export default () => {
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
        <table className="table is-fullwidth is-striped is-hoverable">
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
                <td>
                  <a
                    href={`https://drive.google.com/open?id=${s.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.name}
                  </a>
                </td>
                <td>{s.modifiedTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
