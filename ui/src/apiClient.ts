export interface Song {
  id: string;
  name: string;
  year?: number;
  authors: string[];
}

/** A run of description text. Runs carrying an `href` are rendered as links. */
export interface GigTextRun {
  text: string;
  href?: string;
}

export interface Gig {
  id: string;
  title: string;
  location?: string;
  /** Event notes, flattened to text and link runs. */
  description?: GigTextRun[];
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

export interface FetchGigsOptions {
  /** Exclusive cursor: only gigs starting before this instant. */
  before?: string;
  /** Page size for a past-gigs request (server default 10, max 50). */
  limit?: number;
}

const fetchGigs = async (options?: FetchGigsOptions): Promise<Gig[]> => {
  const params = new URLSearchParams();
  if (options?.before) {
    params.set("before", options.before);
  }
  if (options?.limit !== undefined) {
    params.set("limit", String(options.limit));
  }
  const qs = params.toString();

  const resp = await getJson<Partial<Gig>[]>(
    `/api/events${qs ? `?${qs}` : ""}`,
  );

  return resp
    .filter((gig): gig is Gig => !!gig.id && !!gig.start)
    .map((gig) => ({
      id: gig.id,
      title: gig.title ?? "",
      location: gig.location,
      description: Array.isArray(gig.description) ? gig.description : undefined,
      start: gig.start,
      timeZone: gig.timeZone,
      allDay: !!gig.allDay,
    }));
};

export const apiClient = {
  fetchSongs,
  fetchGigs,
};
