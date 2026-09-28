import { useCallback } from "react";
import type { Breed, Podcast } from "types/breed";
import type { ListenTarget } from "~/utils/breed";
import { useAmplitude } from "./useAmplitude";

export type PlayPlacement = "hero" | "card" | "detail" | "sticky" | "more";

/** Tracks "Play Clicked" for any play button */
export const useTrackPlay = () => {
  const { track } = useAmplitude();

  return useCallback(
    (
      breed: Breed,
      podcast: Podcast,
      target: ListenTarget,
      placement: PlayPlacement,
    ) =>
      track("Play Clicked", {
        breedId: String(breed.id),
        breedName: breed.details.public[0],
        placement,
        provider: target.provider,
        episodeNumber: podcast.number,
        timecode: podcast.meta.timecode,
      }),
    [track],
  );
};
