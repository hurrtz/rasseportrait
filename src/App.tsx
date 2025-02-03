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
import breedsList from "../db/breeds";
import topicsList from "../db/topics";
import { BreedList, Topics, Tipps, Imprint, DDDHNB } from "./pages";
import { useBreedsStore } from "./stores/Breeds";
import { useTopicsStore } from "./stores/Topics";
import { useSettingsStore } from "./stores/Settings";
import { flattenBreedVariants, enrichWithIllustrations } from "./utils";
import type { Settings } from "../types/settings";
import type { EnrichedBreed } from "../types/breed";
import type { EnrichedTopic } from "../types/topic";

const storedSettings = window.localStorage.getItem("settings");

const App = () => {
  const [tabState, setTabState] = React.useState("breedlist");
  const isMobile = useMediaQuery("(max-width: 480px)");

  const handleTabChange = (event: SyntheticEvent, newValue: string) => {
    amplitude.track("Page: Select", { newPage: newValue });
    setTabState(newValue);
  };

  const { settings, set: setSettings } = useSettingsStore();
  const {
    setCurrentBreeds,
    setBreedsWithVariants,
    currentBreeds: storedBreeds,
  } = useBreedsStore();
  const { setCurrentTopics, currentTopics: storedTopics } = useTopicsStore();

  useEffect(() => {
    if (storedSettings) {
      try {
        const parsedSettings = JSON.parse(storedSettings) as Settings;
        setSettings(parsedSettings);
      } catch {}
    }
  }, [storedSettings]);

  const breeds = Object.values(breedsList);
  const topics = Object.values(topicsList);

  let breedsWithVariants = breeds;

  if (!settings.collapseSimilarBreeds) {
    breedsWithVariants = flattenBreedVariants({ breeds });
  }

  const enrichedBreedsWithVariants = enrichWithIllustrations({
    elements: breedsWithVariants,
    type: "breeds",
  }) as EnrichedBreed[];

  const enrichedTopics = enrichWithIllustrations({
    elements: topics,
    type: "topics",
  }) as EnrichedTopic[];

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
      enrichWithIllustrations({
        elements: flattenBreedVariants({ breeds }),
        type: "breeds",
      }) as EnrichedBreed[],
    );
  }

  if (!isEqual(storedTopics, enrichedTopics)) {
    setCurrentTopics(enrichedTopics);
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
              <Tab value="dddhnb" label="DDDHNB" icon={<DDDHWNBIcon />} />
              <Tab value="imprint" label="Impressum" icon={<ImprintIcon />} />
            </TabList>
          </Box>

          <TabPanel value="breedlist" sx={{ width: "100%" }}>
            <BreedList
              onChangeSortOrder={handleChangeSortOrder}
              onChangeCollapseSimilarBreeds={handleChangeCollapseSimilarBreeds}
            />
          </TabPanel>

          <TabPanel value="topics" sx={{ width: "100%" }}>
            <Topics />
          </TabPanel>

          <TabPanel value="tipps" sx={{ width: "100%" }}>
            <Tipps />
          </TabPanel>

          <TabPanel value="dddhnb" sx={{ width: "100%" }}>
            <DDDHNB />
          </TabPanel>

          <TabPanel value="imprint" sx={{ width: "100%" }}>
            <Imprint />
          </TabPanel>
        </TabContext>
      </Box>
    </Container>
  );
};

export default App;
