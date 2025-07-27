import React, { useMemo, type MouseEventHandler, memo } from "react";
import { Image } from "@mantine/core";
import Video from "react-player";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
import "./styles.css";
import type { Breed } from "types/breed";
import {
  useBreed,
  useBreedVariantNames,
  useSelectedBreed,
} from "~/stores/breeds";

interface Props {
  id: Breed["id"];
  onClick?: MouseEventHandler<HTMLDivElement>;
  handleSlideChange?: (index: number) => void;
}

const videoProps = {
  controls: false,
  muted: true,
  loop: true,
  playing: true,
  width: "100%",
  height: "100%",
};

const BreedImages = ({ id, onClick, handleSlideChange }: Props) => {
  const { details } = useBreed(id)!;
  const variantNames = useBreedVariantNames(id);
  const isGrouped = details.isGrouped;
  const isDetailView = Boolean(useSelectedBreed());
  const isVideo = ["grouped_268_268", "352", "83"].includes(String(id));

  const PATH = "illustrations";
  const CATEGORY = "breeds";
  const ASSET_TYPE = isDetailView && isVideo ? "video" : "illustration";
  const EXTENSION = isDetailView && isVideo ? "mp4" : "jpeg";
  const THUMBNAIL = isDetailView ? "" : "_thumbnail";

  const images = useMemo(() => {
    if (isGrouped) {
      return details.variants!.map((variant) => {
        return `${PATH}/${CATEGORY}/${variant.fci!.standardNumber}/${ASSET_TYPE}_${variant.internal}${THUMBNAIL}.${EXTENSION}`;
      });
    }

    return (
      variantNames?.map(
        ({ id, variant }) =>
          `${PATH}/${CATEGORY}/${id}/${ASSET_TYPE}${variant ? `_${variant}` : ""}${THUMBNAIL}.${EXTENSION}`,
      ) ?? []
    );
  }, [variantNames, isGrouped, details]);

  if (images.length === 1 && isDetailView && isVideo) {
    return (
      <Video
        src={images[0]}
        key={images[0]}
        className="image"
        {...videoProps}
      />
    );
  }

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
      {images.map((image, index) => {
        if (isDetailView && isVideo) {
          return (
            <Video
              src={image}
              key={`${image}-${index}`}
              className="image slide"
              {...videoProps}
            />
          );
        }

        return (
          <Image
            src={image}
            key={`${image}-${index}`}
            className="image slide"
            onClick={onClick}
          />
        );
      })}
    </Carousel>
  );
};

export default memo(BreedImages);
