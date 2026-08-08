import serenadeInBlueImg from "./assets/serenade-in-blue-album-cover.webp";
import sessionsVol1Img from "./assets/sessions-vol-1-album-cover.png";

export type ServiceKind = "apple" | "youtube" | "spotify" | "amazon";

const serviceLabels: Record<ServiceKind, string> = {
  apple: "apple music",
  youtube: "youtube",
  spotify: "spotify",
  amazon: "amazon music",
};

export const serviceLabel = (kind: ServiceKind) => serviceLabels[kind];

/**
 * The order services are listed in wherever they appear. Both the home page
 * profile links and each album's links are sorted through this, so a record
 * whose links happen to be entered in another order cannot make one page
 * disagree with another.
 */
const serviceOrder: ServiceKind[] = ["spotify", "youtube", "apple", "amazon"];

export const byServiceOrder = <T extends { kind: ServiceKind }>(links: T[]) =>
  [...links].sort(
    (a, b) => serviceOrder.indexOf(a.kind) - serviceOrder.indexOf(b.kind),
  );

export interface ServiceLink {
  kind: ServiceKind;
  to: string;
}

export interface Album {
  title: string;
  cover: string;
  /** Released records carry service links; upcoming ones show a marker. */
  upcoming?: boolean;
  personnel: string[];
  /** Label, recording date, studio, engineering credits. */
  credits: string[];
  links: ServiceLink[];
}

/** Newest first — the home page features `albums[0]`. */
export const albums: Album[] = [
  {
    title: "Serenade In Blue",
    cover: serenadeInBlueImg,
    upcoming: true,
    personnel: [
      "Aaron Johnson, clarinet and tenor saxophone",
      "Gregory Chen, piano",
      "Ilya Lushtak, guitar and vocal",
      "Daniel Duke, bass",
      "Masahiro Sakuma, drums",
      "Graham Marsh, cover art",
    ],
    credits: [
      "Boptimist Records",
      "Recorded 08-31-2025",
      "Pinch Recording, Long Island City, Queens",
      "Engineered, mixed, and mastered by Grady Bajorek",
    ],
    links: [],
  },
  {
    title: "Sessions, Vol. 1",
    cover: sessionsVol1Img,
    personnel: [
      "Gregory Chen, piano",
      "Kevin Hsieh, bass",
      "Benjamin Zweig, drums",
      "Micah Fong, album art",
    ],
    credits: ["Boptimist Records", "Recorded 08-31-2024"],
    links: [
      {
        kind: "spotify",
        to: "https://open.spotify.com/album/3w1HU04iwsL5igisYk7QdT?si=LPsQIqi5Tnmt6g0--XcoAQ",
      },
      { kind: "youtube", to: "https://youtu.be/iIC2dBC2ZZ8?si=eVFCnaVVO0LAq7Nh" },
      {
        kind: "apple",
        to: "https://music.apple.com/us/album/sessions-vol-1/1794181040",
      },
      { kind: "amazon", to: "https://music.amazon.com/albums/B0DVVVGKCC" },
    ],
  },
];
