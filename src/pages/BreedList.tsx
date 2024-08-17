import React, { useState, type ChangeEvent } from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SettingsIcon from "@mui/icons-material/Settings";
import PetsIcon from "@mui/icons-material/Pets";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import BreedList from "../Breed/List";
import Details from "../Details";
import type { BreedIdentifier } from "../../types/breed";
import type { Settings } from "../../types/settings";

interface Props {
  onChangeArtStyle: () => void;
  onChangeSortOrder: (sortOrder: Settings["sortOrder"]) => void;
  onChangeShowBreedVariants: () => void;
}

const HeaderSection = ({ isMobile }: { isMobile: boolean }) => (
  <>
    <Typography variant={isMobile ? "h4" : "h2"} gutterBottom>
      Tierisch menschlich
    </Typography>

    <Typography variant={isMobile ? "h5" : "h3"} gutterBottom>
      Rasseportrait
    </Typography>
  </>
);

const SettingsUI = ({
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
} & Props) => (
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

const PageBreedList = ({
  onChangeArtStyle,
  onChangeSortOrder,
  onChangeShowBreedVariants,
}: Props) => {
  const isMobile = useMediaQuery("(max-width: 480px");
  const [searchValue, setSearchValue] = useState("");
  const [selectedBreed, setSelectedBreed] = useState<BreedIdentifier>();

  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const handleSettingsModalOpen = () => setIsSettingsModalOpen(true);
  const handleSettingsModalClose = () => setIsSettingsModalOpen(false);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event && event.target) {
      setSearchValue(event.target.value);
    }
  };

  return (
    <>
      <Details
        selectedBreed={selectedBreed}
        setSelectedBreed={setSelectedBreed}
      />

      <SettingsUI
        isSettingsModalOpen={isSettingsModalOpen}
        handleSettingsModalOpen={handleSettingsModalOpen}
        handleSettingsModalClose={handleSettingsModalClose}
        onChangeArtStyle={onChangeArtStyle}
        onChangeSortOrder={onChangeSortOrder}
        onChangeShowBreedVariants={onChangeShowBreedVariants}
      />

      <HeaderSection isMobile={isMobile} />

      <Box component="form" noValidate autoComplete="off" mt={4} mb={4}>
        <TextField
          label="Suche nach einer Rasse oder der FCI Standardnummer"
          variant="outlined"
          fullWidth
          onChange={handleSearchChange}
        />
      </Box>

      <BreedList
        searchValue={searchValue}
        setSelectedBreed={setSelectedBreed}
      />
    </>
  );
};

export default PageBreedList;
