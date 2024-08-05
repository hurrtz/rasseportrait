import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const App: React.FC = () => (
  <Grid container spacing={2}>
    <Grid item xs={0} md={3}></Grid>
    <Grid item xs={12} md={6}>
      <Typography variant="h1" gutterBottom>
        Rasseportrait
      </Typography>
    </Grid>
    <Grid item xs={0} md={3}></Grid>

    <Grid item xs={0} md={3}></Grid>
    <Grid item xs={12} md={6}>
      <Typography variant="body1" gutterBottom>
        body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
        blanditiis tenetur unde suscipit, quam beatae rerum inventore
        consectetur, neque doloribus, cupiditate numquam dignissimos laborum
        fugiat deleniti? Eum quasi quidem quibusdam.
      </Typography>
    </Grid>
    <Grid item xs={0} md={3}></Grid>
  </Grid>
);

export default App;
