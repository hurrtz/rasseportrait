import React from "react";
import * as amplitude from "@amplitude/analytics-browser";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useBreedsStore } from "../stores/Breeds";
import ProgressBar from "./LinearProgressBar";

const AMOUNT_FCI_BREEDS_ALL = 374;
const AMOUNT_FCI_BREEDS_DELETED = 14;
const AMOUNT_FCI_BREEDS_PROVISIONAL = 15;

const getPercentValue = (value: number, max: number) => (value * 100) / max;

const PointingFingerIcon = ({ isHighlight }: { isHighlight?: boolean }) => (
  <div
    style={{
      fontSize: "32px",
      color: isHighlight ? "rgb(102, 187, 106)" : "#000",
    }}
  >
    {"☞"}
  </div>
);

export default () => {
  const { breedsWithVariants: breeds } = useBreedsStore();
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
  const stringifiedListOfBreedsOutsideFCIList = breeds
    .filter((breed) => breed.fci?.standardNumber === -1)
    .map((breed) => breed.names[0])
    .join(", ");
  const stringifiedListOfBreedsThatAreNotYetOfficiallyPresented = breeds
    .filter(
      (breed) =>
        breed.fci?.standardNumber &&
        breed.fci.standardNumber > 0 &&
        breed.isOfficiallyPresented === false,
    )
    .map((breed) => breed.names[0])
    .join(", ");
  const amountBreedsCorrectlyGuessed = breeds.filter(
    (breed) => breed.wasGuessedCorrectlyInPodcast === true,
  ).length;
  const amountBreedsGuessNotNeeded = breeds.filter(
    (breed) => breed.wasGuessedCorrectlyInPodcast === "not_applicable",
  ).length;
  const percentAmountPresentedFCIBreeds = ~~getPercentValue(
    amountFCIBreedsPresented,
    AMOUNT_FCI_BREEDS_ALL - AMOUNT_FCI_BREEDS_DELETED,
  );

  return (
    <Stack direction="column" mt={4}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          onClick={() => {
            amplitude.track("Statistics toggled");
          }}
        >
          <Typography align="left" textTransform="none" fontSize="small">
            Fortschritt Vorstellung FCI-Rasseliste:{" "}
            <Typography fontWeight="bold" component="span">
              {percentAmountPresentedFCIBreeds}%
            </Typography>
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ paddingTop: 0, paddingBottom: 0 }}>
          <Stack direction="column">
            <ProgressBar value={percentAmountPresentedFCIBreeds} />
            <List dense disablePadding>
              <ListItem divider disableGutters>
                <ListItemIcon>
                  <PointingFingerIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography fontSize="small">
                      Anzahl FCI-Rassen:{" "}
                      <Typography fontWeight="bold" component="span">
                        {AMOUNT_FCI_BREEDS_ALL - AMOUNT_FCI_BREEDS_DELETED}
                      </Typography>
                    </Typography>
                  }
                  secondary={`insgesamt ${AMOUNT_FCI_BREEDS_ALL} Rassen (abzüglich ${AMOUNT_FCI_BREEDS_DELETED} gestrichener Rassen, einschließlich
              ${AMOUNT_FCI_BREEDS_PROVISIONAL} vorläufiger Rassen)`}
                />
              </ListItem>
              <ListItem divider disableGutters>
                <ListItemIcon>
                  <PointingFingerIcon />
                </ListItemIcon>
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
                <ListItemIcon>
                  <PointingFingerIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography fontSize="small">
                      Vorgestellte Rassen außerhalb der FCI-Rassenliste:{" "}
                      <Typography fontWeight="bold" component="span">
                        {amountNonFCIBreedsPresented}
                      </Typography>
                    </Typography>
                  }
                  secondary={stringifiedListOfBreedsOutsideFCIList}
                />
              </ListItem>
              <ListItem divider disableGutters>
                <ListItemIcon>
                  <PointingFingerIcon />
                </ListItemIcon>
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
                  secondary={
                    stringifiedListOfBreedsThatAreNotYetOfficiallyPresented
                  }
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon>
                  <PointingFingerIcon isHighlight />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography fontSize="small">
                      Erfolgsquote von Martin beim Raten der Rassen:{" "}
                      <Typography fontWeight="bold" component="span">
                        {getPercentValue(
                          amountBreedsCorrectlyGuessed,
                          breeds.length - amountBreedsGuessNotNeeded,
                        ).toFixed(2)}
                        {`%`}
                      </Typography>
                    </Typography>
                  }
                  secondary={`${amountBreedsCorrectlyGuessed} von ${breeds.length} vorgestellten Rassen korrekt geraten (abzüglich ${amountBreedsGuessNotNeeded} Rassen, die nicht geraten werden mussten und dem Spanischen Wasserhund)`}
                />
              </ListItem>
            </List>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
};