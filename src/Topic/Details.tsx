import React, { type ReactNode } from "react";
import * as amplitude from "@amplitude/analytics-browser";
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
import Fab from "@mui/material/Fab";
import CloseIcon from "@mui/icons-material/Close";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import type { Podcast } from "../../types/general";
import { TopicIdentifier } from "../../types/topic";
import { useTopicsStore } from "../stores/Topics";

const CardHeaderImage = styled(CardHeader)(({ image }: { image: string }) => ({
  height: 400,
  background: `url(${image}) no-repeat center center transparent`,
  backgroundSize: "cover",
}));

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

  if (!time[0] && !time[1] && time[2]) {
    out.push(`Sekunde ${time[2]}`);
  }

  if (!time[0] && !time[1] && !time[2]) {
    out.push("n.A.");
  }

  return out.join(", ");
};

interface Props {
  topicIdentifier: TopicIdentifier;
  closeUI: () => void;
  children?: ReactNode;
}

export default ({ topicIdentifier, closeUI, children }: Props) => {
  const isMobile = useMediaQuery("(max-width: 480px");
  const { currentTopics } = useTopicsStore();

  const [topic] = currentTopics.filter((topic) => {
    if (topicIdentifier) {
      return String(topicIdentifier.id) === String(topic.id);
    }
  });

  if (topic) {
    const { title, keywords, podcast: podcasts, furtherReading, image } = topic;

    const openPodcast = (url: string) => {
      amplitude.track("Podcast Clicked", {
        topic: topicIdentifier?.id,
        url,
      });
      window.open(url, "_blank");
    };

    const openReadMore = (url: string) => {
      amplitude.track("Additional Breed Info Clicked", {
        topic: topicIdentifier?.id,
        url,
      });
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
          <CardContent sx={{ textAlign: "center" }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                display: "inline-block",
                fontVariant: "small-caps",
                textAlign: "center",
                borderBottom: "0.5px solid #000",
                padding: "0 16px 4px",
                margin: "0 0 4px",
              }}
            >
              {title}
            </Typography>

            <List dense sx={{ paddingBottom: 0 }}>
              {podcasts.map(
                (
                  { number, episode, url, timecode, type = "audio", context },
                  index,
                  array,
                ) => (
                  <ListItem
                    disablePadding
                    key={number}
                    sx={{
                      backgroundColor: "#e3f2fd",
                      marginTop: 1,
                      marginBottom: index === array.length - 1 ? 0 : 1,
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
                        secondary={
                          <div>
                            <span>
                              Folge {number} — {getTimeCopy(timecode)}
                            </span>
                            {context && (
                              <>
                                <br />
                                <span style={{ fontVariant: "small-caps" }}>
                                  {context}
                                </span>
                              </>
                            )}
                          </div>
                        }
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

            {furtherReading && furtherReading.length > 0 && (
              <>
                <Typography
                  gutterBottom
                  variant="body2"
                  component="div"
                  sx={{ marginTop: 2 }}
                >
                  Weitere Infos:
                </Typography>

                <Stack direction="row" justifyContent="space-between">
                  <Stack direction="row" spacing={1}>
                    {(furtherReading || [])
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
                </Stack>
              </>
            )}
          </CardContent>
        </Card>
      </Box>
    );
  }

  return undefined;
};
