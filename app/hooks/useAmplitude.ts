import { useCallback } from "react";

interface BaseEventProperties {
  timestamp?: number;
  url?: string;
}

interface BreedEventProperties extends BaseEventProperties {
  breedId?: string;
  breedName?: string;
  hasVariants?: boolean;
  variantCount?: number;
  searchActive?: boolean;
  searchTerm?: string | null;
  totalBreedsVisible?: number;
  slideIndex?: number;
  totalSlides?: number;
  variantName?: string;
  currentSlide?: number;
  currentVariant?: string;
  source?: string;
  page?: string;
  episodeTitle?: string;
  episodeNumber?: number;
  sourceType?: string;
  sourceUrl?: string;
  timecode?: number;
  linkName?: string;
  linkUrl?: string;
  modalOpenDuration?: number;
  sortBy?: string;
  sortOrder?: string;
  previousSortBy?: string;
  resultsCount?: number;
  totalBreeds?: number;
  hasResults?: boolean;
}

interface ErrorEventProperties extends BaseEventProperties {
  error?: string;
  stack?: string;
  componentStack?: string;
}

interface SearchEventProperties extends BaseEventProperties {
  searchTerm: string;
  resultsCount: number;
  totalBreeds: number;
  hasResults: boolean;
}

type EventProperties =
  | BreedEventProperties
  | ErrorEventProperties
  | SearchEventProperties
  | BaseEventProperties;

export const useAmplitude = () => {
  const track = useCallback(
    async (eventName: string, properties?: EventProperties) => {
      // Only track on client side and in production
      if (typeof window === "undefined" || import.meta.env.DEV) return;

      try {
        const { track } = await import("@amplitude/analytics-browser");
        track(eventName, {
          timestamp: Date.now(),
          url: window.location.href,
          ...properties,
        });
      } catch (error) {
        // Error tracking failures should not interrupt user flow
        if (import.meta.env.DEV) {
          console.error("Failed to track event:", eventName, error);
        }
      }
    },
    [],
  );

  const identify = useCallback(
    async (userId: string, userProperties?: EventProperties) => {
      if (typeof window === "undefined" || import.meta.env.DEV) return;

      try {
        const { setUserId, identify, Identify } = await import(
          "@amplitude/analytics-browser"
        );
        setUserId(userId);
        if (userProperties) {
          const identifyEvent = new Identify();
          Object.entries(userProperties).forEach(([key, value]) => {
            identifyEvent.set(key, value);
          });
          identify(identifyEvent);
        }
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error("Failed to identify user:", error);
        }
      }
    },
    [],
  );

  const setUserProperty = useCallback(
    async (property: string, value: string | number | boolean | string[]) => {
      if (typeof window === "undefined" || import.meta.env.DEV) return;

      try {
        const { identify, Identify } = await import(
          "@amplitude/analytics-browser"
        );
        const identifyEvent = new Identify();
        identifyEvent.set(property, value);
        identify(identifyEvent);
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error("Failed to set user property:", error);
        }
      }
    },
    [],
  );

  return {
    track,
    identify,
    setUserProperty,
  };
};
