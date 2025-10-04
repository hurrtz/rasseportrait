import { useMemo } from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { type Breed } from "../../types/breed";
import { getBreedVariantNames } from "./utils";
import { sortBreeds } from "../pages/rasseportrait/utils";
import { logger } from "~/utils/logger";
import {
  BREEDS_STORE_NAME,
  DEFAULT_SORT_BY,
  DEFAULT_SORT_ORDER,
  DEFAULT_SEARCH_NEEDLE,
  DEFAULT_SEARCH_RESULTS,
  ERROR_NO_BREEDS_FOUND,
  ERROR_UNKNOWN,
} from "~/constants";

type Search = {
  needle?: string | null;
  results?: Breed["id"][] | null;
};

interface BreedActions {
  initialize: () => Promise<void>;
  setRawBreeds: (breeds: Breed[]) => void;
  setBreeds: (breeds: Breed[]) => void;
  setBreed: (breed: Breed) => void;
  addBreed: (breed: Breed) => void;
  setSelectedBreed: (id?: Breed["id"]) => void;
  setSearch: (search: Search) => void;
  setSort: (sort: {
    sortBy: "name" | "fci" | "airDate";
    sortOrder: "asc" | "desc";
  }) => void;
}

interface State {
  rawBreeds: Breed[];
  breeds: Breed[];
  selectedBreed?: Breed["id"];
  loading: boolean;
  error: string | null;
  initialized: boolean;
  actions: BreedActions;
  search: Search;
  sortBy: "name" | "fci" | "airDate";
  sortOrder: "asc" | "desc";
}

const initialState: Omit<State, "actions"> = {
  rawBreeds: [],
  breeds: [],
  loading: false,
  error: null,
  initialized: false,
  search: {
    needle: DEFAULT_SEARCH_NEEDLE,
    results: DEFAULT_SEARCH_RESULTS,
  },
  sortBy: DEFAULT_SORT_BY,
  sortOrder: DEFAULT_SORT_ORDER,
};

const useBreedsStore = create<State>()(
  devtools(
    (set) => ({
      ...initialState,
      actions: {
        initialize: async () => {
          const state = useBreedsStore.getState();
          if (state.initialized || state.loading) return;

          set({ loading: true, error: null }, undefined, "initialize:start");

          try {
            // Import breed data
            const breedsModule = await import("../../db/breeds");
            const breedsDB = breedsModule.default;
            const breeds = Object.values(breedsDB) as Breed[];

            if (!breeds.length) {
              throw new Error(ERROR_NO_BREEDS_FOUND);
            }

            logger.info(`Loaded ${breeds.length} breeds from database`);

            // Use existing actions to set data
            const { setRawBreeds, setBreeds } =
              useBreedsStore.getState().actions;
            setRawBreeds(breeds);

            // Filter and merge breeds (logic from Rasseportrait page)
            const { mergeGroupedBreeds } = await import(
              "../pages/rasseportrait/utils"
            );
            const singleBreeds = breeds.filter(
              (breed) => !breed.details.groupAs,
            );
            const mergedBreeds = mergeGroupedBreeds(breeds);
            const allBreeds = [...singleBreeds, ...mergedBreeds];

            setBreeds(allBreeds);

            set(
              { initialized: true, loading: false },
              undefined,
              "initialize:success",
            );
          } catch (e) {
            const error = e instanceof Error ? e.message : ERROR_UNKNOWN;
            logger.error("Failed to initialize breeds:", e);
            set(
              { error, loading: false, initialized: false },
              undefined,
              "initialize:error",
            );
          }
        },
        setRawBreeds: (breeds: Breed[]) =>
          set({ rawBreeds: breeds }, undefined, "setRawBreeds"),
        setBreeds: (breeds: Breed[]) => set({ breeds }, undefined, "setBreeds"),
        setBreed: (newBreed: Breed) =>
          set(
            (state) => ({
              breeds: state.breeds.map((breed) =>
                breed.id === newBreed.id ? newBreed : breed,
              ),
            }),
            undefined,
            "setBreed",
          ),
        addBreed: (breed: Breed) =>
          set(
            (state) => ({ breeds: [...state.breeds, breed] }),
            undefined,
            "addBreed",
          ),
        setSelectedBreed: (id?: Breed["id"]) =>
          set({ selectedBreed: id }, undefined, "setSelectedBreed"),
        setSearch: ({ needle, results }: Search) =>
          set(
            (state) => ({
              search: {
                needle:
                  needle === null
                    ? initialState.search.needle
                    : (needle ?? state.search.needle),
                results:
                  results === null
                    ? initialState.search.results
                    : (results ?? state.search.results),
              },
            }),
            undefined,
            "setSearch",
          ),
        setSort: ({
          sortBy,
          sortOrder,
        }: {
          sortBy: "name" | "fci" | "airDate";
          sortOrder: "asc" | "desc";
        }) =>
          set(
            (state) => ({
              sortBy,
              sortOrder:
                state.sortBy === sortBy
                  ? state.sortOrder === "asc"
                    ? "desc"
                    : "asc"
                  : sortOrder,
            }),
            undefined,
            "setSort",
          ),
      },
    }),
    {
      name: BREEDS_STORE_NAME,
      trace: true,
    },
  ),
);

export const useRawBreeds = () =>
  useBreedsStore((state: State) => state.rawBreeds);

export const useAllBreeds = () =>
  useBreedsStore((state: State) => state.breeds);

export const useBreeds = () => {
  const {
    search: { needle, results },
    breeds,
    sortBy,
    sortOrder,
  } = useBreedsStore((state: State) => state);

  const sortedBreeds = useMemo(() => {
    return sortBreeds({ breeds, sortBy, sortOrder });
  }, [breeds, sortBy, sortOrder]);

  if (needle && results) {
    return sortedBreeds.filter((breed) => results.includes(breed.id));
  }

  return sortedBreeds;
};

export const useBreed = (id: Breed["id"]) =>
  useBreedsStore((state: State) =>
    state.breeds.find((breed) => breed.id === id),
  );

export const useSelectedBreedId = () =>
  useBreedsStore((state: State) => state.selectedBreed);

export const useBreedActions = () =>
  useBreedsStore((state: State) => state.actions);

export const useBreedGroup = (groupAs: Breed["details"]["groupAs"]) =>
  useBreedsStore((state: State) =>
    state.breeds.filter((breed) => breed.details.groupAs === groupAs),
  );

export const useBreedVariantNames = (id: Breed["id"]) => {
  const breeds = useBreedsStore((state: State) => state.breeds);

  return useMemo(() => getBreedVariantNames(breeds, id), [breeds, id]);
};

// More granular selector for better performance
export const useBreedById = (id: Breed["id"]) => {
  return useBreedsStore((state: State) =>
    state.breeds.find((breed) => breed.id === id),
  );
};

export const useSearch = () => useBreedsStore((state: State) => state.search);

export const useSelectedBreed = () => {
  const { selectedBreed, breeds } = useBreedsStore((state: State) => state);

  return useMemo(() => {
    if (selectedBreed && breeds) {
      return breeds.find(({ id }) => id === selectedBreed);
    }

    return undefined;
  }, [selectedBreed, breeds]);
};

export const useSortBy = () => useBreedsStore((state: State) => state.sortBy);

export const useSortOrder = () =>
  useBreedsStore((state: State) => state.sortOrder);

// Loading and error state selectors
export const useLoading = () => useBreedsStore((state: State) => state.loading);

export const useError = () => useBreedsStore((state: State) => state.error);

export const useInitialized = () =>
  useBreedsStore((state: State) => state.initialized);
