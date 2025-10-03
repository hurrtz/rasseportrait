import React from "react";
import { Modal as MantineModal, ScrollArea } from "@mantine/core";
import { useSelectedBreedId, useBreed } from "../../stores/breeds";
import BreedDetails from "../BreedDetails/BreedDetails";
import "./styles.css";

interface Props {
  isOpen: boolean;
  close: () => void;
}

const Modal = ({ isOpen, close }: Props) => {
  const selectedBreedId = useSelectedBreedId();
  const selectedBreed = selectedBreedId ? useBreed(selectedBreedId) : undefined;
  const breedName = selectedBreed?.details.public[0] || "breed";

  return (
    <>
      <MantineModal
        opened={isOpen}
        onClose={close}
        scrollAreaComponent={ScrollArea.Autosize}
        classNames={{
          header: "modal-header",
          body: "modal-body",
        }}
        title={breedName}
        centered
        size="xl"
        trapFocus
        returnFocus
        closeOnEscape
        aria-labelledby="breed-details-title"
        aria-describedby="breed-details-content"
      >
        <BreedDetails />
      </MantineModal>
    </>
  );
};

export default Modal;
