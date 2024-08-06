import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Fuse from "fuse.js";
import breeds from "./breeds";
import type { Breed } from "../types/breed";
import BreedCards from "./BreedCards";
import { flattenBreedVariants } from "./utils";

const fciBreeds = Object.values(breeds);
const fciBreedsWithVariants = flattenBreedVariants(fciBreeds);

const fuseOptions = {
  shouldSort: true,
  ignoreLocation: true,
  keys: [
    { name: "names", getFn: ({ names }: Breed) => names.join("|") },
    {
      name: "variantNames",
      getFn: ({ variants }: Breed) =>
        variants?.map((variant) => variant.names).join("|") || "",
    },
    {
      name: "standardNumber",
      getFn: ({ fci }: Breed) => String(fci?.standardNumber || ""),
    },
    {
      name: "episode",
      getFn: ({ podcast: podcasts }: Breed) =>
        podcasts.map((podcast) => podcast.episode).join("|"),
    },
  ],
};

const fuse = new Fuse(fciBreedsWithVariants, fuseOptions);

let results = fciBreedsWithVariants;

const filteredBreeds = fuse.search("herder");

if (filteredBreeds.length > 0) {
  results = filteredBreeds.map((filteredBreed) => filteredBreed.item);
}

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
      <BreedCards breeds={results} />
    </Grid>
    <Grid item xs={0} md={3}></Grid>
  </Grid>
);

export default App;
