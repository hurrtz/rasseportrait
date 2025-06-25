import { useMemo } from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { type Breed } from "../../types/breed";
import { getBreedVariantNames } from "./utils";

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
}

interface State {
  rawBreeds: Breed[];
  breeds: Breed[];
  selectedBreed?: Breed["id"];
  actions: BreedActions;
  search: Search;
}

const initialState: Omit<State, "actions"> = {
  rawBreeds: [],
  breeds: [],
  search: {
    needle: "",
    results: [],
  },
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
  } = useBreedsStore((state: State) => state);

  if (needle && results) {
    return breeds.filter((breed) => results.includes(breed.id));
  }

  return breeds;
};
export const useBreed = (id: Breed["id"]) =>
  useBreedsStore((state: State) =>
    state.breeds.find((breed) => breed.id === id),
  );
export const useSelectedBreedId = () =>
  useBreedsStore((state: State) => state.selectedBreed);
export const useSelectedBreed = () =>
  useBreedsStore((state: State) =>
    state.breeds.find((breed) => breed.id === state.selectedBreed),
  );
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
export const useSearch = () => useBreedsStore((state: State) => state.search);
