import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import type { Breed } from "../types/breed";

interface Props extends Breed {
  image: string;
}

export default ({ image, names, variants, fci }: Props) => (
  <Card>
    <CardMedia component="img" alt={names[0]} height="140" image={image} />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {names[0]}
      </Typography>
      {variants && variants.length > 0 && (
        <Typography gutterBottom variant="h6" component="div">
          {variants[0].names[0]}
        </Typography>
      )}
      <Typography variant="body2" color="text.secondary">
        FCI Group: {fci.group}
        <br />
        FCI Section: {fci.section}
        <br />
        FCI Standard Number: {fci.standardNumber}
      </Typography>
    </CardContent>
    <CardActions>
      <Button size="small">Share</Button>
      <Button size="small">Learn More</Button>
    </CardActions>
  </Card>
);
