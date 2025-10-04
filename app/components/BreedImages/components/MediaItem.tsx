import React, { useState, useRef, useEffect, type MouseEventHandler } from "react";
import { Image } from "@mantine/core";
import { useBreed } from "~/stores/breeds";
import PlayButton from "./PlayButton";

interface MediaItemProps {
  src: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  isDetailView?: boolean;
  className?: string;
  breedId?: string | number;
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
  
  // Check if a specific variant has video capability
  const getVariantVideoCapability = (variantName: string | null): boolean => {
    if (!breed?.details?.variants || !variantName) return false;
    
    const variant = breed.details.variants.find(v => v.internal === variantName);
    return Boolean(variant?.hasVideo);
  };
  
  const currentVariant = extractVariantFromPath(src);
  const variantHasVideo = getVariantVideoCapability(currentVariant);
  
  // Check if this breed/variant has video capability
  const hasVideo = breedId && isDetailView && (
    (currentVariant && variantHasVideo) || // Specific variant has video
    (!currentVariant && breed?.details?.hasVideo) // No variant but breed has general video
  );
  
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
  
  // Generate video path based on variant
  const videoPath = hasVideo ? 
    `illustrations/breeds/${breedId}/video${currentVariant ? `_${currentVariant}` : ''}.mp4` : '';
  
  // Debug logging
  console.log('MediaItem debug:', {
    breedId,
    src,
    currentVariant,
    variantHasVideo,
    breedHasVideo: breed?.details?.hasVideo,
    isDetailView,
    showingVideo,
    hasVideo,
    videoPath,
    breed: breed?.details
  });
  
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
