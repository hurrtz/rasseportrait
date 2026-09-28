import { useCallback } from "react";
import type { NAV_ITEMS } from "~/constants";

export type NavEvent = (typeof NAV_ITEMS)[number]["event"];

/** Every analytics event and its properties */
export interface AnalyticsEvents {
  "Logo Clicked": { page: string };
  "Breed Search Performed": {
    searchTerm: string;
    resultsCount: number;
    totalBreeds: number;
    hasResults: boolean;
  };
  "Sort Changed": { sortBy: string; sortOrder: string; previousSortBy: string };
  "Play Clicked": {
    breedId: string;
    breedName: string;
    placement: "hero" | "card" | "detail" | "sticky" | "more";
    provider: string | undefined;
    episodeNumber: number | string;
    timecode: number;
  };
  "Breed Page Viewed": {
    breedId: string;
    breedName: string;
    slug: string | undefined;
    referrer: "grid" | "hero" | "related" | "statistics" | "direct";
  };
  "Variant Selected": { breedId: string; variantName: string; index: number };
  "Related Breed Clicked": { fromBreedId: string; toBreedId: string };
  "Further Reading Link Clicked": {
    breedId: string;
    breedName: string;
    linkName: string;
    linkUrl: string;
    currentVariant: string | undefined;
  };
  "Knowledge Topic Selected": {
    topicId: string;
    topicTitle: string;
    hasPodcastEpisodes: boolean;
    episodeCount: number;
  };
  "Knowledge Podcast Link Clicked": {
    topicId: string;
    topicTitle: string;
    episodeNumber: string;
    url: string;
  };
  "Knowledge Further Reading Clicked": {
    topicId: string;
    topicTitle: string;
    linkName: string;
    url: string;
  };
}

type Events = AnalyticsEvents &
  Record<NavEvent, { source: string; page: string }>;

/** Typed Amplitude tracking; a no-op outside production browsers */
export const useAmplitude = () => {
  const track = useCallback(
    async <E extends keyof Events>(eventName: E, properties: Events[E]) => {
      if (typeof window === "undefined" || import.meta.env.DEV) return;

      try {
        const { track } = await import("@amplitude/analytics-browser");
        track(eventName, {
          timestamp: Date.now(),
          url: window.location.href,
          ...properties,
        });
      } catch {
        // analytics must never interrupt the visitor
      }
    },
    [],
  );

  return { track };
};
