import React, { useState, type ChangeEvent } from "react";
import * as amplitude from "@amplitude/analytics-browser";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import BreedList from "../Breed/List";
import Details from "../Details";
import type { BreedIdentifier } from "../../types/breed";
import type { Settings } from "../../types/settings";
import HeaderSection from "../components/HeaderSection";
import SettingsFAB from "../components/SettingsFAB";
import ProgressFCIBreeds from "../components/ProgressFCIBreeds";
import { useSettingsStore } from "../stores/Settings";
import { getWindowLocationSearch } from "../utils";

interface Props {
  onChangeSortOrder: (sortOrder: Settings["sortOrder"]) => void;
  onChangeCollapseSimilarBreeds: () => void;
}

const PageBreedList = ({
  onChangeSortOrder,
  onChangeCollapseSimilarBreeds,
}: Props) => {
  const isMobile = useMediaQuery("(max-width: 480px)");
  const { settings } = useSettingsStore();

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

      <HeaderSection isMobile={isMobile} />

      <ProgressFCIBreeds setSelectedBreed={augmentedSetSelectedBreed} />

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
        isMobile={isMobile}
      />

      <SettingsFAB
        isSettingsModalOpen={isSettingsModalOpen}
        handleSettingsModalOpen={handleSettingsModalOpen}
        handleSettingsModalClose={handleSettingsModalClose}
        onChangeSortOrder={onChangeSortOrder}
        onChangeCollapseSimilarBreeds={onChangeCollapseSimilarBreeds}
        collapseSimilarBreeds={settings.collapseSimilarBreeds}
        isSortOrderFCIEnabled={settings.sortOrder === "fci-standard-number"}
        isSortOrderAirDateEnabled={settings.sortOrder === "air-date"}
        isSortOrderAlphabeticalEnabled={settings.sortOrder === "alphabetical"}
        isSortDirectionAsc={settings.sortDirection === "asc"}
      />
    </>
  );
};

export default PageBreedList;
