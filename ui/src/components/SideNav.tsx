import { Stack, styled } from "@mui/material";
import Button from "@mui/material/Button";

const Header = styled(Button)(({ theme }) => ({
  fontFamily: "georgia",
  textTransform: "none",
  color: theme.palette.text.primary,
  pointerEvents: "none",
  fontWeight: "normal",
}));

const Item = styled(Button)(({ theme }) => ({
  fontFamily: "georgia",
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  fontWeight: "normal",
}));

export function SideNav() {
  return (
    <Stack alignItems="flex-start">
      <Header>music</Header>
      <Item>resume</Item>
      <Item>listen</Item>
      <Item>schedule</Item>
      <Item>songbook</Item>

      <Header>software</Header>
      <Item>resume</Item>
      <Item>linkedin</Item>
      <Item>projects</Item>
    </Stack>
  );
}
