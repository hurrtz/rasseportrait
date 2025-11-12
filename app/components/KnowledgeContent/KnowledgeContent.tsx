import { Stack, Text, Title, Card, List, Anchor, Badge } from "@mantine/core";
import { IconExternalLink, IconVideo, IconMusic } from "@tabler/icons-react";
import type { KnowledgeTopic } from "../../../types/knowledge";
import { useAmplitude } from "~/hooks/useAmplitude";

interface KnowledgeContentProps {
  topic: KnowledgeTopic;
}

const KnowledgeContent = ({ topic }: KnowledgeContentProps) => {
  const { track } = useAmplitude();

  const handlePodcastClick = (episodeNumber: number | string, url: string) => {
    track("Knowledge Podcast Link Clicked", {
      topicId: topic.id,
      topicTitle: topic.title.public,
      episodeNumber: String(episodeNumber),
      url,
    });
  };

  const handleFurtherReadingClick = (name: string, url: string) => {
    track("Knowledge Further Reading Clicked", {
      topicId: topic.id,
      topicTitle: topic.title.public,
      linkName: name,
      url,
    });
  };

  const formatTimecode = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Stack gap="lg">
      <div>
        <Title order={1} mb="sm">
          {topic.title.public}
        </Title>
        <Text size="lg" c="dimmed">
          {topic.description}
        </Text>
      </div>

      <Card withBorder p="lg">
        <Text style={{ whiteSpace: "pre-wrap" }}>{topic.content}</Text>
      </Card>

      {topic.podcast && topic.podcast.length > 0 && (
        <Card withBorder p="lg">
          <Title order={3} mb="md">
            Podcast-Episoden
          </Title>
          <List spacing="md">
            {topic.podcast.map((episode, index) => (
              <List.Item key={index}>
                <Stack gap="xs">
                  <Text fw={500}>
                    Episode {episode.number}: {episode.episode}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {episode.meta.public} • {formatTimecode(episode.meta.timecode)} •{" "}
                    {new Date(episode.meta.airDate).toLocaleDateString("de-DE", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Text>
                  <Stack gap="xs">
                    {episode.sources.map((source, sourceIndex) => (
                      <Anchor
                        key={sourceIndex}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          handlePodcastClick(episode.number, source.url)
                        }
                      >
                        <Badge
                          leftSection={
                            source.type === "video" ? (
                              <IconVideo size={14} />
                            ) : (
                              <IconMusic size={14} />
                            )
                          }
                          variant="light"
                          rightSection={<IconExternalLink size={12} />}
                        >
                          {source.type === "video" ? "Video" : "Audio"}
                        </Badge>
                      </Anchor>
                    ))}
                  </Stack>
                </Stack>
              </List.Item>
            ))}
          </List>
        </Card>
      )}

      {topic.furtherReading && topic.furtherReading.length > 0 && (
        <Card withBorder p="lg">
          <Title order={3} mb="md">
            Weiterführende Links
          </Title>
          <List spacing="sm">
            {topic.furtherReading.map((link, index) => (
              <List.Item key={index}>
                <Anchor
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleFurtherReadingClick(link.name, link.url)}
                >
                  {link.name} <IconExternalLink size={14} style={{ verticalAlign: "middle" }} />
                </Anchor>
              </List.Item>
            ))}
          </List>
        </Card>
      )}
    </Stack>
  );
};

export default KnowledgeContent;
