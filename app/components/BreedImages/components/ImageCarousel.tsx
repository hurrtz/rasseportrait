import React, { type MouseEventHandler } from "react";
import { Carousel } from "@mantine/carousel";
import ErrorBoundary from "../../ErrorBoundary";
import MediaItem from "./MediaItem";
import "@mantine/carousel/styles.css";

interface ImageCarouselProps {
  images: string[];
  onClick?: MouseEventHandler<HTMLDivElement>;
  handleSlideChange?: (index: number) => void;
  isVideo?: boolean;
  isDetailView?: boolean;
}

const ImageCarousel = ({
  images,
  onClick,
  handleSlideChange,
  isVideo = false,
  isDetailView = false,
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
          <MediaItem
            key={`${image}-${index}`}
            src={image}
            onClick={onClick}
            isVideo={isVideo}
            isDetailView={isDetailView}
            className="image slide"
          />
        ))}
      </Carousel>
    </ErrorBoundary>
  );
};

export default ImageCarousel;
