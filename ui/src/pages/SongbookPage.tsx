import { format } from "date-fns";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { apiClient } from "../apiClient";
import { setShowLoading } from "../features/ui/uiSlice";
import { ISongModel } from "../types";

const getDateDisplay = (dateString: string) => format(new Date(dateString), "M/dd/y");

interface SortConfig {
  name?: "asc" | "desc";
  modifiedTime?: "asc" | "desc";
}

export function SongbookPage() {
  const d = useDispatch();
  const [sortConfig, setSortConfig] = useState<SortConfig>({ name: "asc" });
  const [songs, setSongs] = useState<ISongModel[]>([]);

  useEffect(() => {
    const getSongs = async () => {
      d(setShowLoading(true));

      const songs = await apiClient.fetchSongs();
      setSongs(songs.data);
      console.log(songs);

      d(setShowLoading(false));
    };

    getSongs();
  }, [d]);

  return (
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
            {songs.map((s) => (
              <tr key={s.id}>
                <td>
                  <span className="icon has-text-grey">
                    <i className="fas fa-folder" />
                  </span>
                </td>
                <td>
                  <a href={`https://drive.google.com/open?id=${s.id}`} target="_blank" rel="noopener noreferrer">
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
}
