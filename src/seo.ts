import { Gig } from "./calendar";

const SITE_ORIGIN = "https://www.gregory-chen.com";
const SITE_NAME = "Gregory Chen";
const ARTIST = "Gregory Chen";
const SOCIAL_IMAGE = `${SITE_ORIGIN}/og-image.jpg`;

/**
 * Streaming profiles. `sameAs` is how a search engine ties this site to the
 * artist entity it already knows from Spotify and Apple Music, so it is worth
 * keeping accurate.
 */
const ARTIST_PROFILES = [
  "https://open.spotify.com/artist/6kfl8Cg6QSQZUetovdNLyj",
  "https://www.youtube.com/channel/UCihTPpCdKn2H7aaJ4bU7QNA",
  "https://music.apple.com/us/artist/gregory-chen/1778527626",
  "https://music.amazon.com/artists/B0DVW2H16K/gregory-chen",
];

interface RouteMeta {
  title: string;
  description: string;
}

/**
 * Per-route title and description. Every page previously shipped the same
 * pair, which is why Google was composing its own titles for the search
 * results rather than using ours.
 *
 * Titles stay under ~60 characters and descriptions under ~160 so neither is
 * truncated in a result snippet.
 */
const ROUTE_META: Record<string, RouteMeta> = {
  "/": {
    title: "Gregory Chen — Jazz Pianist",
    description:
      "Jazz pianist based in New York City, Boston, and San Francisco. Recordings, upcoming performances, and a vintage sheet music collection.",
  },
  "/listen": {
    title: "Listen — Gregory Chen",
    description:
      "Albums and live video from jazz pianist Gregory Chen, including the forthcoming Serenade In Blue and Sessions, Vol. 1.",
  },
  "/schedule": {
    title: "Schedule — Gregory Chen",
    description:
      "Upcoming public performances by jazz pianist Gregory Chen, shown in each venue's local time.",
  },
  "/sheetmusic": {
    title: "Vintage Sheet Music — Gregory Chen",
    description:
      "A searchable collection of vintage jazz and standards sheet music kept by pianist Gregory Chen.",
  },
};

const NOT_FOUND_META: RouteMeta = {
  title: "Page Not Found — Gregory Chen",
  description: "That page has moved or no longer exists.",
};

/** Albums, for MusicAlbum markup. Keep in step with ui/src/albums.ts. */
const ALBUMS = [
  {
    name: "Serenade In Blue",
    sameAs: [] as string[],
  },
  {
    name: "Sessions, Vol. 1",
    sameAs: [
      "https://open.spotify.com/album/3w1HU04iwsL5igisYk7QdT",
      "https://music.apple.com/us/album/sessions-vol-1/1794181040",
      "https://music.amazon.com/albums/B0DVVVGKCC",
    ],
  },
];

const escapeAttr = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/**
 * Calendar titles are free text, so a `</script>` in an event name would
 * otherwise break out of the JSON-LD block. Escaping `<` as a unicode escape
 * keeps the JSON valid while making that impossible.
 */
const jsonLdScript = (data: unknown) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(
    /</g,
    "\\u003c",
  )}</script>`;

const TBD_PREFIX = /^TBD:\s*/i;

/**
 * Only confirmed dates are published as structured data. Most entries on the
 * calendar are still marked "TBD", and schema.org has no vocabulary for a
 * tentative booking — emitting them as EventScheduled would risk Google
 * surfacing a rich result for a date that never happens.
 *
 * Events without a location are skipped too: Google requires one, and markup
 * that fails validation is worse than no markup.
 */
const eventsLd = (gigs: Gig[]) =>
  gigs
    .filter((gig) => !TBD_PREFIX.test(gig.title) && !!gig.location && !!gig.title)
    .map((gig) => ({
      "@context": "https://schema.org",
      "@type": "Event",
      name: gig.title,
      startDate: gig.start,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: {
        "@type": "Place",
        name: gig.location!.split(",")[0].trim(),
        address: gig.location,
      },
      performer: { "@type": "Person", name: ARTIST },
      url: `${SITE_ORIGIN}/schedule`,
    }));

const personLd = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: ARTIST,
  jobTitle: "Jazz Pianist",
  url: `${SITE_ORIGIN}/`,
  sameAs: ARTIST_PROFILES,
});

const albumsLd = () =>
  ALBUMS.map((album) => ({
    "@context": "https://schema.org",
    "@type": "MusicAlbum",
    name: album.name,
    byArtist: { "@type": "Person", name: ARTIST },
    url: `${SITE_ORIGIN}/listen`,
    ...(album.sameAs.length ? { sameAs: album.sameAs } : {}),
  }));

const structuredData = (path: string, gigs: Gig[]): unknown[] => {
  switch (path) {
    case "/":
      return [personLd()];
    case "/listen":
      return albumsLd();
    case "/schedule":
      return eventsLd(gigs);
    default:
      return [];
  }
};

export interface HeadOptions {
  /** Serve noindex and skip the canonical when the path does not exist. */
  notFound?: boolean;
  gigs?: Gig[];
}

const renderHead = (path: string, options: HeadOptions = {}): string => {
  const { notFound = false, gigs = [] } = options;
  const meta = notFound ? NOT_FOUND_META : (ROUTE_META[path] ?? NOT_FOUND_META);
  const canonical = `${SITE_ORIGIN}${path === "/" ? "/" : path}`;

  const tags = [
    `<title>${escapeAttr(meta.title)}</title>`,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
  ];

  if (notFound) {
    // A missing page should not compete for a canonical URL, and should not be
    // indexed at all.
    tags.push(`<meta name="robots" content="noindex" />`);
  } else {
    tags.push(`<link rel="canonical" href="${canonical}" />`);
  }

  tags.push(
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${escapeAttr(SITE_NAME)}" />`,
    `<meta property="og:title" content="${escapeAttr(meta.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${SOCIAL_IMAGE}" />`,
    `<meta property="og:image:alt" content="Serenade In Blue album cover" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  );

  if (!notFound) {
    for (const data of structuredData(path, gigs)) {
      tags.push(jsonLdScript(data));
    }
  }

  return tags.join("\n    ");
};

/**
 * index.html carries a fallback <title> between these markers so the Vite dev
 * server (which never runs this code) still renders something sensible. In
 * production the whole block is replaced, which avoids emitting a second
 * <title> that would shadow the real one.
 */
const HEAD_MARKER = /<!--seo-head-->[\s\S]*?<!--\/seo-head-->/;

export const injectHead = (
  template: string,
  path: string,
  options: HeadOptions = {},
): string => template.replace(HEAD_MARKER, renderHead(path, options));
