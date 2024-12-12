import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import { useSettingsStore } from "../stores/Settings";
import type { EnrichedBreed, BreedIdentifier } from "../../types/breed";
import { getWindowLocationSearch } from "../utils";

interface Props extends EnrichedBreed {
  image: string;
  handleCardClick: (breedIdentifier: BreedIdentifier) => void;
  isMobile?: boolean;
}

export default ({
  id,
  isOfficiallyPresented,
  variants = [],
  image,
  handleCardClick,
  names,
  fci,
  isMobile,
}: Props) => {
  const { settings } = useSettingsStore();

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

  const standardNumber =
    fci?.standardNumber ?? variants[0]?.fci?.standardNumber;

  return (
    <Card onClick={onClick} sx={{ position: "relative" }}>
      <CardActionArea sx={{ opacity: 1, "&:hover": { opacity: 0.75 } }}>
        <CardHeader
          sx={{
            filter:
              isOfficiallyPresented === false ? "grayscale(1) blur(3px)" : "",
            height: 300,
            background: `url(${isMobile ? image.replace(".jpeg", "_thumbnail.jpeg") : image}) no-repeat center center transparent`,
            backgroundSize: "cover",
          }}
        />
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
              padding: "10px 20px",
              borderRadius: "5px",
              margin: "15px 20px",
              width: "100%",
              backgroundColor: "rgba(255, 255, 255, .25)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, .1)",
              backdropFilter: "blur(4px)",
              fontVariant: "small-caps",
              "-webkit-font-smoothing": "antialiased",
              "-moz-osx-font-smoothing": "grayscale",
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
              <Typography
                variant="subtitle1"
                sx={{
                  fontVariant: "initial",
                  borderTop: "1px solid rgba(0, 0, 0, .25)",
                }}
              >
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
