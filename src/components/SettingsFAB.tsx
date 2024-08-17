import React from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SettingsIcon from "@mui/icons-material/Settings";
import PetsIcon from "@mui/icons-material/Pets";
import PetsIconOutlined from "@mui/icons-material/PetsOutlined";
import type { Settings } from "../../types/settings";

interface Props {
  isSettingsModalOpen: boolean;
  handleSettingsModalOpen: () => void;
  handleSettingsModalClose: () => void;
  onChangeArtStyle: () => void;
  onChangeSortOrder: (sortOrder: Settings["sortOrder"]) => void;
  onChangeShowBreedVariants: () => void;
  isArtStyleEnabled: boolean;
  isBreedVariantsEnabled: boolean;
  isSortOrderFCIEnabled: boolean;
  isSortOrderAirDateEnabled: boolean;
  isSortDirectionAsc: boolean;
}

const getFabActionObject = ({
  id,
  isActive,
  isSortDirectionAsc,
}: {
  id: "art_style" | "collapse_variants" | "sort_fci" | "sort_date";
  isActive: boolean;
  isSortDirectionAsc?: boolean;
}) => {
  let out = { id: "", name: "", icon: <></> };
  let sortDirectionCopy = "";

  if ((id === "sort_fci" || id === "sort_date") && isActive) {
    sortDirectionCopy = ` (${isSortDirectionAsc ? "aufsteigend" : "absteigend"})`;
  }

  switch (id) {
    case "art_style":
      out = {
        id,
        name: "alternativer Bildstil",
        icon: <InsertPhotoIcon color={isActive ? "primary" : "action"} />,
      };
      break;

    case "collapse_variants":
      out = {
        id,
        name: "Rassevarianten anzeigen",
        icon: <PetsIcon color={isActive ? "primary" : "action"} />,
      };
      break;

    case "sort_fci":
      out = {
        id,
        name: `Sortierung: FCI-Nummern${sortDirectionCopy}`,
        icon: (
          <FormatListNumberedIcon color={isActive ? "primary" : "action"} />
        ),
      };
      break;

    case "sort_date":
      out = {
        id,
        name: `Sortierung: Ausstrahlungsdatum${sortDirectionCopy}`,
        icon: <CalendarMonthIcon color={isActive ? "primary" : "action"} />,
      };
      break;
  }

  return out;
};

export default ({
  isSettingsModalOpen,
  handleSettingsModalOpen,
  handleSettingsModalClose,
  onChangeArtStyle,
  onChangeSortOrder,
  onChangeShowBreedVariants,
  isArtStyleEnabled,
  isBreedVariantsEnabled,
  isSortOrderFCIEnabled,
  isSortOrderAirDateEnabled,
  isSortDirectionAsc,
}: Props) => (
  <>
    <Backdrop open={isSettingsModalOpen} />
    <SpeedDial
      ariaLabel="Settings speed dial"
      sx={{
        position: "fixed",
        top: 16,
        right: 25,
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
        getFabActionObject({ id: "art_style", isActive: isArtStyleEnabled }),
        getFabActionObject({
          id: "collapse_variants",
          isActive: isBreedVariantsEnabled,
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
            if (action.id === "artstyle") {
              onChangeArtStyle();
            } else if (action.id === "sort_fci") {
              onChangeSortOrder("fci-standard-number");
            } else if (action.id === "sort_date") {
              onChangeSortOrder("air-date");
            } else if (action.id === "collapse_variants") {
              onChangeShowBreedVariants();
            }

            handleSettingsModalClose();
          }}
        />
      ))}
    </SpeedDial>
  </>
);
