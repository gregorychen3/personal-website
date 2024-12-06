import { styled, Typography } from "@mui/material";

const Container = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
}));

export function IconWithText({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <Container>
      {icon}
      <Typography variant="body1" sx={{ pl: 1, color: "text.disabled" }}>
        {text}
      </Typography>
    </Container>
  );
}
