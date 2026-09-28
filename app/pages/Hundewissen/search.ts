import { useEffect, useMemo } from "react";
import Fuse from "fuse.js";
import type { HundewissenTopicSummary } from "types/hundewissen";
import { useAmplitude } from "~/hooks/useAmplitude";

export const collator = new Intl.Collator("de");

/** Most discussed first, then more entries, then alphabetically */
export const bySize = (a: HundewissenTopicSummary, b: HundewissenTopicSummary) =>
  b.episodeCount - a.episodeCount ||
  b.entryCount - a.entryCount ||
  collator.compare(a.label, b.label);

/** Most discussed first, then alphabetically (the area page's order) */
export const byEpisodes = (
  a: HundewissenTopicSummary,
  b: HundewissenTopicSummary,
) => b.episodeCount - a.episodeCount || collator.compare(a.label, b.label);

type Searchable = HundewissenTopicSummary & { areaName?: string };

/** Fuzzy topic search over the label (and the area name when given) */
export const useTopicSearch = (topics: Searchable[], needle: string) => {
  const fuse = useMemo(
    () =>
      new Fuse(topics, {
        keys: ["label", "areaName"],
        threshold: 0.3,
        ignoreLocation: true,
      }),
    [topics],
  );

  return useMemo(
    () => (needle ? fuse.search(needle).map(({ item }) => item) : null),
    [fuse, needle],
  );
};

/** "Hundewissen Search Performed", once per (debounced) search term */
export const useTrackTopicSearch = (needle: string, resultsCount: number) => {
  const { track } = useAmplitude();

  useEffect(() => {
    if (needle) {
      track("Hundewissen Search Performed", { searchTerm: needle, resultsCount });
    }
    // not again when the same results re-render
  }, [needle, track]);
};
