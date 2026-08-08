import { Stack } from "@mui/material";
import { byServiceOrder, serviceLabel, ServiceLink } from "../albums";
import { ServiceIcon } from "./ServiceIcon";
import { SocialLink } from "./SocialLink";

export function ServiceLinks({ links }: { links: ServiceLink[] }) {
  return (
    <Stack sx={{ alignItems: "flex-start", ml: -1 }}>
      {byServiceOrder(links).map((link) => (
        <SocialLink
          key={link.kind}
          icon={<ServiceIcon kind={link.kind} />}
          text={serviceLabel(link.kind)}
          to={link.to}
        />
      ))}
    </Stack>
  );
}
