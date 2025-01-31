import React from "react";
import Fuse from "fuse.js";
import { useTopicsStore } from "../stores/Topics";
import type { EnrichedTopic, TopicIdentifier } from "../../types/topic";
import TopicCards from "./Cards";

interface Props {
  searchValue?: string;
  setSelectedTopic: (topicIdentifier: TopicIdentifier) => void;
  isMobile?: boolean;
}

const TopicList = ({ searchValue = "", setSelectedTopic, isMobile }: Props) => {
  const { currentTopics } = useTopicsStore();
  const fuseOptions = {
    shouldSort: true,
    ignoreLocation: true,
    threshold: 0.1,
    keys: [
      { name: "title", getFn: ({ title }: EnrichedTopic) => title },
      {
        name: "keywords",
        getFn: ({ keywords }: EnrichedTopic) => keywords?.join("|") || "",
      },
    ],
  };

  const fuse = new Fuse(currentTopics, fuseOptions);

  let results: EnrichedTopic[] = [];

  const filteredTopics = fuse.search(searchValue);

  if (filteredTopics.length > 0) {
    results = filteredTopics.map((filteredTopic) => filteredTopic.item);
  }

  if (!searchValue) {
    results = currentTopics;
  }

  return (
    <TopicCards
      topics={results}
      handleCardClick={setSelectedTopic}
      isMobile={isMobile}
    />
  );
};

export default TopicList;
