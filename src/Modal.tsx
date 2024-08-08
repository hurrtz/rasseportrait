import React, { type Dispatch, type SetStateAction } from "react";
import Modal from "@mui/material/Modal";
import breedsList from "../db";
import { flattenBreedVariants } from "./utils";
import BreedDetails from "./BreedDetails";

interface Props {
  breedId?: number | string;
  setBreed: Dispatch<SetStateAction<number | string | undefined>>;
}

export default ({ breedId, setBreed }: Props) => {
  const handleBackgroundClick = () => {
    setBreed(undefined);
  };

  const breeds = Object.values(breedsList);
  const breedsWithVariants = flattenBreedVariants(breeds);
  const selectedBreed = breedsWithVariants.filter(
    (breed) => breed.id === breedId,
  );

  return (
    <Modal
      open={breedId !== undefined}
      onClose={handleBackgroundClick}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <BreedDetails breed={selectedBreed ? selectedBreed[0] : undefined} />
    </Modal>
  );
};
