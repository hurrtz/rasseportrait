import React, { type ReactElement } from "react";
import { render } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import {
  MemoryRouter,
  Route,
  Routes,
  useLocation,
  type InitialEntry,
} from "react-router";
import type { Breed, Podcast } from "types/breed";
import useBreedsStore from "~/stores/breeds";
import { toDisplayBreeds } from "~/utils/breed";
import { theme } from "~/theme";

export const makePodcast = (overrides: Partial<Podcast> = {}): Podcast => ({
  number: 7,
  episode: "Hunde, die bellen",
  sources: [
    {
      url: "https://open.spotify.com/episode/abc",
      type: "audio",
      provider: "spotify",
    },
    { url: "https://plus.rtl.de/podcast/abc", type: "audio", provider: "rtl" },
  ],
  ...overrides,
  meta: {
    internal: "portrait",
    public: "Rasseportrait",
    timecode: 2690,
    airDate: "2026-04-08",
    isGuessable: true,
    isGuessedCorrectly: true,
    guessedBy: "mr",
    ...overrides.meta,
  },
});

export const makeBreed = (
  overrides: Partial<Omit<Breed, "details">> & {
    details?: Partial<Breed["details"]>;
  } = {},
): Breed => ({
  id: 297,
  classification: { fci: { group: 1, section: 1, standardNumber: 297 } },
  podcast: [makePodcast()],
  furtherReading: [],
  ...overrides,
  details: {
    internal: "border_collie",
    public: ["Border Collie"],
    ...overrides.details,
  },
});

/** Puts raw breeds into the store as if breeds.json had just loaded */
export const seedBreeds = (rawBreeds: Breed[]) => {
  useBreedsStore.setState({
    rawBreeds,
    breeds: toDisplayBreeds(rawBreeds),
    status: "ready",
    error: null,
  });
  return useBreedsStore.getState().breeds;
};

export const resetBreedsStore = () =>
  useBreedsStore.setState({
    rawBreeds: [],
    breeds: [],
    status: "idle",
    error: null,
    query: "",
    sortBy: "airDate",
    sortOrder: "desc",
  });

const LocationProbe = () => {
  const location = useLocation();
  return (
    <div data-testid="location">
      {location.pathname}
      {location.search}
    </div>
  );
};

interface RenderOptions {
  /** Start URL; ignored when `entries` is given */
  route?: string;
  /** Full history, e.g. to start on a page that was reached from another */
  entries?: InitialEntry[];
  /** Route path `ui` is mounted at, e.g. "/rasse/:slug" */
  path?: string;
}

/**
 * Renders `ui` inside Mantine and a memory router. Paths other than `path`
 * render nothing but a location probe, so navigation can be asserted.
 */
export const renderWithProviders = (
  ui: ReactElement,
  { route = "/", entries, path = "*" }: RenderOptions = {},
) =>
  render(
    <MantineProvider theme={theme}>
      <MemoryRouter
        initialEntries={entries ?? [route]}
        initialIndex={entries ? entries.length - 1 : 0}
      >
        <Routes>
          <Route
            path={path}
            element={
              <>
                {ui}
                <LocationProbe />
              </>
            }
          />
          <Route path="*" element={<LocationProbe />} />
        </Routes>
      </MemoryRouter>
    </MantineProvider>,
  );
