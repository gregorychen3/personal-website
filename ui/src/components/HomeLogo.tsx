import { styled, Typography } from "@mui/material";

const Logo = styled(Typography)(({ theme }) => ({
  cursor: "pointer",
  ":hover": {
    color: theme.palette.primary.main,
  },
}));

export function HomeLogo() {
  return (
    <Logo variant="h4" fontFamily="serif" sx={{ pl: 1, mb: 3 }}>
      gc
    </Logo>
  );
}
