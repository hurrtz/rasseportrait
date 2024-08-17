import React, { useState, useContext, type ChangeEvent } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";
import BreedList from "../Breed/List";
import Details from "../Details";
import type { BreedIdentifier } from "../../types/breed";
import type { Settings } from "../../types/settings";
import HeaderSection from "../components/HeaderSection";
import SettingsFAB from "../components/SettingsFAB";
import { SettingsContext } from "../contexts/Settings";

interface Props {
  onChangeArtStyle: () => void;
  onChangeSortOrder: (sortOrder: Settings["sortOrder"]) => void;
  onChangeShowBreedVariants: () => void;
}

const PageBreedList = ({
  onChangeArtStyle,
  onChangeSortOrder,
  onChangeShowBreedVariants,
}: Props) => {
  const isMobile = useMediaQuery("(max-width: 480px");
  const settings = useContext(SettingsContext);
  const [searchValue, setSearchValue] = useState("");
  const [selectedBreed, setSelectedBreed] = useState<BreedIdentifier>();

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const handleSettingsModalOpen = () => setIsSettingsModalOpen(true);
  const handleSettingsModalClose = () => setIsSettingsModalOpen(false);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event && event.target) {
      setSearchValue(event.target.value);
    }
  };

  return (
    <>
      <Details
        selectedBreed={selectedBreed}
        setSelectedBreed={setSelectedBreed}
      />

      <SettingsFAB
        isSettingsModalOpen={isSettingsModalOpen}
        handleSettingsModalOpen={handleSettingsModalOpen}
        handleSettingsModalClose={handleSettingsModalClose}
        onChangeArtStyle={onChangeArtStyle}
        onChangeSortOrder={onChangeSortOrder}
        onChangeShowBreedVariants={onChangeShowBreedVariants}
        isArtStyleEnabled={settings.artStyle === "artsy"}
        isBreedVariantsEnabled={settings.showBreedVariants}
        isSortOrderFCIEnabled={settings.sortOrder === "fci-standard-number"}
        isSortOrderAirDateEnabled={settings.sortOrder === "air-date"}
        isSortDirectionAsc={settings.sortDirection === "asc"}
      />

      <HeaderSection isMobile={isMobile} />

      <Box component="form" noValidate autoComplete="off" mt={4} mb={4}>
        <TextField
          label="Suche nach einer Rasse oder der FCI Standardnummer"
          variant="outlined"
          fullWidth
          onChange={handleSearchChange}
        />
      </Box>

      <BreedList
        searchValue={searchValue}
        setSelectedBreed={setSelectedBreed}
      />
    </>
  );
};

export default PageBreedList;
