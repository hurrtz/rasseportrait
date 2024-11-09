import React from "react";
import Fuse from "fuse.js";
import { useBreedsStore } from "../stores/Breeds";
import type { EnrichedBreed, BreedIdentifier } from "../../types/breed";
import BreedCards from "./Cards";

interface Props {
  searchValue?: string;
  setSelectedBreed: (breedIdentifier: BreedIdentifier) => void;
}

const BreedList = ({ searchValue = "", setSelectedBreed }: Props) => {
  const { breeds } = useBreedsStore();
  const fuseOptions = {
    shouldSort: true,
    ignoreLocation: true,
    threshold: 0.1,
    keys: [
      { name: "names", getFn: ({ names }: EnrichedBreed) => names.join("|") },
      {
        name: "variantNames",
        getFn: ({ variants }: EnrichedBreed) =>
          variants?.map((variant) => variant.names).join("|") || "",
      },
      {
        name: "standardNumber",
        getFn: ({ fci }: EnrichedBreed) => String(fci?.standardNumber || ""),
      },
    ],
  };

  const fuse = new Fuse(breeds, fuseOptions);

  let results: EnrichedBreed[] = [];

  const filteredBreeds = fuse.search(searchValue);

  if (filteredBreeds.length > 0) {
    results = filteredBreeds.map((filteredBreed) => filteredBreed.item);
  }

  if (!searchValue) {
    results = breeds;
  }

  return <BreedCards breeds={results} handleCardClick={setSelectedBreed} />;
};

export default BreedList;
