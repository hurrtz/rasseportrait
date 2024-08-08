import React, { type Dispatch, type SetStateAction } from "react";
import type { Breed } from "../types/breed";
import BreedCard from "./BreedCard";
import Grid from "@mui/material/Grid";

interface Props {
  breeds: Breed[];
  handleCardClick: Dispatch<SetStateAction<number | undefined>>;
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
        key={`${breed.fci.standardNumber}-${breed.variants ? breed.variants[0].names[0] : breed.names[0]}`}
      >
        <BreedCard
          {...breed}
          image={breed.variants ? breed.variants[0].image : breed.image || []}
          handleCardClick={handleCardClick}
        />
      </Grid>
    ))}
  </Grid>
);
export default Breeds;
