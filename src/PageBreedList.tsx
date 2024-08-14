import React, { useState, useContext, type ChangeEvent } from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { BreedIdentifier } from "../types/breed";
import { SettingsContext } from "./contexts/Settings";
import BreedList from "./BreedList";
import Modal from "./Modal";

interface Props {
  onChangeArtStyle: () => void;
}

const PageBreedList = ({ onChangeArtStyle }: Props) => {
  const { artStyle } = useContext(SettingsContext);
  const [searchValue, setSearchValue] = useState("");
  const [selectedBreed, setSelectedBreed] = useState<BreedIdentifier>();
  const isArtStyleRealistic = artStyle === "realistic";

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

      <Box display="flex" justifyContent="flex-end" mt={2}>
        <FormControl component="fieldset">
          <FormGroup aria-label="position" row>
            <FormControlLabel
              control={<Switch color="primary" />}
              label={`Bildstil: ${isArtStyleRealistic ? "Realistisch" : "Künstlerisch"}`}
              labelPlacement="end"
              checked={!isArtStyleRealistic}
              onChange={onChangeArtStyle}
            />
          </FormGroup>
        </FormControl>
      </Box>

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
