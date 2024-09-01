import React, { useState, useContext, type ReactNode } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import useMediaQuery from "@mui/material/useMediaQuery";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { BreedsContext } from "../contexts/Breeds";
import { SettingsContext } from "../contexts/Settings";
import type { FCI, Podcast, BreedIdentifier } from "../../types/breed";

const CardHeaderImage = styled(CardHeader)(({ image }: { image: string }) => ({
  height: 400,
  background: `url(${image}) no-repeat center center transparent`,
  backgroundSize: "cover",
}));

const FCIText = ({ fci: { standardNumber, group, section } }: { fci: FCI }) => {
  if (standardNumber > 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        FCI: Standardnummer {standardNumber} (Gruppe {group}, Sektion {section})
      </Typography>
    );
  }

  return (
    <Typography variant="body2" color="text.secondary">
      —keine FCI-anerkannte Rasse—
    </Typography>
  );
};

const getTime = (timecode: Podcast["timecode"]) => {
  const hours = Math.floor(timecode / 3600);
  const minutes = Math.floor((timecode % 3600) / 60);
  const seconds = timecode % 60;

  return [hours, minutes, seconds];
};

const getTimeCopy = (timecode: Podcast["timecode"]) => {
  const time = getTime(timecode);
  const out = [];

  if (time[0]) {
    out.push(`Stunde ${time[0]}`);
  }

  if (time[1]) {
    out.push(`Minute ${time[1]}`);
  }

  if (time[2]) {
    out.push(`Sekunde ${time[2]}`);
  }

  return out.join(", ");
};

interface Props {
  breedIdentifier: BreedIdentifier;
  closeUI: () => void;
  children?: ReactNode;
}

export default ({ breedIdentifier, closeUI, children }: Props) => {
  const isMobile = useMediaQuery("(max-width: 480px");
  const breeds = useContext(BreedsContext);
  const settings = useContext(SettingsContext);

  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const handleTooltipClose = () => {
    setIsTooltipOpen(false);
  };

  const handleTooltipOpen = () => {
    setIsTooltipOpen(true);
  };

  const [breed] = breeds.filter((breed) => {
    if (breedIdentifier) {
      if (breedIdentifier.variantName && breed.variants) {
        return (
          breedIdentifier.variantName === breed.variants[0].names[0] &&
          breedIdentifier.id === breed.id
        );
      }
    }

    return breedIdentifier?.id === breed.id;
  });

  if (breed) {
    const {
      names,
      variants,
      fci,
      podcast: podcasts,
      furtherReading: mainFurtherReadings,
      image,
      recognitions = [],
    } = breed;

    const furtherReadings = [
      ...mainFurtherReadings,
      ...(variants ? variants[0].furtherReading || [] : []),
    ];

    const openPodcast = (url: string) => {
      window.open(url, "_blank");
    };

    const openReadMore = (url: string) => {
      window.open(url, "_blank");
    };

    return (
      <Box>
        <Card
          sx={{
            maxHeight: "100vh",
            overflow: "auto",
            width: isMobile ? "100%" : 400,
            maxWidth: "100vw",
          }}
        >
          {children}
          {isMobile === false && (
            <Fab
              aria-label="add"
              size="medium"
              sx={{
                position: "absolute",
                top: "10px",
                right: "10px",
              }}
              onClick={closeUI}
            >
              <CloseIcon />
            </Fab>
          )}
          <CardHeaderImage image={image} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {names[0]}
            </Typography>
            {settings.showBreedVariants === true &&
              variants &&
              variants.length > 0 && (
                <Typography gutterBottom variant="h6" component="div">
                  {variants[0].names[0]}
                </Typography>
              )}

            <FCIText fci={fci} />

            <List dense>
              {podcasts.map(
                ({ number, episode, url, timecode, type = "audio" }) => (
                  <ListItem
                    disablePadding
                    key={number}
                    sx={{
                      backgroundColor: "#e3f2fd",
                      marginTop: 1,
                      marginBottom: 1,
                      borderRadius: 2,
                    }}
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        {type === "audio" && <PodcastsIcon />}
                        {type === "video" && <OndemandVideoIcon />}
                      </ListItemIcon>
                      <ListItemText
                        key={episode}
                        primary={episode}
                        secondary={`Folge ${number} — ${getTimeCopy(timecode)}`}
                        primaryTypographyProps={{
                          sx: {
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            width: "100%",
                          },
                        }}
                        onClick={() => openPodcast(url)}
                        title={url}
                      />
                    </ListItemButton>
                  </ListItem>
                ),
              )}
            </List>

            <Typography gutterBottom variant="body2" component="div">
              Weitere Infos:
            </Typography>

            <Stack direction="row" justifyContent="space-between">
              <Stack direction="row" spacing={1}>
                {furtherReadings
                  .filter(({ url }) => url)
                  .map(({ url, name }) => (
                    <Chip
                      key={url}
                      label={name}
                      variant="outlined"
                      size="small"
                      onClick={() => openReadMore(url)}
                      title={url}
                    />
                  ))}
              </Stack>

              <Stack
                direction="row"
                spacing={1}
                sx={{
                  [".MuiButtonBase-root"]: {
                    marginTop: "-8px",
                    marginRight: "-8px",
                  },
                }}
              >
                {recognitions.map((recognition) => (
                  <ClickAwayListener onClickAway={handleTooltipClose}>
                    <Tooltip
                      title={recognition}
                      disableInteractive
                      PopperProps={{
                        disablePortal: true,
                      }}
                      onClose={handleTooltipClose}
                      open={isTooltipOpen}
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                    >
                      <IconButton onClick={handleTooltipOpen}>
                        <FavoriteIcon
                          sx={{
                            color: "rgba(255, 0, 0, 0.75)",
                            transform: "rotate(28deg)",
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                  </ClickAwayListener>
                ))}
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return undefined;
};
