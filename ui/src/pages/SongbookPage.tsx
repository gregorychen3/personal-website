import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { apiClient } from "../apiClient";
import { Column, ResourceTable } from "../components/ResourceTable";
import { setShowLoading } from "../features/ui/uiSlice";
import { ISongModel } from "../types";

const columns: Column<ISongModel>[] = [
  { id: "name", label: "Name", getValue: (s) => s.name },
  { id: "lastModified", label: "Last Modified", getValue: (s) => new Date(s.modifiedTime).toLocaleString() },
];

export function SongbookPage() {
  const d = useDispatch();

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

  const handleRowClicked = (s: ISongModel) =>
    window.open(`https://drive.google.com/open?id=${s.id}`, "_blank", "noreferrer");

  return (
    <ResourceTable
      title="Songbook"
      size="small"
      columns={columns}
      onRowClick={handleRowClicked}
      items={songs}
      defaultSortColumn="name"
      idExtractor={(s) => s.id}
      formatSearchEntry={toSearchEntry}
      searchIdExtractor={searchIdExtractor}
      searchOptions={{ keys: searchKeys, ignoreLocation: true, threshold: 0 }}
    />
  );
}

const toSearchEntry = (s: ISongModel) => ({
  id: s.id,
  name: s.name,
});

type RecipeSearchEntry = ReturnType<typeof toSearchEntry>;

const searchIdExtractor = (e: RecipeSearchEntry) => e.id;

const searchKeys = ["name"];
