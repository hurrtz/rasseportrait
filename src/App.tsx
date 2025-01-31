import React, { useEffect, type SyntheticEvent } from "react";
import * as amplitude from "@amplitude/analytics-browser";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import isEqual from "lodash.isequal";
import BreedListIcon from "@mui/icons-material/Pets";
import TippsIcon from "@mui/icons-material/Lightbulb";
import TopicIcon from "@mui/icons-material/Topic";
import DDDHWNBIcon from "@mui/icons-material/Sick";
import ImprintIcon from "@mui/icons-material/Policy";
import useMediaQuery from "@mui/material/useMediaQuery";
import breedsList from "../db";
import PageBreedList from "./pages/BreedList";
import PageImprint from "./pages/Imprint";
import PageTipps from "./pages/Tipps";
import PageDDDHWNB from "./pages/DDDHWNB";
import PageTopics from "./pages/Topics";
import { useBreedsStore } from "./stores/Breeds";
import { useSettingsStore } from "./stores/Settings";
import { flattenBreedVariants, enrichBreedsWithIllustrations } from "./utils";
import type { Settings } from "../types/settings";

const storedSettings = window.localStorage.getItem("settings");

const App = () => {
  const [tabState, setTabState] = React.useState("breedlist");
  const isMobile = useMediaQuery("(max-width: 480px)");

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    setTabState(newValue);
  };

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
    <Container sx={{ padding: isMobile ? 0 : undefined }}>
      <Box
        sx={{
          flexGrow: 1,
          display: isMobile ? "static" : "flex",
        }}
      >
        <TabContext value={tabState}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleTabChange}
              orientation={isMobile ? "horizontal" : "vertical"}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
            >
              <Tab
                value="breedlist"
                label="Rasseportrait"
                icon={<BreedListIcon />}
              />
              <Tab value="topics" label="Themen" icon={<TopicIcon />} />
              <Tab value="tipps" label="Tipps" icon={<TippsIcon />} />
              <Tab value="dddhwnb" label="DDDHWNB" icon={<DDDHWNBIcon />} />
              <Tab value="imprint" label="Impressum" icon={<ImprintIcon />} />
            </TabList>
          </Box>

          <TabPanel value="breedlist">
            <PageBreedList
              onChangeSortOrder={handleChangeSortOrder}
              onChangeCollapseSimilarBreeds={handleChangeCollapseSimilarBreeds}
            />
          </TabPanel>

          <TabPanel value="topics">
            <PageTopics />
          </TabPanel>

          <TabPanel value="tipps">
            <PageTipps />
          </TabPanel>

          <TabPanel value="dddhwnb">
            <PageDDDHWNB />
          </TabPanel>

          <TabPanel value="imprint">
            <PageImprint />
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
};

export default App;
