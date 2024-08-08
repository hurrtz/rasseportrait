import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import type { Breed, FCI } from "../types/breed";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 5,
};

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

interface Props {
  breed?: Breed;
}

export default ({ breed }: Props) => {
  if (breed) {
    const { image = [], names, variants, fci, podcast, furtherReading } = breed;

    const openPodcast = () => {
      window.open(podcast[0].url, "_blank");
    };

    const openReadMore = () => {
      window.open(furtherReading[0].url, "_blank");
    };

    return (
      <Box sx={style}>
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
            <Typography gutterBottom variant="subtitle2" component="div" mt={2}>
              Podcast-Episode
              <br />
              <strong>{podcast[0].episode}</strong> (ab Minute{" "}
              {Math.floor(podcast[0].timecode / 60)}, Sekunde{" "}
              {podcast[0].timecode % 60})
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" type="button" onClick={openPodcast}>
              Zum Podcast
            </Button>
            <Button size="small" type="button" onClick={openReadMore}>
              Lese mehr
            </Button>
          </CardActions>
        </Card>
      </Box>
    );
  }

  return undefined;
};
