import { Button } from "@mui/material";
import { ReactNode } from "react";
import { IconWithText } from "./IconWithText";

export function SocialLink({ icon, text, to }: { icon: ReactNode; text: string; to: string }) {
  const handleClick = () => window.open(to, "_blank", "noreferrer");

  return (
    <Button color="primary" onClick={handleClick}>
      <IconWithText icon={icon} text={text} />
    </Button>
  );
}
