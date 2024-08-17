import React from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SettingsIcon from "@mui/icons-material/Settings";
import PetsIcon from "@mui/icons-material/Pets";
import type { Settings } from "../../types/settings";

export default ({
  isSettingsModalOpen,
  handleSettingsModalOpen,
  handleSettingsModalClose,
  onChangeArtStyle,
  onChangeSortOrder,
  onChangeShowBreedVariants,
}: {
  isSettingsModalOpen: boolean;
  handleSettingsModalOpen: () => void;
  handleSettingsModalClose: () => void;
  onChangeArtStyle: () => void;
  onChangeSortOrder: (sortOrder: Settings["sortOrder"]) => void;
  onChangeShowBreedVariants: () => void;
}) => (
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
        { icon: <InsertPhotoIcon />, name: "Bildstil", id: "artstyle" },
        {
          icon: <PetsIcon />,
          name: "Rassevarianten anzeigen",
          id: "collapse_variants",
        },
        {
          icon: <FormatListNumberedIcon />,
          name: "Sortierung: FCI-Nummern",
          id: "sort_fci",
        },
        {
          icon: <CalendarMonthIcon />,
          name: "Sortierung: Ausstrahlungsdatum",
          id: "sort_date",
        },
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
              onChangeSortOrder("airDate");
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
