import { SvgIcon } from "@mui/material";
import { ServiceKind } from "../albums";
import { AppleMusicIcon } from "./AppleMusicIcon";
import { SpotifyIcon } from "./SpotifyIcon";
import { YoutubeMusicIcon } from "./YoutubeMusicIcon";

/**
 * One place decides which mark each service gets, and at what weight. Call
 * sites previously chose for themselves — the home page reached for MUI's
 * YouTube glyph at full strength while the listen page used the badge set at
 * `text.disabled` — which is how one service ended up looking like two
 * different things depending on the page.
 */
const marks: Record<
  ServiceKind,
  (props: { color?: string }) => React.ReactElement
> = {
  apple: AppleMusicIcon,
  youtube: YoutubeMusicIcon,
  spotify: SpotifyIcon,
};

export function ServiceIcon({ kind }: { kind: ServiceKind }) {
  const Icon = marks[kind];

  return (
    <SvgIcon>
      <Icon />
    </SvgIcon>
  );
}
