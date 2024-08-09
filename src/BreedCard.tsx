import React, { type Dispatch, type SetStateAction } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActionArea from "@mui/material/CardActionArea";
import { styled } from "@mui/material/styles";
import type { Breed, BreedIdentifier } from "../types/breed";

interface Props extends Breed {
  image: string;
  handleCardClick: Dispatch<SetStateAction<BreedIdentifier>>;
}

const CardHeaderImage = styled(CardHeader)(({ image }: { image: string }) => ({
  height: 300,
  background: `url(${image}) no-repeat center center transparent`,
  backgroundSize: "cover",
}));

export default ({ id, variants, image, handleCardClick }: Props) => {
  const onClick = () => {
    const payload: BreedIdentifier = { id };

    if (variants) {
      payload.variantName = variants[0].names[0];
    }

    handleCardClick(payload);
  };

  return (
    <Card onClick={onClick}>
      <CardActionArea sx={{ opacity: 1, "&:hover": { opacity: 0.75 } }}>
        <CardHeaderImage image={image} />
      </CardActionArea>
    </Card>
  );
};
