import React, {
  useState,
  useRef,
  useEffect,
  memo,
  type MouseEventHandler,
} from "react";
import { Image } from "@mantine/core";
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const breed = useBreed(breedId);

  // Extract variant from image path (e.g., 'illustration_long.jpeg' -> 'long')
  const extractVariantFromPath = (imagePath: string): string | null => {
    const match = imagePath.match(/_(\w+)(?:_thumbnail)?\.(jpeg|jpg|png)$/i);

    return match ? match[1] : null;
  };

  const currentVariant = extractVariantFromPath(src);

  // Check if this breed has video capability
  const hasVideo = breedId && isDetailView && breed?.details?.hasVideo;

  // Control video playback when showingVideo changes
  useEffect(() => {
    if (videoRef.current) {
      if (showingVideo) {
        videoRef.current.play().catch((error) => {
          console.error("Video play failed:", error);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [showingVideo]);

  // Generate video path based on variant
  const videoPath = hasVideo
    ? `illustrations/breeds/${breedId}/video${currentVariant ? `_${currentVariant}` : ""}.mp4`
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
          <video
            ref={videoRef}
            src={videoPath}
            width="100%"
            height="100%"
            muted
            loop
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
