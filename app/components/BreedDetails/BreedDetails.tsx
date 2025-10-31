import React, { useState, memo } from "react";
import {
  Card,
  Text,
  Divider,
  Group,
  Stack,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import { useSelectedBreed } from "../../stores/breeds";
import { BreedImagesDetail } from "../BreedImages";
import type { Breed } from "types/breed";
import { IconBroadcast, IconVideo } from "@tabler/icons-react";
import { useAmplitude } from "../../hooks/useAmplitude";
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
  const { track } = useAmplitude();

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
    // For grouped breeds, use the podcast data from the active variant
    // For regular breeds, use the breed's podcast data
    const podcastData =
      selectedBreed.details.variants?.[activeSlide]?.podcast ??
      selectedBreed.podcast;
    return podcastData;
  };

  const podcastEpisodes = getPodcastEpisodes();

  const furtherReadings = [
    ...new Set([
      ...selectedBreed.furtherReading,
      ...(selectedBreed.details.variants?.[activeSlide]?.furtherReading ?? []),
    ]),
  ];

  return (
    <div className="breed-details-container">
      <BreedImagesDetail
        id={selectedBreed.id}
        handleSlideChange={(index: number) => {
          track("Breed Details Image Slide Changed", {
            breedId: String(selectedBreed.id),
            breedName: selectedBreed.details.public[0],
            slideIndex: index,
            totalSlides: selectedBreed.details.variants?.length || 1,
            variantName: selectedBreed.details.variants?.[index]?.public,
          });
          setActiveSlide(index);
        }}
      />
      <div className="breed-details">
        <Text className="breed-name" size="xl" fw={300}>
          {selectedBreed.details.public[0]}
        </Text>
        <Text className="variant-name" size="xs" fw={300}>
          {selectedBreed.details.variants?.[activeSlide]?.public}
        </Text>
        <Divider className="divider" />
        <div>
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
        </div>
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
              onClick={() => {
                track("Podcast Episode Clicked", {
                  breedId: String(selectedBreed.id),
                  breedName: selectedBreed.details.public[0],
                  episodeTitle: episode,
                  episodeNumber: Number(number),
                  sourceType: sources[0].type,
                  sourceUrl: sources[0].url,
                  timecode: timecode,
                });
                window.open(sources[0].url, "_blank");
              }}
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
          {furtherReadings.map((reading) => (
            <ActionIcon
              key={reading.name}
              variant="outline"
              className="further-reading-icon"
              color="#63687c"
              onClick={() => {
                track("Further Reading Link Clicked", {
                  breedId: String(selectedBreed.id),
                  breedName: selectedBreed.details.public[0],
                  linkName: reading.name,
                  linkUrl: reading.url,
                  currentVariant:
                    selectedBreed.details.variants?.[activeSlide]?.public,
                });
                window.open(reading.url, "_blank");
              }}
            >
              <Text component="span" size="xs">
                {reading.name}
              </Text>
            </ActionIcon>
          ))}
        </div>
        {selectedBreed.recognitions?.map((recognition, index) => (
          <Tooltip
            key={`recognition_${index}`}
            label={recognition}
            className="recognition"
            withArrow
            arrowOffset={25}
            arrowSize={8}
          >
            <ActionIcon
              className="recognition-button"
              variant="gradient"
              radius="lg"
              size="lg"
              gradient={{ from: "orange", to: "red", deg: 90 }}
            >
              <IconHeart />
            </ActionIcon>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default memo(BreedDetails);
