import React from "react";
import Modal from "@mui/material/Modal";
import BreedDetails from "../Breed/Details";
import TopicDetails from "../Topic/Details";
import type { ElementDetailsProps } from "./types";

export default ({
  selectedElement,
  setSelectedElement,
  elementType,
}: ElementDetailsProps) => {
  const handleBackgroundClick = () => {
    setSelectedElement(undefined);
  };

  const Details = () => {
    if (elementType === "topics") {
      return (
        <TopicDetails
          topicIdentifier={selectedElement}
          closeUI={handleBackgroundClick}
        />
      );
    }

    return (
      <BreedDetails
        breedIdentifier={selectedElement}
        closeUI={handleBackgroundClick}
      />
    );
  };

  return (
    <Modal
      open={selectedElement !== undefined}
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
        <Details />
      </div>
    </Modal>
  );
};
