import React, { useState, useEffect, useContext } from "react";
import Container from "@mui/material/Container";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import PetsIcon from "@mui/icons-material/Pets";
import breedsList from "../db";
import PageBreedList from "./PageBreedList";
import PageImprint from "./PageImprint";
import { BreedsContext } from "./contexts/Breeds";
import { SettingsContext } from "./contexts/Settings";
import { flattenAndEnrichBreedVariants } from "./utils";
import type { Settings } from "../types/settings";

const storedSettings = window.localStorage.getItem("settings");

const App = () => {
  const settingsContext = useContext(SettingsContext);
  const [settings, setSettings] = useState<Settings>(settingsContext);

  useEffect(() => {
    if (storedSettings) {
      try {
        const settings = JSON.parse(storedSettings) as Settings;
        setSettings(settings);
      } catch {}
    }
  }, [storedSettings]);

  const [bottomNavigationValue, setBottomNavigationValue] =
    useState("breeds_list");

  const breeds = Object.values(breedsList);
  const enrichedBreedsWithVariants = flattenAndEnrichBreedVariants({
    breeds,
    artStyle: settings.artStyle,
  });
  const sortedBreeds = enrichedBreedsWithVariants.sort(
    ({ fci: fciA, podcast: podcastA }, { fci: fciB, podcast: podcastB }) => {
      if (settings.sortOrder === "fci-standard-number") {
        return fciA?.standardNumber - fciB?.standardNumber;
      }

      const episodeNumberA =
        typeof podcastA[0].number === "number" ? podcastA[0].number : Infinity;
      const episodeNumberB =
        typeof podcastB[0].number === "number" ? podcastB[0].number : Infinity;

      return episodeNumberA - episodeNumberB;
    },
  );

  const storeSettings = (newSettings: Settings) => {
    window.localStorage.setItem("settings", JSON.stringify(newSettings));
  };

  const handleChangeArtStyle = () => {
    const newArtStyle =
      settings.artStyle === "realistic" ? "artsy" : "realistic";
    const newSettings: Settings = { ...settings, artStyle: newArtStyle };

    storeSettings(newSettings);
    setSettings(newSettings);
  };

  const handleChangeSortOrder = () => {
    const newSortOrder =
      settings.sortOrder === "fci-standard-number"
        ? "episode-number"
        : "fci-standard-number";
    const newSettings: Settings = { ...settings, sortOrder: newSortOrder };

    storeSettings(newSettings);
    setSettings(newSettings);
  };

  return (
    <SettingsContext.Provider
      value={{ sortOrder: settings.sortOrder, artStyle: settings.artStyle }}
    >
      <Container>
        {bottomNavigationValue === "breeds_list" && (
          <BreedsContext.Provider value={sortedBreeds}>
            <PageBreedList
              onChangeArtStyle={handleChangeArtStyle}
              onChangeSortOrder={handleChangeSortOrder}
            />
          </BreedsContext.Provider>
        )}

        {bottomNavigationValue === "imprint" && <PageImprint />}

        <BottomNavigation
          showLabels
          value={bottomNavigationValue}
          onChange={(event, newValue) => {
            setBottomNavigationValue(newValue);
          }}
          sx={{ marginTop: 5 }}
        >
          <BottomNavigationAction
            label="Hunderassen"
            icon={<PetsIcon />}
            value="breeds_list"
          />
          <BottomNavigationAction
            label="Impressum"
            icon={<ContactPhoneIcon />}
            value="imprint"
          />
        </BottomNavigation>
      </Container>
    </SettingsContext.Provider>
  );
};

export default App;
