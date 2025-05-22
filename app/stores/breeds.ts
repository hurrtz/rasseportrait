import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { type Breed } from "../../types/breed";

interface BreedActions {
  setBreeds: (breeds: Breed[]) => void;
  setBreed: (breed: Breed) => void;
  addBreed: (breed: Breed) => void;
  setSelectedBreed: (id?: Breed["id"]) => void;
}

interface State {
  breeds: Breed[];
  selectedBreed?: Breed["id"];
  actions: BreedActions;
}

const useBreedsStore = create<State>()(
  devtools((set) => ({
    breeds: [],
    actions: {
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

export const useBreeds = () => useBreedsStore((state: State) => state.breeds);
export const useBreed = (id: Breed["id"]) =>
  useBreedsStore((state: State) =>
    state.breeds.filter((breed) => breed.id === id),
  );
export const useSelectedBreedId = () =>
  useBreedsStore((state: State) => state.selectedBreed);
export const useSelectedBreed = () =>
  useBreedsStore(
    (state: State) =>
      state.breeds.filter((breed) => breed.id === state.selectedBreed)[0],
  );
export const useBreedActions = () =>
  useBreedsStore((state: State) => state.actions);
