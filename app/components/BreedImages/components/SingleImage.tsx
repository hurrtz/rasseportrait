import React, { type MouseEventHandler } from "react";
import ErrorBoundary from "../../ErrorBoundary";
import MediaItem from "./MediaItem";

interface SingleImageProps {
  src: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  isDetailView?: boolean;
  className?: string;
  breedId: string | number;
}

const SingleImage = ({
  src,
  onClick,
  isDetailView = false,
  className = "image",
  breedId,
}: SingleImageProps) => (
  <ErrorBoundary>
    <MediaItem
      src={src}
      onClick={onClick}
      isDetailView={isDetailView}
      className={className}
      breedId={breedId}
      key={src}
    />
  </ErrorBoundary>
);

export default SingleImage;
