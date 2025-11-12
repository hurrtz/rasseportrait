import { useEffect, useCallback, useMemo } from "react";
import {
  Container,
  Title,
  Grid,
  Stack,
  Alert,
  Box,
  Paper,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconAlertCircle } from "@tabler/icons-react";
import { useSearchParams } from "react-router";
import {
  useKnowledgeTopics,
  useSelectedTopicId,
  useKnowledgeActions,
  useKnowledgeLoading,
  useKnowledgeError,
  useKnowledgeInitialized,
} from "~/stores/knowledge";
import { KnowledgeContent } from "~/components/KnowledgeContent";
import LoadingSpinner from "~/components/LoadingSpinner";
import { useAmplitude } from "~/hooks/useAmplitude";
import { logger } from "~/utils/logger";

const Hundewissen = () => {
  const topics = useKnowledgeTopics();
  const selectedTopicId = useSelectedTopicId();
  const loading = useKnowledgeLoading();
  const error = useKnowledgeError();
  const initialized = useKnowledgeInitialized();
  const { initialize, setSelectedTopic } = useKnowledgeActions();
  const { track } = useAmplitude();
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Initialize knowledge data on mount
  useEffect(() => {
    if (!initialized && !loading) {
      initialize();
    }
  }, [initialized, loading, initialize]);

  // Handle topic parameter from URL
  useEffect(() => {
    if (!initialized) {
      return;
    }

    const topicParam = searchParams.get("topic");

    if (topicParam) {
      const topicExists = topics.some((t) => t.id === topicParam);

      if (topicExists && topicParam !== selectedTopicId) {
        logger.info(`Opening topic from URL parameter: ${topicParam}`);

        setSelectedTopic(topicParam);
      }

      if (!topicExists) {
        logger.warn(`Invalid topic ID in URL: ${topicParam}`);

        setSearchParams(
          (prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.delete("topic");

            return newParams;
          },
          { replace: true, preventScrollReset: true },
        );
      }
    }

    if (!topicParam && topics.length > 0 && !selectedTopicId) {
      // Auto-select first topic if none selected
      const firstTopic = topics[0];

      setSelectedTopic(firstTopic.id);
      setSearchParams(
        (prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.set("topic", firstTopic.id);
          return newParams;
        },
        { replace: true, preventScrollReset: true },
      );
    }
  }, [
    searchParams,
    initialized,
    topics,
    selectedTopicId,
    setSelectedTopic,
    setSearchParams,
  ]);

  const handleTopicSelect = useCallback(
    (topicId: string) => {
      const topic = topics.find((t) => t.id === topicId);

      if (!topic) {
        return;
      }

      track("Knowledge Topic Selected", {
        topicId,
        topicTitle: topic.title.public,
        hasPodcastEpisodes: topic.podcast.length > 0,
        episodeCount: topic.podcast.length,
      });

      setSelectedTopic(topicId);
      setSearchParams(
        (prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.set("topic", topicId);
          return newParams;
        },
        { replace: true, preventScrollReset: true },
      );
    },
    [topics, track, setSelectedTopic, setSearchParams],
  );

  const selectedTopic = useMemo(
    () => topics.find((t) => t.id === selectedTopicId),
    [topics, selectedTopicId],
  );

  if (loading) {
    return (
      <Container size="xl">
        <LoadingSpinner message="Lade Hundewissen..." />
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="xl">
        <Alert icon={<IconAlertCircle size={16} />} title="Fehler" color="red">
          {error}
        </Alert>
      </Container>
    );
  }

  if (!topics.length) {
    return (
      <Container size="xl">
        <Title order={1} mb="md">
          Hundewissen
        </Title>
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Keine Themen gefunden"
        >
          Es wurden keine Wissensthemen gefunden.
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="xl">
      <Title order={1} mb="lg">
        Hundewissen
      </Title>

      <Grid gutter="lg">
        {/* Table of Contents - Left Column on Desktop, Top on Mobile */}
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Paper withBorder p="md" style={{ width: "250px" }}>
            <Title order={3} mb="sm">
              Themen
            </Title>
            <Stack gap="xs">
              {topics.map((topic) => (
                <Box
                  key={topic.id}
                  component="button"
                  onClick={() => handleTopicSelect(topic.id)}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    backgroundColor:
                      selectedTopicId === topic.id
                        ? "var(--mantine-color-blue-light)"
                        : "transparent",
                    fontWeight: selectedTopicId === topic.id ? 500 : 400,
                    transition: "background-color 0.2s",
                  }}
                >
                  {topic.title.public}
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid.Col>

        {/* Content - Right Column */}
        <Grid.Col span={{ base: 12, md: 9 }}>
          {selectedTopic ? (
            <KnowledgeContent topic={selectedTopic} />
          ) : (
            <Alert icon={<IconAlertCircle size={16} />}>
              Bitte wählen Sie ein Thema aus der Liste.
            </Alert>
          )}
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Hundewissen;
