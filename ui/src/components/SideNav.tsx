import { Stack, styled } from "@mui/material";
import Button from "@mui/material/Button";

//const Header = styled(Typography)(() => ({ fontWeight: "bold", fontFamily: "serif", textTransform: "none" }));
//Header.defaultProps = { variant: "subtitle2" };

const Header = styled(Button)(({ theme }) => ({
  fontWeight: "bold",
  fontFamily: "serif",
  textTransform: "none",
  color: theme.palette.text.primary,
  pointerEvents: "none",
}));

const Item = styled(Button)(({ theme }) => ({ paddingLeft: theme.spacing(2), paddingRight: theme.spacing(2) }));

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
