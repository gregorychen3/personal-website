import { SvgIcon } from "@mui/material";
import { ServiceKind } from "../albums";
import { AmazonMusicIcon } from "./AmazonMusicIcon";
import { AppleMusicIcon } from "./AppleMusicIcon";
import { SpotifyIcon } from "./SpotifyIcon";
import { YoutubeMusicIcon } from "./YoutubeMusicIcon";

/**
 * One place decides which mark each service gets. Call sites previously chose
 * for themselves — the home page reached for MUI's YouTube glyph while the
 * listen page used the badge set at a different weight — which is how one
 * service ended up looking like two different things depending on the page.
 *
 * Each mark is the company's own artwork in its own brand colours, so none of
 * them take a colour prop.
 */
const marks: Record<ServiceKind, () => React.ReactElement> = {
  apple: AppleMusicIcon,
  youtube: YoutubeMusicIcon,
  spotify: SpotifyIcon,
  amazon: AmazonMusicIcon,
};

export function ServiceIcon({ kind }: { kind: ServiceKind }) {
  const Icon = marks[kind];

  return (
    <SvgIcon>
      <Icon />
    </SvgIcon>
  );
}
