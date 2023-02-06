import { Button } from "@mui/material";
import { ReactNode } from "react";
import { IconWithText } from "./IconWithText";

export function SocialLink(props: { icon: ReactNode; text: string }) {
  return (
    <Button color="primary">
      <IconWithText {...props} />
    </Button>
  );
}
