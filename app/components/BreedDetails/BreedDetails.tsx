import React, { useState } from "react";
import { Card, Text, Divider, Group, Stack, ActionIcon } from "@mantine/core";
import { useSelectedBreed } from "../../stores/breeds";
import { BreedImages } from "../BreedImages";
import type { Breed } from "types/breed";
import { IconBroadcast, IconVideo } from "@tabler/icons-react";
import "./styles.css";

const Icon = ({ type }: { type: string }) => {
  switch (type) {
    case "video":
      return <IconVideo />;

    case "audio":
    default:
      return <IconBroadcast />;
  }
};

const BreedDetails = () => {
  const selectedBreed = useSelectedBreed();
  const [activeSlide, setActiveSlide] = useState(0);

  if (!selectedBreed) {
    return <div>Breed not found</div>;
  }

  const getTime = (timecode: number) => {
    const hours = Math.floor(timecode / 3600);
    const minutes = Math.floor((timecode % 3600) / 60);
    const seconds = timecode % 60;

    if (hours > 0) {
      return `${hours} Stunde${hours > 1 ? "n" : ""}, ${minutes} Minute${
        minutes > 1 ? "n" : ""
      }`;
    }

    if (minutes > 0) {
      return `${minutes} Minute${minutes > 1 ? "n" : ""}`;
    }

    return `${seconds} Sekunde${seconds > 1 ? "n" : ""}`;
  };

  const getPodcastEpisodes = () => {
    const episodes: Breed["podcast"] = [];

    selectedBreed.podcast.forEach((episode) => {
      episode.sources.forEach((source) => {
        let sources = episode.sources;
        sources = [source];
        episode.sources = sources;

        episodes.push({ ...episode });
      });
    });

    return episodes;
  };

  const podcastEpisodes = getPodcastEpisodes();

  const getFurtherReadings = () => {
    const readings: Breed["furtherReading"] = [];

    selectedBreed.furtherReading.forEach((reading) => {
      readings.push({ ...reading });
    });

    selectedBreed.details.variants?.[activeSlide]?.furtherReading?.forEach(
      (reading) => {
        readings.push({ ...reading });
      },
    );

    return [...new Set(readings)];
  };

  return (
    <div className="breed-details-container">
      <div>
        <BreedImages id={selectedBreed.id} handleSlideChange={setActiveSlide} />
      </div>
      <div className="breed-details">
        <Text className="breed-name" size="xl" fw={300}>
          {selectedBreed.details.public[0]}
        </Text>
        <Text className="variant-name" size="xs" fw={300}>
          {selectedBreed.details.variants?.[activeSlide]?.public}
        </Text>
        <Divider className="divider" />
        <Text>
          <Text size="sm" className="section-name">
            FCI
          </Text>
          <Text fw={300} size="xs" ta="center">
            Standardnummer{" "}
            <strong>
              {selectedBreed.classification.fci?.standardNumber ??
                selectedBreed.details.variants?.[activeSlide]?.fci
                  ?.standardNumber}
            </strong>{" "}
            (Gruppe{" "}
            {selectedBreed.classification.fci?.group ??
              selectedBreed.details.variants?.[activeSlide]?.fci?.group}
            , Sektion{" "}
            {selectedBreed.classification.fci?.section ??
              selectedBreed.details.variants?.[activeSlide]?.fci?.section}
            )
          </Text>
        </Text>
        <Divider className="divider" />
        {podcastEpisodes.map(
          (
            {
              episode,
              number,
              meta: { public: publicName, timecode },
              sources,
            },
            index,
          ) => (
            <Card
              key={`${index}-${episode}`}
              shadow="sm"
              radius="md"
              color="gray"
              className="podcast-episode"
            >
              <Group gap="lg" wrap="nowrap" preventGrowOverflow>
                <div className="podcast-episode-icon">
                  <Icon type={sources[0].type} />
                </div>
                <Stack gap={0}>
                  <Text key={episode} className="podcast-episode-title">
                    {episode}
                  </Text>
                  <Text key={number} className="podcast-episode-time">
                    Folge <strong>{number}</strong> —{" "}
                    <span className="podcast-episode-time-value">
                      {getTime(timecode)}
                    </span>
                  </Text>
                  <Text key={publicName} className="podcast-episode-category">
                    {publicName}
                  </Text>
                </Stack>
              </Group>
            </Card>
          ),
        )}
        <Divider className="divider" />
        <Text size="sm" className="section-name">
          Weitere Infos
        </Text>
        <div className="further-readings">
          {getFurtherReadings().map((reading) => (
            <ActionIcon
              key={reading.name}
              variant="outline"
              className="further-reading-icon"
              color="#63687c"
            >
              <Text component="span" size="xs">
                {reading.name}
              </Text>
            </ActionIcon>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreedDetails;
