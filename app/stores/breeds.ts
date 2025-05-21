import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { type Breed } from "../../types/breed";

interface BreedActions {
  setBreeds: (breeds: Breed[]) => void;
  setBreed: (breed: Breed) => void;
  addBreed: (breed: Breed) => void;
}

interface State {
  breeds: Breed[];
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
    },
  })),
);

export const useBreeds = () => useBreedsStore((state: State) => state.breeds);
export const useBreed = (id: Breed["id"]) =>
  useBreedsStore((state: State) =>
    state.breeds.filter((breed) => breed.id === id),
  );
export const useBreedActions = () =>
  useBreedsStore((state: State) => state.actions);
