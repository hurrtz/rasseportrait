import React from "react";
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
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import type { Breed, FCI, Podcast } from "../types/breed";
import { getImageFromBreed } from "./utils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  boxShadow: 24,
  borderRadius: 5,
};

const CardHeaderImage = styled(CardHeader)(({ image }: { image: string }) => ({
  height: 400,
  background: `url(${image}) no-repeat center center transparent`,
  backgroundSize: "cover",
}));

const FCIText = ({ fci }: { fci: FCI }) => {
  if (fci && fci.standardNumber > 0) {
    return (
      <Typography variant="body2" color="text.secondary">
        FCI: Gruppe {fci.group}, Sektion: {fci.section}, Standardnummer:{" "}
        {fci.standardNumber}
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
  breed?: Breed;
}

export default ({ breed }: Props) => {
  if (breed) {
    const {
      names,
      variants,
      fci,
      podcast: podcasts,
      furtherReading: furtherReadings,
    } = breed;

    const openPodcast = (url: string) => {
      window.open(url, "_blank");
    };

    const openReadMore = (url: string) => {
      window.open(url, "_blank");
    };

    return (
      <Box sx={style}>
        <Card>
          <CardHeaderImage image={getImageFromBreed(breed)} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {names[0]}
            </Typography>
            {variants && variants.length > 0 && (
              <Typography gutterBottom variant="h6" component="div">
                {variants[0].names[0]}
              </Typography>
            )}

            <FCIText fci={fci} />

            <List dense>
              {podcasts.map(({ episode, url, timecode, type = "audio" }) => (
                <ListItem
                  disablePadding
                  key={episode}
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
                      secondary={getTimeCopy(timecode)}
                      primaryTypographyProps={{
                        sx: {
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          width: "100%",
                        },
                      }}
                      onClick={() => openPodcast(url)}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

            <Typography gutterBottom variant="body2" component="div">
              Weitere Infos:
            </Typography>

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
                  />
                ))}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return undefined;
};
