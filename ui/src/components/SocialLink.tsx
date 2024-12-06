import { Button } from "@mui/material";
import { ReactNode } from "react";
import { IconWithText } from "./IconWithText";

export interface SocialLinkProps {
  icon: ReactNode;
  text: string;
  to: string;
}

export function SocialLink({ icon, text, to }: SocialLinkProps) {
  const handleClick = () => window.open(to, "_blank", "noreferrer");

  return (
    <Button color="primary" onClick={handleClick}>
      <IconWithText icon={icon} text={text} />
    </Button>
  );
}
