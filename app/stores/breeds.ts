import { useMemo } from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { type Breed } from "../../types/breed";
import { getBreedVariantNames } from "./utils";
import { sortBreeds } from "../pages/rasseportrait/utils";

type Search = {
  needle?: string | null;
  results?: Breed["id"][] | null;
};

interface BreedActions {
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
  actions: BreedActions;
  search: Search;
  sortBy: "name" | "fci" | "airDate";
  sortOrder: "asc" | "desc";
}

const initialState: Omit<State, "actions"> = {
  rawBreeds: [],
  breeds: [],
  search: {
    needle: "",
    results: [],
  },
  sortBy: "airDate",
  sortOrder: "desc",
};

const useBreedsStore = create<State>()(
  devtools(
    (set) => ({
      ...initialState,
      actions: {
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
      name: "BreedsStore",
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
