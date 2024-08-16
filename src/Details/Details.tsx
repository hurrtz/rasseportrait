import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "./Drawer";
import Modal from "./Modal";
import type { BreedDetailsProps } from "./types";

const Details = ({ selectedBreed, setSelectedBreed }: BreedDetailsProps) => {
  const isMobile = useMediaQuery("(max-width: 480px)");
  const commonProps = { selectedBreed, setSelectedBreed };

  if (isMobile) {
    return <Drawer {...commonProps} />;
  }

  return <Modal {...commonProps} />;
};

export default Details;
