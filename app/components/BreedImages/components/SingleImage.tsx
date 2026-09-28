import React, { type MouseEventHandler } from "react";
import ErrorBoundary from "../../ErrorBoundary";
import MediaItem from "./MediaItem";

interface SingleImageProps {
  src: string;
  alt: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  isDetailView?: boolean;
  className?: string;
  breedId: string | number;
}

const SingleImage = ({
  src,
  alt,
  onClick,
  isDetailView = false,
  className = "image",
  breedId,
}: SingleImageProps) => (
  <ErrorBoundary>
    <MediaItem
      src={src}
      alt={alt}
      onClick={onClick}
      isDetailView={isDetailView}
      className={className}
      breedId={breedId}
      key={src}
    />
  </ErrorBoundary>
);

export default SingleImage;
