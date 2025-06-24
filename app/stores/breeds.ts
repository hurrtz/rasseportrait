import { useMemo } from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { type Breed } from "../../types/breed";
import { getBreedVariantNames } from "./utils";

interface BreedActions {
  setRawBreeds: (breeds: Breed[]) => void;
  setBreeds: (breeds: Breed[]) => void;
  setBreed: (breed: Breed) => void;
  addBreed: (breed: Breed) => void;
  setSelectedBreed: (id?: Breed["id"]) => void;
}

interface State {
  rawBreeds: Breed[];
  breeds: Breed[];
  selectedBreed?: Breed["id"];
  actions: BreedActions;
}

const useBreedsStore = create<State>()(
  devtools((set) => ({
    breeds: [],
    actions: {
      setRawBreeds: (breeds: Breed[]) =>
        set({ rawBreeds: breeds }, undefined, "breeds/setRawBreeds"),
      setBreeds: (breeds: Breed[]) =>
        set({ breeds }, undefined, "breeds/setBreeds"),
      setBreed: (newBreed: Breed) =>
        set(
          (state) => ({
            breeds: state.breeds.map((breed) =>
              breed.id === newBreed.id ? newBreed : breed,
            ),
          }),
          undefined,
          "breeds/setBreed",
        ),
      addBreed: (breed: Breed) =>
        set(
          (state) => ({ breeds: [...state.breeds, breed] }),
          undefined,
          "breeds/addBreed",
        ),
      setSelectedBreed: (id?: Breed["id"]) =>
        set({ selectedBreed: id }, undefined, "breeds/setSelectedBreed"),
    },
  })),
);

export const useRawBreeds = () =>
  useBreedsStore((state: State) => state.rawBreeds);
export const useBreeds = () => useBreedsStore((state: State) => state.breeds);
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

  return useMemo(() => {
    return getBreedVariantNames(breeds, id);
  }, [breeds, id]);
};
