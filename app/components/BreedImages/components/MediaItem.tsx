import React, { useState, useRef, useEffect, type MouseEventHandler } from "react";
import { Image } from "@mantine/core";
import { useBreed } from "~/stores/breeds";
import PlayButton from "./PlayButton";

interface MediaItemProps {
  src: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  isVideo?: boolean;
  isDetailView?: boolean;
  className?: string;
  breedId?: string | number;
}

const MediaItem = ({
  src,
  onClick,
  isVideo = false,
  isDetailView = false,
  className = "image",
  breedId,
}: MediaItemProps) => {
  const [showingVideo, setShowingVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const breed = useBreed(breedId);
  
  // Debug logging
  console.log('MediaItem debug:', {
    breedId,
    breedHasVideo: breed?.details?.hasVideo,
    isDetailView,
    showingVideo,
    breed: breed?.details
  });
  
  // Check if this breed has a video and we have a breedId
  const hasVideo = breedId && breed?.details?.hasVideo && isDetailView;
  
  // Control video playback when showingVideo changes
  useEffect(() => {
    console.log('Video playback useEffect triggered:', { showingVideo, hasVideoRef: !!videoRef.current });
    if (videoRef.current) {
      if (showingVideo) {
        console.log('Starting video playback');
        videoRef.current.play().catch((error) => {
          console.error('Video play failed:', error);
        });
      } else {
        console.log('Pausing video playback');
        videoRef.current.pause();
      }
    }
  }, [showingVideo]);
  
  // Always render the same container structure to avoid DOM changes
  const videoPath = hasVideo ? `illustrations/breeds/${breedId}/video.mp4` : '';
  
  // Use different layouts based on whether video is available
  if (hasVideo) {
    // Detail view with video capability - use absolute positioning layout
    return (
      <div 
        style={{ 
          position: 'relative', 
          width: '100%',
          aspectRatio: '1 / 1' // Creates a square
        }}
        onClick={onClick}
      >
        {/* Image - positioned absolutely */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: showingVideo ? 0 : 1,
            transition: 'opacity 0.3s ease'
          }}
        >
          <Image 
            src={src} 
            height="100%" 
            width="100%"
            className={className} 
            style={{
              objectFit: 'contain'
            }}
          />
        </div>
        
        {/* Video - positioned absolutely */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: showingVideo ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        >
          <video
            ref={videoRef}
            src={videoPath}
            width="100%"
            height="100%"
            muted
            loop
            className={className}
            onLoadStart={() => console.log('Video loading:', videoPath)}
            onCanPlay={() => console.log('Video ready:', videoPath)}
            onError={(error) => console.error('Video error:', error)}
            style={{
              objectFit: 'contain',
              backgroundColor: 'transparent'
            }}
          />
        </div>
        
        {/* Play button - only show when video is not playing */}
        {!showingVideo && (
          <PlayButton 
            onClick={(e) => {
              e.stopPropagation();
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
      style={{ 
        position: 'relative', 
        width: '100%',
        aspectRatio: '1 / 1' // Creates a square
      }}
      onClick={onClick}
    >
      <Image 
        src={src} 
        width="100%"
        height="100%" 
        className={className} 
        style={{
          objectFit: 'contain'
        }}
      />
    </div>
  );
};

export default React.memo(MediaItem);
