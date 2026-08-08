import musicResume from "./assets/music_resume.pdf";

export interface NavLink {
  label: string;
  /** Route path, or an external/asset URL when `external` is true. */
  to: string;
  /** When true, open in a new tab rather than client-side navigating. */
  external?: boolean;
}

export const navLinks: NavLink[] = [
  { label: "home", to: "/" },
  { label: "listen", to: "/listen" },
  { label: "schedule", to: "/schedule" },
  { label: "sheetmusic", to: "/sheetmusic" },
  { label: "resume", to: musicResume, external: true },
];

/*
 * Redirects for the site's historical URLs live in the Express app (src/app.ts)
 * so they can be real 301s. Handling them here instead would ship the retired
 * software paths in the browser bundle and give crawlers a 200 with an empty
 * shell, which passes no signal.
 *
 * Note this means legacy paths only redirect when served by Express — under the
 * Vite dev server they fall through to the SPA's catch-all and land on home.
 */
