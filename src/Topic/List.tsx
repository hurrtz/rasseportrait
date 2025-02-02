import React from "react";
import { useTopicsStore } from "../stores/Topics";
import type { TopicIdentifier } from "../../types/topic";
import TopicCards from "./Cards";

interface Props {
  searchValue?: string;
  setSelectedTopic: (topicIdentifier: TopicIdentifier) => void;
  isMobile?: boolean;
}

const TopicList = ({ setSelectedTopic, isMobile }: Props) => {
  const { currentTopics } = useTopicsStore();

  return (
    <TopicCards
      topics={currentTopics}
      handleCardClick={setSelectedTopic}
      isMobile={isMobile}
    />
  );
};

export default TopicList;
