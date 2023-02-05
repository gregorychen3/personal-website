import { Box, Button, Grid } from "@mui/material";

export function SideNav() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Button color="primary">Pianist</Button>
      </Grid>
      <Grid item xs={12}>
        <Button>Programmer</Button>
      </Grid>
      <Grid item xs={12}>
        <Button>Contact</Button>
      </Grid>
    </Grid>
  );
}
