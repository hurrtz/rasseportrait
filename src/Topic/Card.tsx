import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import { useSettingsStore } from "../stores/Settings";
import type { EnrichedTopic, TopicIdentifier } from "../../types/topic";
import { getWindowLocationSearch } from "../utils";

interface Props extends EnrichedTopic {
  handleCardClick: (topicIdentifier: TopicIdentifier) => void;
  isMobile?: boolean;
}

export default ({
  id,
  image,
  handleCardClick,
  title,
  podcast,
  isMobile,
}: Props) => {
  const { settings } = useSettingsStore();

  const onClick = () => {
    const payload: TopicIdentifier = { id };

    window.history.replaceState(
      {},
      "",
      `?${getWindowLocationSearch([{ name: "topic", value: String(id) }])}`,
    );
    handleCardClick(payload);
  };

  return (
    <Card onClick={onClick} sx={{ position: "relative" }}>
      <CardActionArea sx={{ opacity: 1, "&:hover": { opacity: 0.75 } }}>
        <CardHeader
          sx={{
            height: 300,
            background: `url(${isMobile ? image.replace(".jpeg", "_thumbnail.jpeg") : image}) no-repeat center center transparent`,
            backgroundSize: "cover",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            zIndex: 1,
            height: "100%",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Box
            sx={{
              padding: "10px 20px",
              borderRadius: "5px",
              margin: "15px 20px",
              width: "100%",
              backgroundColor: "rgba(255, 255, 255, .25)",
              boxShadow: "0 4px 30px rgba(0, 0, 0, .1)",
              backdropFilter: "blur(4px)",
              fontVariant: "small-caps",
              "-webkit-font-smoothing": "antialiased",
              "-moz-osx-font-smoothing": "grayscale",
            }}
          >
            <Typography variant="h6">{title}</Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
};
