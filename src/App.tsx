import React, { useState, type ChangeEvent } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Fuse from "fuse.js";
import breedsList from "../db";
import type { Breed, BreedIdentifier } from "../types/breed";
import BreedCards from "./BreedCards";
import { flattenBreedVariants } from "./utils";
import Modal from "./Modal";

const breeds = Object.values(breedsList);
const breedsWithVariants = flattenBreedVariants(breeds);
const sortedBreedsWithVariants = breedsWithVariants.sort(
  ({ fci: fci1 }, { fci: fciB }) => fci1.standardNumber - fciB.standardNumber,
);

// temporary: remove all breeds that are incomplete
const reducedBreeds = sortedBreedsWithVariants.filter((breed) => {
  if (!breed.podcast[0].episode) {
    console.log("no podcast name", breed);
    return undefined;
  }

  if (!breed.podcast[0].url) {
    console.log("no podcast url", breed);
    return undefined;
  }

  if (!breed.podcast[0].timecode) {
    console.log("no podcast timecode", breed);
    return undefined;
  }

  return breed.podcast[0].timecode > 0;
});

const fuseOptions = {
  shouldSort: true,
  ignoreLocation: true,
  threshold: 0.1,
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
  ],
};

const fuse = new Fuse(reducedBreeds, fuseOptions);

const App = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedBreed, setSelectedBreed] = useState<BreedIdentifier>();
  const [bottomNavigationValue, setBottomNavigationValue] = useState(0);

  let results = reducedBreeds;

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
    <Container>
      <Modal
        selectedBreed={selectedBreed}
        setSelectedBreed={setSelectedBreed}
      />

      <Typography variant="h2" gutterBottom>
        Tierisch menschlich
      </Typography>

      <Typography variant="h3" gutterBottom>
        Rasseportrait
      </Typography>

      <Typography variant="body1" gutterBottom>
        Du wolltest noch einmal ein Rasseportrait anhören? Oder du wolltest
        wissen, ob eine Rasse überhaupt schon einmal besprochen wurde? Suche
        hier deine Rasse und finde die zugehörige Podcast-Episode!
      </Typography>

      <Box component="form" noValidate autoComplete="off" mt={4} mb={4}>
        <TextField
          label="Suche nach deinem Hund oder der FCI Standardnummer"
          variant="outlined"
          fullWidth
          onChange={handleSearchChange}
        />
      </Box>

      <BreedCards breeds={results} handleCardClick={setSelectedBreed} />
    </Container>
  );
};

export default App;
