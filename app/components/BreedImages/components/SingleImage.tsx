import React, { type MouseEventHandler } from "react";
import ErrorBoundary from "../../ErrorBoundary";
import MediaItem from "./MediaItem";

interface SingleImageProps {
  src: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  isVideo?: boolean;
  isDetailView?: boolean;
  className?: string;
}

const SingleImage = ({
  src,
  onClick,
  isVideo = false,
  isDetailView = false,
  className = "image",
}: SingleImageProps) => {
  return (
    <ErrorBoundary>
      <MediaItem
        src={src}
        onClick={onClick}
        isVideo={isVideo}
        isDetailView={isDetailView}
        className={className}
        key={src}
      />
    </ErrorBoundary>
  );
};

export default SingleImage;
