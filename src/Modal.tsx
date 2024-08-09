import React, { type Dispatch, type SetStateAction } from "react";
import Modal from "@mui/material/Modal";
import breedsList from "../db";
import { flattenBreedVariants } from "./utils";
import BreedDetails from "./BreedDetails";
import type { BreedIdentifier } from "../types/breed";

interface Props {
  selectedBreed?: {
    id: string | number;
    variantName?: string;
  };
  setSelectedBreed: Dispatch<SetStateAction<BreedIdentifier>>;
}

export default ({ selectedBreed, setSelectedBreed }: Props) => {
  const handleBackgroundClick = () => {
    setSelectedBreed(undefined);
  };

  const breeds = Object.values(breedsList);
  const breedsWithVariants = flattenBreedVariants(breeds);
  const foundBreed = breedsWithVariants.filter((breed) => {
    if (selectedBreed) {
      if (selectedBreed.variantName && breed.variants) {
        return (
          selectedBreed.variantName === breed.variants[0].names[0] &&
          selectedBreed.id === breed.id
        );
      }
    }

    return selectedBreed?.id === breed.id;
  });

  return (
    <Modal
      open={selectedBreed !== undefined}
      onClose={handleBackgroundClick}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>
        <BreedDetails breed={foundBreed ? foundBreed[0] : undefined} />
      </>
    </Modal>
  );
};
