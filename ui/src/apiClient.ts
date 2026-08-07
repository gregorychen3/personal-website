export interface Song {
  id: string;
  name: string;
  year?: number;
  authors: string[];
}

export interface Gig {
  id: string;
  title: string;
  location?: string;
  /** RFC3339 timestamp, or a bare YYYY-MM-DD for all-day entries. */
  start: string;
  /** IANA zone the event was booked in, when the calendar records one. */
  timeZone?: string;
  allDay: boolean;
}

const getJson = async <T>(path: string): Promise<T> => {
  const resp = await fetch(path, { headers: { Accept: "application/json" } });

  if (!resp.ok) {
    throw new Error(`${path} responded ${resp.status}`);
  }

  return (await resp.json()) as T;
};

const fetchSongs = async (): Promise<Song[]> => {
  const resp = await getJson<Partial<Song>[]>("/api/songs");

  return resp.map((song) => ({
    id: song.id ?? "",
    name: song.name ?? "",
    year: song.year,
    authors: song.authors ?? [],
  }));
};

const fetchGigs = async (): Promise<Gig[]> => {
  const resp = await getJson<Partial<Gig>[]>("/api/events");

  return resp
    .filter((gig): gig is Gig => !!gig.id && !!gig.start)
    .map((gig) => ({
      id: gig.id,
      title: gig.title ?? "",
      location: gig.location,
      start: gig.start,
      timeZone: gig.timeZone,
      allDay: !!gig.allDay,
    }));
};

export const apiClient = {
  fetchSongs,
  fetchGigs,
};
