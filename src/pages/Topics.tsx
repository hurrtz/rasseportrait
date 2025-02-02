import React, { useState } from "react";
import * as amplitude from "@amplitude/analytics-browser";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import TopicList from "../Topic/List";
import type { TopicIdentifier } from "../../types/topic";
import { getWindowLocationSearch } from "../utils";
import Details from "../Details";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import { styled } from "@mui/material/styles";

const heights = [
  150, 30, 90, 70, 110, 150, 130, 80, 50, 90, 100, 150, 30, 50, 80,
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

interface Props {}

const PageTopicList = ({}: Props) => {
  const isMobile = useMediaQuery("(max-width: 480px)");

  const searchParams = new URLSearchParams(location.search);

  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") || "",
  );

  const [selectedTopic, setSelectedTopic] = useState<TopicIdentifier>(
    searchParams.get("topic")
      ? {
          id: String(searchParams.get("topic")),
        }
      : undefined,
  );

  const augmentedSetSelectedTopic = (topicIdentifier?: TopicIdentifier) => {
    amplitude.track("Topic Details", {
      open: topicIdentifier?.id !== undefined,
      topic: topicIdentifier?.id,
    });
    setSelectedTopic(topicIdentifier);
    window.history.replaceState(
      {},
      "",
      `?${getWindowLocationSearch([
        {
          name: "topic",
          value: topicIdentifier?.id ? String(topicIdentifier.id) : undefined,
        },
      ])}`,
    );
  };

  return (
    <>
      <Details
        elementType="topics"
        selectedElement={selectedTopic}
        setSelectedElement={augmentedSetSelectedTopic}
      />

      <Typography variant={isMobile ? "h4" : "h2"} gutterBottom>
        Themen
      </Typography>

      <Alert severity="info" sx={{ marginBottom: 4 }}>
        <Typography variant="h6">Work in progress</Typography>
        <Typography>
          Seite ist im Aufbau und weitere Inhalte folgen demnächst!
        </Typography>
      </Alert>

      <TopicList
        searchValue={searchValue}
        setSelectedTopic={augmentedSetSelectedTopic}
        isMobile={isMobile}
      />
    </>
  );
};

export default PageTopicList;
