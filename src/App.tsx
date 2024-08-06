import React, { useState, type ChangeEvent } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Fuse from "fuse.js";
import breeds from "./breeds";
import type { Breed } from "../types/breed";
import BreedCards from "./BreedCards";
import { flattenBreedVariants } from "./utils";

const fciBreeds = Object.values(breeds);
const fciBreedsWithVariants = flattenBreedVariants(fciBreeds);
const sortedFCIBreedsWithVariants = fciBreedsWithVariants.sort(
  ({ fci: fci1 }, { fci: fciB }) => fci1.standardNumber - fciB.standardNumber,
);

const fuseOptions = {
  shouldSort: true,
  ignoreLocation: true,
  threshold: 0.5,
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

const fuse = new Fuse(sortedFCIBreedsWithVariants, fuseOptions);

const App = () => {
  const [searchValue, setSearchValue] = useState("");

  let results = sortedFCIBreedsWithVariants;

  const filteredBreeds = fuse.search(searchValue);

  if (filteredBreeds.length > 0) {
    results = filteredBreeds.map((filteredBreed) => filteredBreed.item);
  }

  const handleSearchChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (event && event.target) {
      setSearchValue(event.target.value);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={0} md={2}></Grid>
      <Grid item xs={12} md={8}>
        <Typography variant="h1" gutterBottom>
          Tierisch menschlich
        </Typography>

        <Typography variant="h2" gutterBottom>
          Rasseportrait
        </Typography>

        <Typography variant="body1" gutterBottom>
          Du wolltest noch einmal ein Rasseportrait anhören? Oder du wolltest
          wissen, ob eine Rasse überhaupt schon einmal besprochen wurde? Suche
          hier deine Rasse und finde die zugehörige Podcast-Episode!
        </Typography>

        <Box component="form" noValidate autoComplete="off" mt={4} mb={4}>
          <TextField
            label="Suche nach deinem Hund"
            variant="outlined"
            fullWidth
            onChange={handleSearchChange}
          />
        </Box>

        <BreedCards breeds={results} />
      </Grid>
      <Grid item xs={0} md={2}></Grid>
    </Grid>
  );
};

export default App;
