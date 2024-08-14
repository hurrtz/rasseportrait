import React, { useState, useEffect } from "react";
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

const DEFAULT_SETTINGS: Settings = {
  artStyle: "realistic",
};

const storedSettings = window.localStorage.getItem("settings");

const App = () => {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

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
    ({ fci: fci1 }, { fci: fciB }) => fci1.standardNumber - fciB.standardNumber,
  );

  const handleChangeArtStyle = () => {
    const newArtStyle =
      settings.artStyle === "realistic" ? "artsy" : "realistic";
    const newSettings: Settings = { ...settings, artStyle: newArtStyle };

    window.localStorage.setItem("settings", JSON.stringify(newSettings));
    setSettings(newSettings);
  };

  return (
    <SettingsContext.Provider value={{ artStyle: settings.artStyle }}>
      <Container>
        {bottomNavigationValue === "breeds_list" && (
          <BreedsContext.Provider value={sortedBreeds}>
            <PageBreedList onChangeArtStyle={handleChangeArtStyle} />
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
