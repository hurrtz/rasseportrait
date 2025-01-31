import React, { useState } from "react";
import * as amplitude from "@amplitude/analytics-browser";
import useMediaQuery from "@mui/material/useMediaQuery";
import TopicList from "../Topic/List";
import type { TopicIdentifier } from "../../types/topic";
import { getWindowLocationSearch } from "../utils";
import Typography from "@mui/material/Typography";
import Details from "../Details";

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

      <TopicList
        searchValue={searchValue}
        setSelectedTopic={augmentedSetSelectedTopic}
        isMobile={isMobile}
      />
    </>
  );
};

export default PageTopicList;
