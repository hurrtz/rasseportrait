import React, { useContext } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { BreedsContext } from "../contexts/Breeds";
import ProgressBar from "./LinearProgressBar";

const AMOUNT_FCI_BREEDS = 359;

const normaliseValue = (value: number) => (value * 100) / AMOUNT_FCI_BREEDS;

export default () => {
  const breeds = useContext(BreedsContext);
  const amountFCIBreedsPresented = breeds.filter(
    (breed) =>
      breed.fci?.standardNumber &&
      breed.fci.standardNumber > 0 &&
      breed.isOfficiallyPresented !== false,
  ).length;
  const amountNonFCIBreedsPresented = breeds.filter(
    (breed) => breed.fci?.standardNumber === -1,
  ).length;
  const amountFCIBreedsNotPresented = breeds.filter(
    (breed) =>
      breed.fci?.standardNumber &&
      breed.fci.standardNumber > 0 &&
      breed.isOfficiallyPresented === false,
  ).length;
  const normalisedValue = ~~normaliseValue(amountFCIBreedsPresented);

  return (
    <Stack direction="column" mt={4}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography align="left" textTransform="none" fontSize="small">
            Fortschritt Vorstellung FCI-Rasseliste:{" "}
            <Typography fontWeight="bold" component="span">
              {normalisedValue}%
            </Typography>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="column">
            <ProgressBar value={normalisedValue} />
            <List dense>
              <ListItem divider disableGutters>
                <ListItemText
                  primary={
                    <Typography fontSize="small">
                      Anzahl FCI-Rassen:{" "}
                      <Typography fontWeight="bold" component="span">
                        {AMOUNT_FCI_BREEDS}
                      </Typography>
                    </Typography>
                  }
                  secondary="abzüglich gestrichener Rassen, einschließlich
              vorläufiger Rassen"
                />
              </ListItem>
              <ListItem divider disableGutters>
                <ListItemText
                  primary={
                    <Typography fontSize="small">
                      Vorgestellte FCI-Rassen:{" "}
                      <Typography fontWeight="bold" component="span">
                        {amountFCIBreedsPresented}
                      </Typography>
                    </Typography>
                  }
                  secondary="abzüglich Non-FCI-konformer Rassen"
                />
              </ListItem>
              <ListItem divider disableGutters>
                <ListItemText
                  primary={
                    <Typography fontSize="small">
                      Vorgestellte Rassen außerhalb der FCI-Rassenliste:{" "}
                      <Typography fontWeight="bold" component="span">
                        {amountNonFCIBreedsPresented}
                      </Typography>
                    </Typography>
                  }
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText
                  primary={
                    <Typography fontSize="small">
                      Erwähnte FCI-Rassen, die noch nicht offiziell vorgestellt
                      wurden:{" "}
                      <Typography fontWeight="bold" component="span">
                        {amountFCIBreedsNotPresented}
                      </Typography>
                    </Typography>
                  }
                />
              </ListItem>
            </List>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};
