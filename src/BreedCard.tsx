import React, { type Dispatch, type SetStateAction } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import type { Breed, FCI } from "../types/breed";

interface Props extends Breed {
  image: string;
  handleCardClick: Dispatch<SetStateAction<number | string | undefined>>;
}

const CardHeaderImage = styled(CardHeader)(({ image }: { image: string }) => ({
  height: 300,
  background: `url(${image}) no-repeat center center transparent`,
  backgroundSize: "cover",
}));

const FCIText = ({ fci }: { fci: FCI }) => {
  if (fci && fci.standardNumber > 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        FCI: Gruppe {fci.group}, Sektion: {fci.section}, Standardnummer:{" "}
        {fci.standardNumber}
      </Typography>
    );
  }

  return (
    <Typography variant="body2" color="text.secondary">
      —keine FCI-anerkannte Rasse—
    </Typography>
  );
};

export default ({ id, image, handleCardClick }: Props) => {
  const onClick = () => {
    handleCardClick(id);
  };

  return (
    <Card onClick={onClick}>
      <CardHeaderImage image={image} />
    </Card>
  );
};
