import React, {
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type MouseEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
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
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import useMediaQuery from "@mui/material/useMediaQuery";
import BreedList from "../BreedList";
import BreedDetails from "../BreedDetails";
import Modal from "../Modal";
import type { BreedIdentifier } from "../../types/breed";
import type { Settings } from "../../types/settings";

interface Props {
  onChangeArtStyle: () => void;
  onChangeSortOrder: (sortOrder: Settings["sortOrder"]) => void;
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

const BreedDetailInformationUI = ({
  isMobile,
  selectedBreed,
  setSelectedBreed,
}: {
  isMobile: boolean;
  selectedBreed: BreedIdentifier;
  setSelectedBreed: Dispatch<SetStateAction<BreedIdentifier>>;
}) => {
  if (isMobile) {
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
          ".MuiSwipeableDrawer-paper": {
            borderRadius: "8px 8px 0 0",
          },
        }}
      >
        <BreedDetails
          breedIdentifier={selectedBreed}
          closeUI={() => setSelectedBreed(undefined)}
        />
      </SwipeableDrawer>
    );
  }

  return (
    <Modal selectedBreed={selectedBreed} setSelectedBreed={setSelectedBreed} />
  );
};

const SettingsUI = ({
  isSettingsModalOpen,
  handleSettingsModalOpen,
  handleSettingsModalClose,
  onChangeArtStyle,
  onChangeSortOrder,
}: {
  isSettingsModalOpen: boolean;
  handleSettingsModalOpen: () => void;
  handleSettingsModalClose: () => void;
  onChangeArtStyle: () => void;
  onChangeSortOrder: (sortOrder: Settings["sortOrder"]) => void;
}) => (
  <>
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
      {[
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
            }

            handleSettingsModalClose();
          }}
        />
      ))}
    </SpeedDial>
  </>
);

const PageBreedList = ({ onChangeArtStyle, onChangeSortOrder }: Props) => {
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
      <BreedDetailInformationUI
        isMobile={isMobile}
        selectedBreed={selectedBreed}
        setSelectedBreed={setSelectedBreed}
      />

      <SettingsUI
        isSettingsModalOpen={isSettingsModalOpen}
        handleSettingsModalOpen={handleSettingsModalOpen}
        handleSettingsModalClose={handleSettingsModalClose}
        onChangeArtStyle={onChangeArtStyle}
        onChangeSortOrder={onChangeSortOrder}
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