import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Fuse from "fuse.js";
import breeds from "./breeds";
import type { Breed } from "../types/breed";

const fciBreeds = Object.values(breeds);

const fuseOptions = {
  shouldSort: true,
  ignoreLocation: true,
  keys: [
    { name: "names", getFn: ({ names }: Breed) => names.join("|") },
    {
      name: "variantNames",
      getFn: ({ variants }: Breed) =>
        variants.map((variant) => variant.names).join("|"),
    },
    {
      name: "standardNumber",
      getFn: ({ fci }: Breed) => String(fci?.standardNumber || ""),
    },
    {
      name: "variantStandardNumbers",
      getFn: ({ variants }: Breed) =>
        variants.map((variant) => variant.fci?.standardNumber).join("|"),
    },
    {
      name: "episode",
      getFn: ({ podcast: podcasts }: Breed) =>
        podcasts.map((podcast) => podcast.episode).join("|"),
    },
  ],
};

const fuse = new Fuse(fciBreeds, fuseOptions);

// Change the pattern
const searchPattern = "223";

const App: React.FC = () => (
  <Grid container spacing={2}>
    <Grid item xs={0} md={3}></Grid>
    <Grid item xs={12} md={6}>
      <Typography variant="h1" gutterBottom>
        Title
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
