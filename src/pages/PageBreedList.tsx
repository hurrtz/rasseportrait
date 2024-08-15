import React, { useState, type ChangeEvent } from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SettingsIcon from "@mui/icons-material/Settings";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { BreedIdentifier } from "../../types/breed";
import type { Settings } from "../../types/settings";
import BreedList from "../BreedList";
import Modal from "../Modal";

const settingsActions = [
  { icon: <InsertPhotoIcon />, name: "Bildstil", id: "artstyle" },
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
];

interface Props {
  onChangeArtStyle: () => void;
  onChangeSortOrder: (sortOrder: Settings["sortOrder"]) => void;
}

const HeaderSection = ({
  isDesktop,
  isMobile,
}: {
  isDesktop: boolean;
  isMobile: boolean;
}) => {
  if (isDesktop) {
    return (
      <>
        <Typography variant="h2" gutterBottom>
          Tierisch menschlich
        </Typography>

        <Typography variant="h3" gutterBottom>
          Rasseportrait
        </Typography>
      </>
    );
  }

  if (isMobile) {
    return (
      <>
        <Typography variant="h4" gutterBottom>
          Tierisch menschlich
        </Typography>

        <Typography variant="h5" gutterBottom>
          Rasseportrait
        </Typography>
      </>
    );
  }

  return null;
};

const PageBreedList = ({ onChangeArtStyle, onChangeSortOrder }: Props) => {
  const isPlatformPhone = useMediaQuery("(max-width: 480px");
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
        {settingsActions.map((action) => (
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
              }

              handleSettingsModalClose();
            }}
          />
        ))}
      </SpeedDial>

      <HeaderSection isDesktop={!isPlatformPhone} isMobile={isPlatformPhone} />

      <Box component="form" noValidate autoComplete="off" mt={4} mb={4}>
        <TextField
          label="Suche einer Rasse oder der FCI Standardnummer"
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
