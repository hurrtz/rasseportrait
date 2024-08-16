import React from "react";
import Modal from "@mui/material/Modal";
import BreedDetails from "../Breed/Details";
import type { BreedDetailsProps } from "./types";

export default ({ selectedBreed, setSelectedBreed }: BreedDetailsProps) => {
  const handleBackgroundClick = () => {
    setSelectedBreed(undefined);
  };

  return (
    <Modal
      open={selectedBreed !== undefined}
      onClose={handleBackgroundClick}
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
