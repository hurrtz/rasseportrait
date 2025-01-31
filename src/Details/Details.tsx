import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "./Drawer";
import Modal from "./Modal";
import type { ElementDetailsProps } from "./types";

const Details = ({
  selectedElement,
  setSelectedElement,
  elementType,
}: ElementDetailsProps) => {
  const isMobile = useMediaQuery("(max-width: 480px)");
  const commonProps = { selectedElement, setSelectedElement };

  if (isMobile) {
    return <Drawer {...commonProps} elementType={elementType} />;
  }

  return <Modal {...commonProps} elementType={elementType} />;
};

export default Details;
