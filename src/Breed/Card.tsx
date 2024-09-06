import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { SettingsContext } from "../contexts/Settings";
import type { Breed, BreedIdentifier } from "../../types/breed";
import { getWindowLocationSearch } from "../utils";

interface Props extends Breed {
  image: string;
  handleCardClick: (breedIdentifier: BreedIdentifier) => void;
}

const CardHeaderImage = styled(CardHeader)(({ image }: { image: string }) => ({
  height: 300,
  background: `url(${image.replace(".jpeg", "_thumbnail.jpeg")}) no-repeat center center transparent`,
  backgroundSize: "cover",
}));

export default ({
  id,
  variants,
  image,
  handleCardClick,
  names,
  fci: { standardNumber },
}: Props) => {
  const settings = useContext(SettingsContext);

  const onClick = () => {
    const payload: BreedIdentifier = { id };
    const variant = variants && variants[0] ? variants[0].names[0] : undefined;

    if (variants) {
      payload.variantName = variant;
    }

    window.history.replaceState(
      {},
      "",
      `?${getWindowLocationSearch([
        { name: "breed", value: String(id) },
        { name: "variant", value: variant },
      ])}`,
    );
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

            {!settings.collapseSimilarBreeds &&
              variants &&
              variants.length > 0 && (
                <Typography variant="subtitle1">
                  {variants[0].names[0]}
                </Typography>
              )}

            {settings.sortOrder === "fci-standard-number" && (
              <Typography variant="subtitle1">
                {standardNumber && standardNumber > 0
                  ? `FCI Standardnummer ${standardNumber}`
                  : "— keine FCI-anerkannte Rasse —"}
              </Typography>
            )}
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
};
