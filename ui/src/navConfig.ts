import musicResume from "./assets/music_resume.pdf";
import softwareResume from "./assets/software_resume.pdf";

export interface NavLink {
  label: string;
  /** Route path, or an external/asset URL when `external` is true. */
  to: string;
  /** When true, open in a new tab rather than client-side navigating. */
  external?: boolean;
}

export interface NavSection {
  label: string;
  /** Path the section header links to (used by the side nav). */
  to: string;
  links: NavLink[];
}

export const contactHref = "mailto:gregorychen3@gmail.com";

export const navSections: NavSection[] = [
  {
    label: "music",
    to: "/music/listen",
    links: [
      { label: "listen", to: "/music/listen" },
      { label: "schedule", to: "/music/schedule" },
      { label: "songbook", to: "/music/songbook" },
      { label: "resume", to: musicResume, external: true },
    ],
  },
  {
    label: "software",
    to: "/software/projects",
    links: [
      { label: "projects", to: "/software/projects" },
      {
        label: "linkedin",
        to: "https://www.linkedin.com/in/gregorychen3",
        external: true,
      },
      { label: "resume", to: softwareResume, external: true },
    ],
  },
];
