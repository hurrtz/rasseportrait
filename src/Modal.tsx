import React, { type Dispatch, type SetStateAction, useContext } from "react";
import Modal from "@mui/material/Modal";
import BreedDetails from "./BreedDetails";
import { BreedsContext } from "./contexts/Breeds";
import type { BreedIdentifier } from "../types/breed";

interface Props {
  selectedBreed?: {
    id: string | number;
    variantName?: string;
  };
  setSelectedBreed: Dispatch<SetStateAction<BreedIdentifier>>;
}

export default ({ selectedBreed, setSelectedBreed }: Props) => {
  const breeds = useContext(BreedsContext);

  const handleBackgroundClick = () => {
    setSelectedBreed(undefined);
  };

  const foundBreed = breeds.filter((breed) => {
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
      sx={{
        maxHeight: "100vh",
        overflow: "auto",
      }}
    >
      <BreedDetails
        breed={foundBreed ? foundBreed[0] : undefined}
        triggerModalClose={handleBackgroundClick}
      />
    </Modal>
  );
};
