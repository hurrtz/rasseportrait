import React from "react";
import type { Breed } from "../types/breed";
import BreedCard from "./BreedCard";
import Grid from "@mui/material/Grid";

interface Props {
  breeds: Breed[];
}

const Breeds = ({ breeds }: Props) => (
  <Grid container spacing={2}>
    {breeds.map((breed) => (
      <Grid
        item
        xs={12}
        md={6}
        key={`${breed.fci.standardNumber}-${breed.variants ? breed.variants[0].names[0] : breed.names[0]}`}
      >
        <BreedCard
          {...breed}
          image={breed.variants ? breed.variants[0].image : breed.image || ""}
        />
      </Grid>
    ))}
  </Grid>
);
export default Breeds;
