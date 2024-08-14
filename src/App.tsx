import React, { useState, useContext } from "react";
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

const App = () => {
  const { artStyle } = useContext(SettingsContext);
  const [bottomNavigationValue, setBottomNavigationValue] =
    useState("breeds_list");

  const breeds = Object.values(breedsList);
  const enrichedBreedsWithVariants = flattenAndEnrichBreedVariants({
    breeds,
    artStyle,
  });
  const sortedBreeds = enrichedBreedsWithVariants.sort(
    ({ fci: fci1 }, { fci: fciB }) => fci1.standardNumber - fciB.standardNumber,
  );

  return (
    <SettingsContext.Provider value={{ artStyle: "realistic" }}>
      <Container>
        {bottomNavigationValue === "breeds_list" && (
          <BreedsContext.Provider value={sortedBreeds}>
            <PageBreedList />
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
