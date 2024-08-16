import React, { type KeyboardEvent, type MouseEvent } from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import BreedDetails from "../Breed/Details";
import type { BreedDetailsProps } from "./types";

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
      }}
    >
      <BreedDetails
        breedIdentifier={selectedBreed}
        closeUI={() => setSelectedBreed(undefined)}
      />
    </SwipeableDrawer>
  );
};

export default Drawer;
