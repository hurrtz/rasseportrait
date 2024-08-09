import React, { useState } from "react";
import Container from "@mui/material/Container";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import PetsIcon from "@mui/icons-material/Pets";
import PageBreedList from "./PageBreedList";
import PageImprint from "./PageImprint";

const App = () => {
  const [bottomNavigationValue, setBottomNavigationValue] =
    useState("breeds_list");

  return (
    <Container>
      {bottomNavigationValue === "breeds_list" && <PageBreedList />}

      {bottomNavigationValue === "imprint" && <PageImprint />}

      <BottomNavigation
        showLabels
        value={bottomNavigationValue}
        onChange={(event, newValue) => {
          setBottomNavigationValue(newValue);
        }}
        sx={{ marginTop: 5 }}
      >
        <BottomNavigationAction
          label="Hunderassen"
          icon={<PetsIcon />}
          value="breeds_list"
        />
        <BottomNavigationAction
          label="Impressum"
          icon={<ContactPhoneIcon />}
          value="imprint"
        />
      </BottomNavigation>
    </Container>
  );
};

export default App;
