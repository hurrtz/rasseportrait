import React from "react";
import type { EnrichedTopic, TopicIdentifier } from "../../types/topic";
import TopicCard from "./Card";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

interface Props {
  topics: EnrichedTopic[];
  handleCardClick: (topicIdentifier: TopicIdentifier) => void;
  isMobile?: boolean;
}

const Topics = ({ topics, handleCardClick, isMobile }: Props) => {
  if (topics.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" align="center">
            Keine Themen gefunden
          </Typography>

          <Typography variant="body2" align="center" mt={1}>
            bitte versuche einen anderen Suchbegriff
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Grid container spacing={2}>
      {topics.map((topic) => (
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          xl={3}
          key={`${topic.id}-${topic.title}`}
        >
          <TopicCard
            {...topic}
            image={topic.image}
            handleCardClick={handleCardClick}
            isMobile={isMobile}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Topics;
