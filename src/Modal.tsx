import React, { type Dispatch, type SetStateAction } from "react";
import Modal from "@mui/material/Modal";
import BreedDetails from "./BreedDetails";
import type { BreedIdentifier } from "../types/breed";

interface Props {
  selectedBreed?: BreedIdentifier;
  setSelectedBreed: Dispatch<SetStateAction<BreedIdentifier>>;
}

export default ({ selectedBreed, setSelectedBreed }: Props) => {
  const handleBackgroundClick = () => {
    setSelectedBreed(undefined);
  };

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
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <BreedDetails
          breedIdentifier={selectedBreed}
          closeUI={handleBackgroundClick}
        />
      </div>
    </Modal>
  );
};
