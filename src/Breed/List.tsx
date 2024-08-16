import React, { type Dispatch, type SetStateAction, useContext } from "react";
import Fuse from "fuse.js";
import { BreedsContext } from "../contexts/Breeds";
import type { Breed, EnrichedBreed, BreedIdentifier } from "../../types/breed";
import BreedCards from "./Cards";

interface Props {
  searchValue?: string;
  setSelectedBreed: Dispatch<SetStateAction<BreedIdentifier>>;
}

const BreedList = ({ searchValue = "", setSelectedBreed }: Props) => {
  const breeds = useContext(BreedsContext);
  const fuseOptions = {
    shouldSort: true,
    ignoreLocation: true,
    threshold: 0.1,
    keys: [
      { name: "names", getFn: ({ names }: Breed) => names.join("|") },
      {
        name: "variantNames",
        getFn: ({ variants }: Breed) =>
          variants?.map((variant) => variant.names).join("|") || "",
      },
      {
        name: "standardNumber",
        getFn: ({ fci }: Breed) => String(fci?.standardNumber || ""),
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
