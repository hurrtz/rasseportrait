import React, { useState, useContext, type ChangeEvent } from "react";
import * as amplitude from "@amplitude/analytics-browser";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import BreedList from "../Breed/List";
import Details from "../Details";
import type { BreedIdentifier } from "../../types/breed";
import type { Settings } from "../../types/settings";
import HeaderSection from "../components/HeaderSection";
import SettingsFAB from "../components/SettingsFAB";
import ProgressFCIBreeds from "../components/ProgressFCIBreeds";
import { SettingsContext } from "../contexts/Settings";
import { getWindowLocationSearch } from "../utils";

interface Props {
  onChangeArtStyle: () => void;
  onChangeSortOrder: (sortOrder: Settings["sortOrder"]) => void;
  onChangeCollapseSimilarBreeds: () => void;
}

const PageBreedList = ({
  onChangeArtStyle,
  onChangeSortOrder,
  onChangeCollapseSimilarBreeds,
}: Props) => {
  const isMobile = useMediaQuery("(max-width: 480px");
  const isDesktop = useMediaQuery("(min-width: 1200px");
  const settings = useContext(SettingsContext);
  const searchParams = new URLSearchParams(location.search);

  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || "",
  );

  const [selectedBreed, setSelectedBreed] = useState<BreedIdentifier>(
    searchParams.get("breed")
      ? {
          id: String(searchParams.get("breed")),
          variantName: searchParams.get("variant") || undefined,
        }
      : undefined,
  );

  const augmentedSetSelectedBreed = (breedIdentifier?: BreedIdentifier) => {
    amplitude.track("Breed Details", {
      open: breedIdentifier?.id !== undefined,
      breed: breedIdentifier?.id,
      variant: breedIdentifier?.variantName,
    });
    setSelectedBreed(breedIdentifier);
    window.history.replaceState(
      {},
      "",
      `?${getWindowLocationSearch([
        {
          name: "breed",
          value: breedIdentifier?.id ? String(breedIdentifier.id) : undefined,
        },
        { name: "variant", value: breedIdentifier?.variantName },
      ])}`,
    );
  };

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const handleSettingsModalOpen = () => setIsSettingsModalOpen(true);
  const handleSettingsModalClose = () => setIsSettingsModalOpen(false);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    amplitude.track("Search Breed", { value: event.target.value });
    if (event && event.target) {
      window.history.replaceState(
        {},
        "",
        `?${getWindowLocationSearch([{ name: "search", value: event.target.value }])}`,
      );
      setSearchValue(event.target.value);
    }
  };

  return (
    <>
      <Details
        selectedBreed={selectedBreed}
        setSelectedBreed={augmentedSetSelectedBreed}
      />

      <SettingsFAB
        isSettingsModalOpen={isSettingsModalOpen}
        handleSettingsModalOpen={handleSettingsModalOpen}
        handleSettingsModalClose={handleSettingsModalClose}
        onChangeArtStyle={onChangeArtStyle}
        onChangeSortOrder={onChangeSortOrder}
        onChangeCollapseSimilarBreeds={onChangeCollapseSimilarBreeds}
        isArtStyleEnabled={settings.artStyle === "artsy"}
        collapseSimilarBreeds={settings.collapseSimilarBreeds}
        isSortOrderFCIEnabled={settings.sortOrder === "fci-standard-number"}
        isSortOrderAirDateEnabled={settings.sortOrder === "air-date"}
        isSortDirectionAsc={settings.sortDirection === "asc"}
      />

      <HeaderSection isMobile={isMobile} />

      <ProgressFCIBreeds />

      {isDesktop === false && (
        <Stack
          direction="row"
          alignItems="center"
          mt={4}
          sx={{ pointerEvents: "none" }}
        >
          <Button variant="outlined" size="small" sx={{ minHeight: "47px" }}>
            <Typography align="left" textTransform="none" fontSize="small">
              Psst! Bilder langweilig? Andere Sortierung gefällig? Klick aufs
              Rädchen!
            </Typography>
          </Button>

          <Box
            sx={{
              width: "100px",
              height: "30px",
              marginTop: "-30px",
              borderBottom: "1px solid rgba(25, 118, 210, 0.5)",
              borderRight: "1px solid rgba(25, 118, 210, 0.5)",
              borderRadius: "0 0 25px",
              marginRight: "28px",
              position: "relative",
              flex: "1 1 auto",
              ["&::before"]: {
                content: '""',
                display: "block",
                width: "0",
                height: "0",
                borderLeft: "10px solid transparent",
                borderRight: "10px solid transparent",
                borderBottom: "15px solid rgba(25, 118, 210, 0.5)",
                position: "absolute",
                top: "-14px",
                right: "-10px",
              },
            }}
          ></Box>
        </Stack>
      )}

      <Box component="form" noValidate autoComplete="off" mt={4} mb={4}>
        <TextField
          label="Suche nach einer Rasse oder der FCI Standardnummer"
          variant="standard"
          fullWidth
          onChange={handleSearchChange}
          value={searchValue}
        />
      </Box>

      <BreedList
        searchValue={searchValue}
        setSelectedBreed={augmentedSetSelectedBreed}
      />
    </>
  );
};

export default PageBreedList;
