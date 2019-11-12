import _ from "lodash";
import React, { useEffect, useState } from "react";
import apiClient from "../apiClient";
import { getDateDisplay } from "../helpers";
import { ISongModel } from "../types";
import LoadingSpinner from "../components/LoadingSpinner";

interface SortConfig {
  name?: "asc" | "desc";
  modifiedTime?: "asc" | "desc";
}

export default () => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ name: "asc" });
  const [songs, setSongs] = useState<ISongModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSongs = async () => {
      const songs = await apiClient.fetchSongs();
      setSongs(songs.data);
      setIsLoading(false);
    };
    getSongs();
  }, []);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <section className="section">
      <div className="container">
        <table className="table is-fullwidth is-striped is-narrow is-hoverable">
          <thead>
            <tr>
              <th />
              <th
                onClick={() => {
                  if (sortConfig.name === "asc") {
                    setSongs(_.sortBy(songs, "name").reverse());
                    setSortConfig({ name: "desc" });
                  } else {
                    setSongs(_.sortBy(songs, "name"));
                    setSortConfig({ name: "asc" });
                  }
                }}
              >
                Name
              </th>
              <th
                onClick={() => {
                  if (sortConfig.modifiedTime === "asc") {
                    setSongs(_.sortBy(songs, "modifiedTime").reverse());
                    setSortConfig({ modifiedTime: "desc" });
                  } else {
                    setSongs(_.sortBy(songs, "modifiedTime"));
                    setSortConfig({ modifiedTime: "asc" });
                  }
                }}
              >
                Last Modified
              </th>
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
                <td>{getDateDisplay(s.modifiedTime)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
