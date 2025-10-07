import { useEffect, useRef, useState, useCallback } from 'react';
import type { Breed } from '../../types/breed';

// Global set to track which breed IDs have been loaded
// This persists across component unmounts/remounts during search
const loadedBreedIds = new Set<string | number>();

/**
 * Hook to manage breed card visibility state globally.
 * Once a breed card has been loaded, it stays loaded even after
 * search filtering and clearing.
 */
export function useBreedVisibility(breedId: Breed['id']) {
  // Check if this breed was already loaded previously
  const [isLoaded, setIsLoaded] = useState(() => 
    loadedBreedIds.has(breedId)
  );

  const markAsLoaded = useCallback(() => {
    if (!loadedBreedIds.has(breedId)) {
      loadedBreedIds.add(breedId);
      setIsLoaded(true);
    }
  }, [breedId]);

  return { isLoaded, markAsLoaded };
}

/**
 * Hook combining intersection observer with global visibility tracking.
 * Ensures that once a breed card is loaded, it remains loaded even
 * after search operations.
 */
export function useLazyBreedCard(breedId: Breed['id']) {
  const { isLoaded, markAsLoaded } = useBreedVisibility(breedId);
  const elementRef = useRef<HTMLDivElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    // If already loaded from previous render, skip observation
    if (isLoaded) return;

    const element = elementRef.current;
    
    // Fallback for browsers without IntersectionObserver
    if (!element || typeof IntersectionObserver === 'undefined') {
      if (typeof IntersectionObserver === 'undefined') {
        markAsLoaded();
      }
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoaded) {
          setIsIntersecting(true);
          markAsLoaded();
          observer.disconnect();
        }
      },
      {
        threshold: 0,
        rootMargin: '100px', // Load 100px before entering viewport
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [isLoaded, markAsLoaded]);

  // Show the card if it was previously loaded OR currently intersecting
  const shouldRenderCard = isLoaded || isIntersecting;

  return { ref: elementRef, shouldRenderCard };
}

// Optional: Export a function to clear the cache if needed
export function clearBreedVisibilityCache() {
  loadedBreedIds.clear();
}