import React, { useState, type ChangeEvent } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import BreedList from "./BreedList";
import Modal from "./Modal";
import type { BreedIdentifier } from "../types/breed";

const PageBreedList = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedBreed, setSelectedBreed] = useState<BreedIdentifier>();

  const handleSearchChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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
