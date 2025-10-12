import React, { useState, memo, type MouseEventHandler } from "react";
import { Image } from "@mantine/core";
import ReactPlayer from "react-player";
import clsx from "clsx";
import { useBreed } from "~/stores/breeds";
import PlayButton from "./PlayButton";
import "./styles.css";

interface MediaItemProps {
  src: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  isDetailView?: boolean;
  className?: string;
  breedId: string | number;
}

const MediaItem = ({
  src,
  onClick,
  isDetailView = false,
  className = "image",
  breedId,
}: MediaItemProps) => {
  const [showingVideo, setShowingVideo] = useState(false);
  const breed = useBreed(breedId);

  // Extract variant from image path (e.g., 'illustration_long.jpeg' -> 'long')
  const extractVariantFromPath = (imagePath: string): string | null => {
    const match = imagePath.match(/_(\w+)(?:_thumbnail)?\.(jpeg|jpg|png)$/i);

    return match ? match[1] : null;
  };

  const currentVariant = extractVariantFromPath(src);

  // Check if this breed has video capability
  const hasVideo = breedId && isDetailView && breed?.details?.hasVideo;

  // Use originalId for file paths (fallback to breedId if not available)
  const pathId = breed?.originalId || breedId;

  // Generate video path based on variant
  const videoPath = hasVideo
    ? `illustrations/breeds/${pathId}/video${currentVariant ? `_${currentVariant}` : ""}.mp4`
    : "";

  // Use different layouts based on whether video is available
  if (hasVideo) {
    // Detail view with video capability - use absolute positioning layout
    return (
      <div className={clsx("mediaItemWrapper")} onClick={onClick}>
        {/* Image - positioned absolutely */}
        <div
          className={clsx("imageWrapper")}
          style={{
            opacity: showingVideo ? 0 : 1,
          }}
        >
          <Image
            src={src}
            height="100%"
            width="100%"
            className={clsx(className, "image")}
          />
        </div>

        {/* Video - positioned absolutely */}
        <div
          className={clsx("imageWrapper")}
          style={{
            opacity: showingVideo ? 1 : 0,
          }}
        >
          <ReactPlayer
            src={videoPath}
            width="100%"
            height="100%"
            playing={showingVideo}
            muted
            loop
            playsInline
            controls={false}
            className={clsx(className, "video")}
          />
        </div>

        {/* Play button - only show when video is not playing */}
        {!showingVideo && (
          <PlayButton
            onClick={() => {
              setShowingVideo(true);
            }}
          />
        )}
      </div>
    );
  }

  // Standard overview layout - simple image only
  return (
    <div
      className={clsx("mediaItemWrapper", {
        notPresented: breed?.details.isOfficiallyPresented === false,
        detailView: isDetailView,
      })}
      onClick={onClick}
    >
      <Image
        src={src}
        width="100%"
        height="100%"
        className={clsx(className, "image")}
      />
    </div>
  );
};

export default memo(MediaItem);
