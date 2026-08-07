import musicResume from "./assets/music_resume.pdf";

export interface NavLink {
  label: string;
  /** Route path, or an external/asset URL when `external` is true. */
  to: string;
  /** When true, open in a new tab rather than client-side navigating. */
  external?: boolean;
}

export const contactHref = "mailto:gregorychen3@gmail.com";

export const navLinks: NavLink[] = [
  { label: "home", to: "/" },
  { label: "listen", to: "/listen" },
  { label: "schedule", to: "/schedule" },
  { label: "sheetmusic", to: "/sheetmusic" },
  { label: "resume", to: musicResume, external: true },
];

/**
 * The site used to be split into music and software sections. Those paths are
 * still in the wild (search results, old links), so they redirect rather than
 * dead-end.
 */
export const legacyRedirects: { from: string; to: string }[] = [
  { from: "/music/listen", to: "/listen" },
  { from: "/music/schedule", to: "/schedule" },
  { from: "/music/sheetmusic", to: "/sheetmusic" },
  { from: "/music", to: "/listen" },
  { from: "/software/projects", to: "/" },
];
