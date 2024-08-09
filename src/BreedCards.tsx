import React, { type Dispatch, type SetStateAction } from "react";
import type { Breed, BreedIdentifier } from "../types/breed";
import BreedCard from "./BreedCard";
import Grid from "@mui/material/Grid";
import { getImageFromBreed } from "./utils";

interface Props {
  breeds: Breed[];
  handleCardClick: Dispatch<SetStateAction<BreedIdentifier>>;
}

const Breeds = ({ breeds, handleCardClick }: Props) => (
  <Grid container spacing={2}>
    {breeds.map((breed) => (
      <Grid
        item
        xs={12}
        md={6}
        lg={4}
        xl={3}
        key={`${breed.id}-${breed.variants ? breed.variants[0].names[0] : breed.names[0]}`}
      >
        <BreedCard
          {...breed}
          image={getImageFromBreed(breed)}
          handleCardClick={handleCardClick}
        />
      </Grid>
    ))}
  </Grid>
);
export default Breeds;
