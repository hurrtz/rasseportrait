import { type Dispatch, type SetStateAction } from "react";
import type { BreedIdentifier } from "../../types/breed";

export interface BreedDetailsProps {
  selectedBreed: BreedIdentifier;
  setSelectedBreed: (breedIdentifier: BreedIdentifier) => void;
}
