import React, { useState, useEffect, useContext } from "react";
import * as amplitude from "@amplitude/analytics-browser";
import Container from "@mui/material/Container";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import PetsIcon from "@mui/icons-material/Pets";
import breedsList from "../db";
import PageBreedList from "./pages/BreedList";
import PageImprint from "./pages/Imprint";
import { BreedsContext } from "./contexts/Breeds";
import { SettingsContext } from "./contexts/Settings";
import { flattenBreedVariants, enrichBreedsWithIllustrations } from "./utils";
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

  let breedsWithVariants = breeds;

  if (settings.showBreedVariants) {
    breedsWithVariants = flattenBreedVariants({ breeds });
  }

  const enrichedBreedsWithVariants = enrichBreedsWithIllustrations({
    breeds: breedsWithVariants,
    artStyle: settings.artStyle,
    isVariantsCollapsed: !settings.showBreedVariants,
  });

  const sortedBreeds = enrichedBreedsWithVariants.sort(
    ({ fci: fciA, podcast: podcastA }, { fci: fciB, podcast: podcastB }) => {
      if (settings.sortDirection === "asc") {
        if (settings.sortOrder === "fci-standard-number") {
          return fciA?.standardNumber - fciB?.standardNumber;
        }

        return podcastA[0].airDateTimestamp - podcastB[0].airDateTimestamp;
      }

      if (settings.sortOrder === "fci-standard-number") {
        return fciB?.standardNumber - fciA?.standardNumber;
      }

      return podcastB[0].airDateTimestamp - podcastA[0].airDateTimestamp;
    },
  );

  const storeSettings = (newSettings: Settings) => {
    window.localStorage.setItem("settings", JSON.stringify(newSettings));
  };

  const handleChangeArtStyle = () => {
    const newArtStyle =
      settings.artStyle === "realistic" ? "artsy" : "realistic";
    const newSettings: Settings = { ...settings, artStyle: newArtStyle };

    amplitude.track("Settings: Change Art Style", { artStyle: newArtStyle });

    storeSettings(newSettings);
    setSettings(newSettings);
  };

  const handleChangeSortOrder = (newSortOrder: Settings["sortOrder"]) => {
    let newSettings: Settings = { ...settings };

    // same sort order => toggle sort direction
    if (settings.sortOrder === newSortOrder) {
      newSettings.sortDirection =
        newSettings.sortDirection === "asc" ? "desc" : "asc";
    }

    newSettings.sortOrder = newSortOrder;

    amplitude.track("Settings: Change Sort Order", {
      sortOrder: newSortOrder,
      sortDirection: newSettings.sortDirection,
    });

    storeSettings(newSettings);
    setSettings(newSettings);
  };

  const handleChangeShowBreedVariants = () => {
    let newSettings: Settings = {
      ...settings,
      showBreedVariants: !settings.showBreedVariants,
    };

    amplitude.track("Settings: Change Show Breed Variants", {
      showBreedVariants: newSettings.showBreedVariants,
    });

    storeSettings(newSettings);
    setSettings(newSettings);
  };

  return (
    <SettingsContext.Provider
      value={{
        sortOrder: settings.sortOrder,
        artStyle: settings.artStyle,
        sortDirection: settings.sortDirection,
        showBreedVariants: settings.showBreedVariants,
      }}
    >
      <Container>
        {bottomNavigationValue === "breeds_list" && (
          <BreedsContext.Provider value={sortedBreeds}>
            <PageBreedList
              onChangeArtStyle={handleChangeArtStyle}
              onChangeSortOrder={handleChangeSortOrder}
              onChangeShowBreedVariants={handleChangeShowBreedVariants}
            />
          </BreedsContext.Provider>
        )}

        {bottomNavigationValue === "imprint" && <PageImprint />}

        <BottomNavigation
          showLabels
          value={bottomNavigationValue}
          onChange={(event, newValue) => {
            amplitude.track("Page Select", { page: newValue });
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
