import React, { useMemo, type MouseEventHandler } from "react";
import { Image } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import "./styles.css";
import type { Breed } from "types/breed";
import { useBreed, useBreedVariantNames } from "~/stores/breeds";

interface Props {
  id: Breed["id"];
  onClick?: MouseEventHandler<HTMLDivElement>;
  handleSlideChange?: (index: number) => void;
}

const BreedImages = ({ id, onClick, handleSlideChange }: Props) => {
  const { details } = useBreed(id)!;
  const variantNames = useBreedVariantNames(id);
  const isGrouped = details.isGrouped;

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
  }, [variantNames, isGrouped, details]);

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

export default BreedImages;
