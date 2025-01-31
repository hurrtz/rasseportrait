import React, { type ReactNode } from "react";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import Typography from "@mui/material/Typography";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SettingsIcon from "@mui/icons-material/Settings";
import AbcIcon from "@mui/icons-material/Abc";
import PetsIcon from "@mui/icons-material/Pets";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { Settings } from "../../types/settings";

interface Props {
  isSettingsModalOpen: boolean;
  handleSettingsModalOpen: () => void;
  handleSettingsModalClose: () => void;
  onChangeSortOrder: (sortOrder: Settings["sortOrder"]) => void;
  onChangeCollapseSimilarBreeds: () => void;
  collapseSimilarBreeds: boolean;
  isSortOrderFCIEnabled: boolean;
  isSortOrderAirDateEnabled: boolean;
  isSortDirectionAsc: boolean;
  isSortOrderAlphabeticalEnabled: boolean;
}

const getFabActionObject = ({
  id,
  isActive,
  isSortDirectionAsc,
}: {
  id:
    | "collapse_similar_breeds"
    | "sort_fci"
    | "sort_date"
    | "sort_alphabetical";
  isActive: boolean;
  isSortDirectionAsc?: boolean;
}) => {
  let out = { id: "", name: "", icon: <></> } as {
    id: string;
    name: ReactNode;
    icon: ReactNode;
  };
  let sortDirectionCopy = "";

  if (
    (id === "sort_fci" || id === "sort_date" || id === "sort_alphabetical") &&
    isActive
  ) {
    sortDirectionCopy = ` (${isSortDirectionAsc ? "aufsteigend" : "absteigend"})`;
  }

  switch (id) {
    case "collapse_similar_breeds":
      out = {
        id,
        name: (
          <Typography color={isActive ? "primary" : "action"}>
            {"ähnliche Rassen zusammenfassen"}
          </Typography>
        ),
        icon: <PetsIcon color={isActive ? "primary" : "action"} />,
      };
      break;

    case "sort_fci":
      out = {
        id,
        name: (
          <Typography
            color={isActive ? "primary" : "action"}
          >{`Sortierung: FCI-Nummern${sortDirectionCopy}`}</Typography>
        ),
        icon: (
          <FormatListNumberedIcon color={isActive ? "primary" : "action"} />
        ),
      };
      break;

    case "sort_date":
      out = {
        id,
        name: (
          <Typography
            color={isActive ? "primary" : "action"}
          >{`Sortierung: Ausstrahlungsdatum${sortDirectionCopy}`}</Typography>
        ),
        icon: <CalendarMonthIcon color={isActive ? "primary" : "action"} />,
      };
      break;

    case "sort_alphabetical":
      out = {
        id,
        name: (
          <Typography
            color={isActive ? "primary" : "action"}
          >{`Sortierung: Alphabetisch${sortDirectionCopy}`}</Typography>
        ),
        icon: <AbcIcon color={isActive ? "primary" : "action"} />,
      };
      break;
  }

  return out;
};

export default ({
  isSettingsModalOpen,
  handleSettingsModalOpen,
  handleSettingsModalClose,
  onChangeSortOrder,
  onChangeCollapseSimilarBreeds,
  collapseSimilarBreeds,
  isSortOrderFCIEnabled,
  isSortOrderAirDateEnabled,
  isSortOrderAlphabeticalEnabled,
  isSortDirectionAsc,
}: Props) => {
  const isMobile = useMediaQuery("(max-width: 480px)");

  return (
    <>
      <Backdrop open={isSettingsModalOpen} />
      <SpeedDial
        ariaLabel="Settings speed dial"
        sx={{
          position: isMobile ? "absolute" : "fixed",
          top: isMobile ? 89 : 16, // 16 from bottom of navigation bar
          right: 16,
          ".MuiSpeedDial-fab": {
            backgroundColor: "#666",
          },
          ".MuiSpeedDial-actions": {
            whiteSpace: "nowrap",
          },
        }}
        icon={<SettingsIcon />}
        onClose={handleSettingsModalClose}
        onOpen={handleSettingsModalOpen}
        open={isSettingsModalOpen}
        direction="down"
      >
        {[
          getFabActionObject({
            id: "collapse_similar_breeds",
            isActive: collapseSimilarBreeds,
          }),
          getFabActionObject({
            id: "sort_alphabetical",
            isActive: isSortOrderAlphabeticalEnabled,
            isSortDirectionAsc,
          }),
          getFabActionObject({
            id: "sort_fci",
            isActive: isSortOrderFCIEnabled,
            isSortDirectionAsc,
          }),
          getFabActionObject({
            id: "sort_date",
            isActive: isSortOrderAirDateEnabled,
            isSortDirectionAsc,
          }),
        ].map((action) => (
          <SpeedDialAction
            key={action.id}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => {
              if (action.id === "sort_fci") {
                onChangeSortOrder("fci-standard-number");
              } else if (action.id === "sort_date") {
                onChangeSortOrder("air-date");
              } else if (action.id === "sort_alphabetical") {
                onChangeSortOrder("alphabetical");
              } else if (action.id === "collapse_similar_breeds") {
                onChangeCollapseSimilarBreeds();
              }

              handleSettingsModalClose();
            }}
          />
        ))}
      </SpeedDial>
    </>
  );
};
