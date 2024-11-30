import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { EnrichedBreed, Breed } from "../../types/breed";

interface BreedsState {
  currentBreeds: EnrichedBreed[];
  setCurrentBreeds: (breeds: EnrichedBreed[]) => void;
  breedsWithVariants: EnrichedBreed[];
  setBreedsWithVariants: (breeds: EnrichedBreed[]) => void;
}

const useBreedsStore = create<BreedsState>()(
  devtools(
    (set) => ({
      currentBreeds: [],
      breedsWithVariants: [],
      setCurrentBreeds: (currentBreeds) =>
        set(() => ({ currentBreeds }), undefined, "setBreeds"),
      setBreedsWithVariants: (breedsWithVariants) =>
        set(() => ({ breedsWithVariants }), undefined, "setBreedsWithVariants"),
    }),
    { name: "Rasseportrait: Breeds", store: "Rasseportrait" },
  ),
);

export { useBreedsStore };
