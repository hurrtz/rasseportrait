import React from "react";
import type { Podcast } from "types/breed";
import { PlayButton } from "~/components/PlayButton";
import { providerName, type ListenTarget } from "~/utils/breed";
import { formatEpisode, formatTimecode } from "~/utils/format";
import classes from "../Rasse.module.css";

interface Props {
  podcast: Podcast;
  listen: ListenTarget;
  onPlay: () => void;
}

/** Play bar pinned to the bottom of small screens */
const StickyPlayer = ({ podcast, listen, onPlay }: Props) => {
  const label = `Ab ${formatTimecode(podcast.meta.timecode)} anhören`;

  return (
    <div className={classes.sticky}>
      <PlayButton size={56} href={listen.url} label={label} onClick={onPlay} />
      <span className={classes.stickyText}>
        <span className={classes.stickyTitle}>{label}</span>
        <span className={classes.stickyMeta}>
          {providerName(listen.provider)} · {formatEpisode(podcast.number)}
        </span>
      </span>
    </div>
  );
};

export default StickyPlayer;
