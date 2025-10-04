import React, { type MouseEventHandler } from "react";
import { Carousel } from "@mantine/carousel";
import ErrorBoundary from "../../ErrorBoundary";
import MediaItem from "./MediaItem";
import "@mantine/carousel/styles.css";

interface ImageCarouselProps {
  images: string[];
  onClick?: MouseEventHandler<HTMLDivElement>;
  handleSlideChange?: (index: number) => void;
  isDetailView?: boolean;
  breedId: string | number;
}

const ImageCarousel = ({
  images,
  onClick,
  handleSlideChange,
  isDetailView = false,
  breedId,
}: ImageCarouselProps) => {
  return (
    <ErrorBoundary>
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
          <Carousel.Slide key={`${image}-${index}`}>
            <MediaItem
              src={image}
              onClick={onClick}
              isDetailView={isDetailView}
              className="image slide"
              breedId={breedId}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
    </ErrorBoundary>
  );
};

export default ImageCarousel;
