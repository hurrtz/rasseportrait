import React, { type Dispatch, type SetStateAction } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import type { Breed, BreedIdentifier } from "../../types/breed";

interface Props extends Breed {
  image: string;
  handleCardClick: Dispatch<SetStateAction<BreedIdentifier>>;
}

const CardHeaderImage = styled(CardHeader)(({ image }: { image: string }) => ({
  height: 300,
  background: `url(${image.replace(".jpeg", "_thumbnail.jpeg")}) no-repeat center center transparent`,
  backgroundSize: "cover",
}));

export default ({ id, variants, image, handleCardClick, names }: Props) => {
  const onClick = () => {
    const payload: BreedIdentifier = { id };

    if (variants) {
      payload.variantName = variants[0].names[0];
    }

    handleCardClick(payload);
  };

  return (
    <Card onClick={onClick} sx={{ position: "relative" }}>
      <CardActionArea sx={{ opacity: 1, "&:hover": { opacity: 0.75 } }}>
        <CardHeaderImage image={image} />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 1,
            height: "100%",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Box
            sx={{
              color: "rgba(255, 255, 255, 1)",
              padding: "10px 20px",
              backgroundColor: "rgba(60, 60, 60, .5)",
              borderRadius: "5px",
              margin: "15px 20px",
              width: "100%",
            }}
          >
            <Typography variant="h6">{names[0]}</Typography>

            {variants && variants.length > 0 && (
              <Typography variant="subtitle1">
                {variants[0].names[0]}
              </Typography>
            )}
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
};
