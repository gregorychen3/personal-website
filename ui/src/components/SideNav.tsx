import { Button, Grid } from "@mui/material";

export function SideNav() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Button size="large">Music</Button>
      </Grid>
      <Grid item xs={12}>
        <Button size="large">Software</Button>
      </Grid>
      <Grid item xs={12}>
        <Button size="large">Contact</Button>
      </Grid>
    </Grid>
  );
}
