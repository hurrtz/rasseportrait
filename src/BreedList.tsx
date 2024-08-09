import React, { type Dispatch, type SetStateAction } from "react";
import Fuse from "fuse.js";
import breedsList from "../db";
import type { Breed, BreedIdentifier } from "../types/breed";
import BreedCards from "./BreedCards";
import { flattenBreedVariants } from "./utils";

const breeds = Object.values(breedsList);
const breedsWithVariants = flattenBreedVariants(breeds);
const sortedBreedsWithVariants = breedsWithVariants.sort(
  ({ fci: fci1 }, { fci: fciB }) => fci1.standardNumber - fciB.standardNumber,
);

// temporary: remove all breeds that are incomplete
const reducedBreeds = sortedBreedsWithVariants.filter((breed) => {
  if (!breed.podcast[0].episode) {
    console.log("no podcast name", breed);
    return undefined;
  }

  if (!breed.podcast[0].url) {
    console.log("no podcast url", breed);
    return undefined;
  }

  if (!breed.podcast[0].timecode) {
    console.log("no podcast timecode", breed);
    return undefined;
  }

  return breed.podcast[0].timecode > 0;
});

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

const fuse = new Fuse(reducedBreeds, fuseOptions);

interface Props {
  searchValue?: string;
  setSelectedBreed: Dispatch<SetStateAction<BreedIdentifier>>;
}

const BreedList = ({ searchValue = "", setSelectedBreed }: Props) => {
  let results = reducedBreeds;

  const filteredBreeds = fuse.search(searchValue);

  if (filteredBreeds.length > 0) {
    results = filteredBreeds.map((filteredBreed) => filteredBreed.item);
  }

  return <BreedCards breeds={results} handleCardClick={setSelectedBreed} />;
};

export default BreedList;
