import React, { useState, type ChangeEvent } from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import SortIcon from "@mui/icons-material/Sort";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SettingsIcon from "@mui/icons-material/Settings";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { BreedIdentifier } from "../types/breed";
import BreedList from "./BreedList";
import Modal from "./Modal";

const settingsActions = [
  { icon: <InsertPhotoIcon />, name: "Bildstil" },
  { icon: <SortIcon />, name: "Sortierung" },
];

interface Props {
  onChangeArtStyle: () => void;
  onChangeSortOrder: () => void;
}

const PageBreedList = ({ onChangeArtStyle, onChangeSortOrder }: Props) => {
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
      <Modal
        selectedBreed={selectedBreed}
        setSelectedBreed={setSelectedBreed}
      />

      <Backdrop open={isSettingsModalOpen} />
      <SpeedDial
        ariaLabel="Settings speed dial"
        sx={{
          position: "absolute",
          top: 25,
          right: 25,
          ".MuiSpeedDial-fab": {
            backgroundColor: "#666",
          },
        }}
        icon={<SettingsIcon />}
        onClose={handleSettingsModalClose}
        onOpen={handleSettingsModalOpen}
        open={isSettingsModalOpen}
        direction="down"
      >
        {settingsActions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => {
              if (action.name === "Bildstil") {
                onChangeArtStyle();
              } else if (action.name === "Sortierung") {
                onChangeSortOrder();
              }

              handleSettingsModalClose();
            }}
          />
        ))}
      </SpeedDial>

      <Typography variant="h2" gutterBottom>
        Tierisch menschlich
      </Typography>

      <Typography variant="h3" gutterBottom>
        Rasseportrait
      </Typography>

      <Typography variant="body1" gutterBottom>
        Du wolltest noch einmal ein Rasseportrait anhören? Oder du wolltest
        wissen, ob eine Rasse überhaupt schon einmal besprochen wurde? Suche
        hier deine Rasse und finde die zugehörige Podcast-Episode!
      </Typography>

      <Box component="form" noValidate autoComplete="off" mt={4} mb={4}>
        <TextField
          label="Suche nach deinem Hund oder der FCI Standardnummer"
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
