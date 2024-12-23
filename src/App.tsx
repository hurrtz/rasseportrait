import React, { useState, useEffect } from "react";
import * as amplitude from "@amplitude/analytics-browser";
import Container from "@mui/material/Container";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import PetsIcon from "@mui/icons-material/Pets";
import isEqual from "lodash.isequal";
import breedsList from "../db";
import PageBreedList from "./pages/BreedList";
import PageImprint from "./pages/Imprint";
import { useBreedsStore } from "./stores/Breeds";
import { useSettingsStore } from "./stores/Settings";
import { flattenBreedVariants, enrichBreedsWithIllustrations } from "./utils";
import type { Settings } from "../types/settings";

const storedSettings = window.localStorage.getItem("settings");

const App = () => {
  const { settings, set: setSettings } = useSettingsStore();
  const {
    setCurrentBreeds,
    setBreedsWithVariants,
    currentBreeds: storedBreeds,
  } = useBreedsStore();

  useEffect(() => {
    if (storedSettings) {
      try {
        const parsedSettings = JSON.parse(storedSettings) as Settings;
        setSettings(parsedSettings);
      } catch {}
    }
  }, [storedSettings]);

  const [bottomNavigationValue, setBottomNavigationValue] =
    useState("breeds_list");

  const breeds = Object.values(breedsList);

  let breedsWithVariants = breeds;

  if (!settings.collapseSimilarBreeds) {
    breedsWithVariants = flattenBreedVariants({ breeds });
  }

  const enrichedBreedsWithVariants = enrichBreedsWithIllustrations({
    breeds: breedsWithVariants,
  });

  const sortedBreeds = enrichedBreedsWithVariants.sort(
    (
      {
        fci: fciA,
        podcast: podcastA,
        variants: variantsA = [],
        names: namesA = [],
      },
      {
        fci: fciB,
        podcast: podcastB,
        variants: variantsB = [],
        names: namesB = [],
      },
    ) => {
      if (settings.sortDirection === "asc") {
        if (settings.sortOrder === "fci-standard-number") {
          const standardNumberA =
            fciA?.standardNumber ?? variantsA[0]?.fci?.standardNumber ?? 0;
          const standardNumberB =
            fciB?.standardNumber ?? variantsB[0]?.fci?.standardNumber ?? 0;

          return standardNumberA - standardNumberB;
        }

        if (settings.sortOrder === "alphabetical") {
          const nameA = namesA[0] ?? variantsA[0]?.names[0];
          const nameB = namesB[0] ?? variantsB[0]?.names[0];

          return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
        }

        return podcastA[0].airDate.getTime() - podcastB[0].airDate.getTime();
      }

      if (settings.sortOrder === "fci-standard-number") {
        const standardNumberA =
          fciA?.standardNumber ??
          variantsA[variantsA.length - 1]?.fci?.standardNumber ??
          0;
        const standardNumberB =
          fciB?.standardNumber ??
          variantsB[variantsB.length - 1]?.fci?.standardNumber ??
          0;

        return standardNumberB - standardNumberA;
      }

      if (settings.sortOrder === "alphabetical") {
        const nameA = namesA[0] ?? variantsA[0]?.names[0];
        const nameB = namesB[0] ?? variantsB[0]?.names[0];

        return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
      }

      return podcastB[0].airDate.getTime() - podcastA[0].airDate.getTime();
    },
  );

  const storeSettings = (newSettings: Settings) => {
    window.localStorage.setItem("settings", JSON.stringify(newSettings));
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

  const handleChangeCollapseSimilarBreeds = () => {
    let newSettings: Settings = {
      ...settings,
      collapseSimilarBreeds: !settings.collapseSimilarBreeds,
    };

    amplitude.track("Settings: Change Collapse Similar Breeds", {
      collapseSimilarBreeds: newSettings.collapseSimilarBreeds,
    });

    storeSettings(newSettings);
    setSettings(newSettings);
  };

  if (!isEqual(storedBreeds, sortedBreeds)) {
    setCurrentBreeds(sortedBreeds);
    setBreedsWithVariants(
      enrichBreedsWithIllustrations({
        breeds: flattenBreedVariants({ breeds }),
      }),
    );
  }

  return (
    <Container>
      {bottomNavigationValue === "breeds_list" && (
        <PageBreedList
          onChangeSortOrder={handleChangeSortOrder}
          onChangeCollapseSimilarBreeds={handleChangeCollapseSimilarBreeds}
        />
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
  );
};

export default App;
