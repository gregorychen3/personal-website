import { Stack, SvgIcon } from "@mui/material";
import { ServiceKind, ServiceLink } from "../albums";
import { AppleMusicIcon } from "./AppleMusicIcon";
import { SocialLink } from "./SocialLink";
import { SpotifyIcon } from "./SpotifyIcon";
import { YoutubeMusicIcon } from "./YoutubeMusicIcon";

const services: Record<
  ServiceKind,
  { label: string; icon: React.ReactNode }
> = {
  apple: { label: "apple music", icon: <AppleMusicIcon /> },
  youtube: { label: "youtube", icon: <YoutubeMusicIcon /> },
  spotify: { label: "spotify", icon: <SpotifyIcon /> },
};

export function ServiceLinks({ links }: { links: ServiceLink[] }) {
  return (
    <Stack sx={{ alignItems: "flex-start", ml: -1 }}>
      {links.map((link) => (
        <SocialLink
          key={link.kind}
          icon={<SvgIcon>{services[link.kind].icon}</SvgIcon>}
          text={services[link.kind].label}
          to={link.to}
        />
      ))}
    </Stack>
  );
}
