import React, { type Dispatch, type SetStateAction } from "react";
import type { EnrichedBreed, BreedIdentifier } from "../../types/breed";
import BreedCard from "./Card";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface Props {
  breeds: EnrichedBreed[];
  handleCardClick: Dispatch<SetStateAction<BreedIdentifier>>;
}

const Breeds = ({ breeds, handleCardClick }: Props) => {
  if (breeds.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" align="center">
            Keine Rasse gefunden
          </Typography>

          <Typography variant="body2" align="center" mt={1}>
            bitte versuche einen anderen Suchbegriff
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
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
            image={breed.image}
            handleCardClick={handleCardClick}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Breeds;
