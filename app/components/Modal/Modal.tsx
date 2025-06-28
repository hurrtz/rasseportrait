import React from "react";
import { Modal as MantineModal, ScrollArea } from "@mantine/core";
import BreedDetails from "../BreedDetails/BreedDetails";
import "./styles.css";

interface Props {
  isOpen: boolean;
  close: () => void;
}

const Modal = ({ isOpen, close }: Props) => (
  <>
    <MantineModal
      opened={isOpen}
      onClose={close}
      scrollAreaComponent={ScrollArea.Autosize}
      classNames={{
        header: "modal-header",
        body: "modal-body",
      }}
    >
      <BreedDetails />
    </MantineModal>
  </>
);

export default Modal;
