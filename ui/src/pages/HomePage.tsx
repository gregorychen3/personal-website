import { Grid, Typography } from "@mui/material";

export function HomePage() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h3" fontFamily="serif">
          Gregory Chen
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          Hello, I'm Gregory Chen. I'm a software engineer and jazz pianist based in New York City and the Bay Area,
          California.
        </Typography>
      </Grid>
    </Grid>
  );
}
