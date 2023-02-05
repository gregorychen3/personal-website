import { Box, Button, Grid } from "@mui/material";

export function SideNav() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Button size="large">Pianist</Button>
      </Grid>
      <Grid item xs={12}>
        <Button size="large">Engineer</Button>
      </Grid>
      <Grid item xs={12}>
        <Button size="large">Contact</Button>
      </Grid>
    </Grid>
  );
}
