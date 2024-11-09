import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { EnrichedBreed } from "../../types/breed";

interface BreedsState {
  breeds: EnrichedBreed[];
  set: (breeds: EnrichedBreed[]) => void;
}

const useBreedsStore = create<BreedsState>()(
  devtools(
    (set) => ({
      breeds: [],
      set: (breeds) => set(() => ({ breeds }), undefined, "setBreeds"),
    }),
    { name: "Rasseportrait: Breeds", store: "Rasseportrait" },
  ),
);

export { useBreedsStore };
