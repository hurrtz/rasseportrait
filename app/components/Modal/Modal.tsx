import React, { type ReactNode } from "react";
import { Modal as MantineModal } from "@mantine/core";

interface Props {
  children: ReactNode;
  title: string;
  isOpen: boolean;
  close: () => void;
}

const Modal = ({ children, title, isOpen, close }: Props) => (
  <>
    <MantineModal opened={isOpen} onClose={close} title={title}>
      {children}
    </MantineModal>
  </>
);

export default Modal;
