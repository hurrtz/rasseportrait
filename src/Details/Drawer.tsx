import React, { type KeyboardEvent, type MouseEvent } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { styled } from "@mui/material/styles";
import BreedDetails from "../Breed/Details";
import type { BreedDetailsProps } from "./types";

const Puller = styled("div")(() => ({
  width: 30,
  height: 6,
  backgroundColor: "grey",
  borderRadius: 3,
}));

const PullerBox = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "30px",
  backgroundColor: "#fff",
}));

const Drawer = ({ selectedBreed, setSelectedBreed }: BreedDetailsProps) => {
  const toggleDrawer =
    (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as KeyboardEvent).key === "Tab" ||
          (event as KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setSelectedBreed(open ? selectedBreed : undefined);
    };

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={!!selectedBreed}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
      sx={{
        ".MuiCard-root": {
          borderRadius: 0,
        },
        ".MuiPaper-root": {
          borderRadius: "8px 8px 0 0",
        },
      }}
    >
      <BreedDetails
        breedIdentifier={selectedBreed}
        closeUI={() => setSelectedBreed(undefined)}
      >
        <PullerBox>
          <Puller />
        </PullerBox>
      </BreedDetails>
    </SwipeableDrawer>
  );
};

export default Drawer;
