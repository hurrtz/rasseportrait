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
      <Grid item xs={12} md={6}>
        <BreedCard key={breed.fci.standardNumber} {...breed} image="" />
      </Grid>
    ))}
  </Grid>
);
export default Breeds;
