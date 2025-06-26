import React, {
  useMemo,
  useState,
  type MouseEventHandler,
  useCallback,
} from "react";
import { Card, Image, Text, Group } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { clsx } from "clsx";
import type { Breed } from "../../../types/breed";
import { useBreed, useBreedVariantNames } from "../../stores/breeds";
import "@mantine/carousel/styles.css";
import "./styles.css";

interface Props {
  id: Breed["id"];
  name: string;
  onClick: () => void;
}

const Images = ({
  images,
  onClick,
  handleSlideChange,
}: {
  images: string[];
  onClick?: MouseEventHandler<HTMLDivElement>;
  handleSlideChange?: (index: number) => void;
}) => {
  if (images.length === 1) {
    return (
      <Image
        src={images[0]}
        height="100%"
        key={images[0]}
        className="image"
        onClick={onClick}
      />
    );
  }

  return (
    <Carousel
      slideSize={{ base: "100%" }}
      slideGap="md"
      controlsOffset="sm"
      controlSize={26}
      withControls
      withIndicators
      emblaOptions={{
        loop: true,
        dragFree: false,
        align: "center",
      }}
      classNames={{
        indicators: "carousel-indicator",
      }}
      onSlideChange={handleSlideChange}
    >
      {images.map((image, index) => (
        <Image
          src={image}
          key={`${image}-${index}`}
          className="image slide"
          onClick={onClick}
        />
      ))}
    </Carousel>
  );
};

const BreedCard = ({ id, name, onClick }: Props) => {
  const { Section } = Card;
  const { details } = useBreed(id)!;
  const variantNames = useBreedVariantNames(id);
  const isGrouped = details.isGrouped;
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = useCallback((index: number) => {
    setActiveSlide(index);
  }, []);

  const images = useMemo(() => {
    if (isGrouped) {
      return details.variants!.map((variant) => {
        return `illustrations/breeds/${variant.fci!.standardNumber}/illustration_${variant.internal}_thumbnail.jpeg`;
      });
    }

    return (
      variantNames?.map(
        ({ id, variant }) =>
          `illustrations/breeds/${id}/illustration${variant ? `_${variant}` : ""}_thumbnail.jpeg`,
      ) ?? []
    );
  }, [variantNames]);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className="card">
      <Section
        className={clsx("card-section", {
          "single-image-card-section": variantNames.length == 1,
        })}
      >
        <Images
          images={images}
          onClick={onClick}
          handleSlideChange={handleSlideChange}
        />
      </Section>

      <Group justify="space-between" className="breed-card-name">
        <Text truncate="end" className="breed-card-name-text">
          {name}
        </Text>
        {details.variants?.length && (
          <Text truncate="end" className="breed-card-name-sub-text" size="sm">
            {details.variants?.[activeSlide]?.public}
          </Text>
        )}
      </Group>
    </Card>
  );
};

export default BreedCard;
