import React, { type MouseEventHandler, memo } from "react";
import "./styles.css";
import type { Breed } from "types/breed";
import { useSelectedBreed } from "~/stores/breeds";
import { useImagePaths } from "./hooks";
import { isVideoBreed } from "./utils";
import { SingleImage, ImageCarousel } from "./components";

interface Props {
  id: Breed["id"];
  onClick?: MouseEventHandler<HTMLDivElement>;
  handleSlideChange?: (index: number) => void;
  isDetailView?: boolean;
}

const BreedImages = ({
  id,
  onClick,
  handleSlideChange,
  isDetailView = false,
}: Props) => {
  const isVideo = isVideoBreed(id);
  const { images, isDetailView: isDetailViewFromHook } = useImagePaths({
    id,
    isDetailView,
    isVideo,
  });

  // Single image case
  if (images.length === 1) {
    return (
      <SingleImage
        src={images[0]}
        onClick={onClick}
        isVideo={isVideo}
        isDetailView={isDetailView}
      />
    );
  }

  // Multiple images case
  return (
    <ImageCarousel
      images={images}
      onClick={onClick}
      handleSlideChange={handleSlideChange}
      isVideo={isVideo}
      isDetailView={isDetailView}
    />
  );
};

// Separate component for list view that doesn't depend on selectedBreed
const BreedImagesList = memo(
  ({ id, onClick, handleSlideChange }: Omit<Props, "isDetailView">) => (
    <BreedImages
      id={id}
      onClick={onClick}
      handleSlideChange={handleSlideChange}
      isDetailView={false}
    />
  ),
);

// Separate component for detail view that depends on selectedBreed
const BreedImagesDetail = memo(
  ({ id, onClick, handleSlideChange }: Omit<Props, "isDetailView">) => {
    const selectedBreed = useSelectedBreed();
    const isDetailView = Boolean(selectedBreed);

    return (
      <BreedImages
        id={id}
        onClick={onClick}
        handleSlideChange={handleSlideChange}
        isDetailView={isDetailView}
      />
    );
  },
);

export { BreedImagesList, BreedImagesDetail };
export default memo(BreedImages);
