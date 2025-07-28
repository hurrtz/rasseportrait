import React, { type MouseEventHandler } from "react";
import { Image } from "@mantine/core";
import Video from "react-player";
import { videoProps } from "../utils";

interface MediaItemProps {
  src: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  isVideo?: boolean;
  isDetailView?: boolean;
  className?: string;
}

const MediaItem = ({
  src,
  onClick,
  isVideo = false,
  isDetailView = false,
  className = "image",
}: MediaItemProps) => {
  const imageElement = (
    <Image src={src} height="100%" className={className} onClick={onClick} />
  );

  // Show video only in detail view for video breeds
  if (isVideo && isDetailView) {
    return (
      <Video
        src={src}
        className={className}
        fallback={imageElement}
        {...videoProps}
      />
    );
  }

  // Default to image
  return imageElement;
};

export default MediaItem;
