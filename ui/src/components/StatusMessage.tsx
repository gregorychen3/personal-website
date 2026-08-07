import { Typography } from "@mui/material";
import { ReactNode } from "react";

export function StatusMessage({ children }: { children: ReactNode }) {
  return (
    <Typography
      variant="body2"
      sx={{ color: "text.disabled", py: 6, textAlign: "center" }}
    >
      {children}
    </Typography>
  );
}
