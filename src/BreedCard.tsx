import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import type { Breed, FCI } from "../types/breed";
import { styled } from "@mui/material/styles";

interface Props extends Breed {
  image: string[];
}

const CardHeaderImage = styled(CardHeader)(
  ({ image, fallbackImage }: { image: string; fallbackImage: string }) => ({
    height: 400,
    background: `url(${image}), url(${fallbackImage}) no-repeat center center transparent`,
    backgroundSize: "cover",
  }),
);

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

export default ({ image, names, variants, fci }: Props) => (
  <Card>
    <CardHeaderImage image={image[0]} fallbackImage={image[1]} />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {names[0]}
      </Typography>
      {variants && variants.length > 0 && (
        <Typography gutterBottom variant="h6" component="div">
          {variants[0].names[0]}
        </Typography>
      )}
      <FCIText fci={fci} />
    </CardContent>
    <CardActions>
      <Button size="small">Share</Button>
      <Button size="small">Learn More</Button>
    </CardActions>
  </Card>
);
