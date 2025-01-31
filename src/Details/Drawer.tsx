import React, {
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { styled } from "@mui/material/styles";
import BreedDetails from "../Breed/Details";
import TopicDetails from "../Topic/Details";
import type { ElementDetailsProps } from "./types";

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

const Drawer = ({
  selectedElement,
  setSelectedElement,
  elementType,
}: ElementDetailsProps) => {
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

      setSelectedElement(open ? selectedElement : undefined);
    };

  const ElementDetails = ({ children }: { children: ReactNode }) => {
    if (elementType === "topics") {
      return (
        <TopicDetails
          topicIdentifier={selectedElement}
          closeUI={() => setSelectedElement(undefined)}
        >
          {children}
        </TopicDetails>
      );
    }

    return (
      <BreedDetails
        breedIdentifier={selectedElement}
        closeUI={() => setSelectedElement(undefined)}
      >
        {children}
      </BreedDetails>
    );
  };

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={!!selectedElement}
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
      <ElementDetails>
        <PullerBox>
          <Puller />
        </PullerBox>
      </ElementDetails>
    </SwipeableDrawer>
  );
};

export default Drawer;
