import { Box } from "@mui/material";
import { byServiceOrder, serviceLabel, ServiceLink } from "../albums";
import { ServiceIcon } from "./ServiceIcon";
import { SocialLink } from "./SocialLink";

export function ServiceLinks({ links }: { links: ServiceLink[] }) {
  return (
    <Box
      sx={{
        ml: -1,
        display: "grid",
        // Fixed two-column grid rather than a wrapping row: with four services
        // a wrap breaks 3-and-1 at most widths, and the columns line up only
        // if they are sized to their widest label.
        gridTemplateColumns: "repeat(2, max-content)",
        columnGap: 1,
        justifyItems: "start",
      }}
    >
      {byServiceOrder(links).map((link) => (
        <SocialLink
          key={link.kind}
          icon={<ServiceIcon kind={link.kind} />}
          text={serviceLabel(link.kind)}
          to={link.to}
        />
      ))}
    </Box>
  );
}
