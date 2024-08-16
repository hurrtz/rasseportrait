import React, { type Dispatch, type SetStateAction } from "react";
import type { EnrichedBreed, BreedIdentifier } from "../../types/breed";
import BreedCard from "./Card";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

interface Props {
  breeds: EnrichedBreed[];
  handleCardClick: Dispatch<SetStateAction<BreedIdentifier>>;
}

const Breeds = ({ breeds, handleCardClick }: Props) => {
  if (breeds.length === 0) {
    return (
      <Paper variant="outlined" sx={{ padding: "8px 24px" }}>
        <Typography variant="h6" align="center">
          keine Ergebnisse
        </Typography>

        <Divider sx={{ margin: "8px 0" }} />

        <Typography variant="body2" align="center">
          bitte versuche einen anderen Suchbegriff
        </Typography>
      </Paper>
    );
  }

  return (
    <Grid container spacing={2}>
      {breeds.length === 0 && (
        <Paper>
          <Typography variant="h6" align="center">
            keine Ergebnisse gefunden
          </Typography>
        </Paper>
      )}
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
            image={breed.image}
            handleCardClick={handleCardClick}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Breeds;
