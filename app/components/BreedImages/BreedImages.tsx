import React, { type MouseEventHandler, memo } from "react";
import "./styles.css";
import type { Breed } from "types/breed";
import { useSelectedBreed } from "~/stores/breeds";
import { useImagePaths } from "./hooks";
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
  const { images } = useImagePaths({
    id,
    isDetailView,
  });

  // Single image case
  if (images.length === 1) {
    return (
      <SingleImage
        src={images[0]}
        onClick={onClick}
        isDetailView={isDetailView}
        breedId={id}
      />
    );
  }

  // Multiple images case
  return (
    <ImageCarousel
      images={images}
      onClick={onClick}
      handleSlideChange={handleSlideChange}
      isDetailView={isDetailView}
      breedId={id}
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
