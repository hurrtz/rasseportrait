import React, { useState, useCallback } from "react";
import { Card, Text, Group, Divider } from "@mantine/core";
import { clsx } from "clsx";
import type { Breed } from "../../../types/breed";
import { useBreed, useBreedVariantNames } from "../../stores/breeds";
import "@mantine/carousel/styles.css";
import { BreedImagesList } from "../BreedImages";
import { useAmplitude } from "../../hooks/useAmplitude";
import {
  KEY_ENTER,
  KEY_SPACE,
  TAB_INDEX_FOCUSABLE,
  ROLE_BUTTON,
} from "~/constants";
import "./styles.css";

interface Props {
  id: Breed["id"];
  name: string;
  onClick: () => void;
}

const BreedCard = ({ id, name, onClick }: Props) => {
  const { Section } = Card;
  const { details } = useBreed(id)!;
  const variantNames = useBreedVariantNames(id);
  const [activeSlide, setActiveSlide] = useState(0);
  const { track } = useAmplitude();

  const handleSlideChange = useCallback(
    (index: number) => {
      track("Breed Card Image Slide Changed", {
        breedId: String(id),
        breedName: name,
        slideIndex: index,
        totalSlides: variantNames.length,
        variantName:
          typeof variantNames[index] === "string"
            ? variantNames[index]
            : String(variantNames[index]),
      });
      setActiveSlide(index);
    },
    [id, name, variantNames, track],
  );

  const handleCardClick = useCallback(() => {
    track("Breed Card Clicked", {
      breedId: String(id),
      breedName: name,
      hasVariants: variantNames.length > 1,
      variantCount: variantNames.length,
      currentSlide: activeSlide,
      currentVariant:
        typeof variantNames[activeSlide] === "string"
          ? variantNames[activeSlide]
          : String(variantNames[activeSlide]),
    });
    onClick();
  }, [id, name, variantNames, activeSlide, onClick, track]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      // Enter or Space key to open breed details
      if (event.key === KEY_ENTER || event.key === KEY_SPACE) {
        event.preventDefault();
        handleCardClick();
      }
    },
    [handleCardClick],
  );

  return (
    <Card
      shadow="xl"
      padding="xl"
      radius="md"
      className="card"
      tabIndex={TAB_INDEX_FOCUSABLE}
      onKeyDown={handleKeyDown}
      role={ROLE_BUTTON}
      aria-label={`View details for ${name}`}
    >
      <Section
        className={clsx("card-section", {
          "single-image-card-section": variantNames.length == 1,
        })}
      >
        <BreedImagesList
          id={id}
          onClick={handleCardClick}
          handleSlideChange={handleSlideChange}
        />
        <div className="sr-only">
          Press Enter or Space to view details for {name}
        </div>
      </Section>

      <Group justify="space-between" className="breed-card-name">
        <Text truncate="end" className="breed-card-name-text">
          {name.replace(/ß/g, "ss")}
        </Text>
        {details.variants?.length && (
          <>
            <Divider className="breed-card-name-divider" />
            <Text truncate="end" size="sm">
              {details.variants?.[activeSlide]?.public.replace(/ß/g, "ss")}
            </Text>
          </>
        )}
      </Group>
    </Card>
  );
};

export default BreedCard;
