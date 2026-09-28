import React from "react";
import type { Podcast } from "types/breed";
import { StickyPlayBar } from "~/components/StickyPlayBar";
import { providerName, type ListenTarget } from "~/utils/breed";
import { formatEpisode, formatTimecode } from "~/utils/format";

interface Props {
  podcast: Podcast;
  listen: ListenTarget;
  onPlay: () => void;
}

/** The portrait's play bar pinned to the bottom of small screens */
const StickyPlayer = ({ podcast, listen, onPlay }: Props) => (
  <StickyPlayBar
    href={listen.url}
    title={`Ab ${formatTimecode(podcast.meta.timecode)} anhören`}
    meta={`${providerName(listen.provider)} · ${formatEpisode(podcast.number)}`}
    onPlay={onPlay}
  />
);

export default StickyPlayer;
