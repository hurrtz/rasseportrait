import React from "react";
import type { Podcast } from "types/breed";
import { PlayButton } from "~/components/PlayButton";
import { getListenUrl, type ListenTarget } from "~/utils/breed";
import { formatEpisode, formatTimecode } from "~/utils/format";
import classes from "./EpisodeRow.module.css";

interface Props {
  podcast: Podcast;
  onPlay?: (target: ListenTarget) => void;
}

/** "Hörerfrage · Folge 12" / "Episode · ab 12:34" with a small play button */
const EpisodeRow = ({ podcast, onPlay }: Props) => {
  const listen = getListenUrl(podcast);
  const heading = `${podcast.meta.public} · ${formatEpisode(podcast.number)}`;
  const timecode = formatTimecode(podcast.meta.timecode);

  return (
    <li className={classes.row}>
      {listen && (
        <PlayButton
          size={40}
          href={listen.url}
          label={`${heading} ab ${timecode} anhören`}
          onClick={() => onPlay?.(listen)}
        />
      )}
      <span className={classes.text}>
        <span className={classes.heading}>{heading}</span>
        <span className={classes.meta}>
          {podcast.episode} · ab {timecode}
        </span>
      </span>
    </li>
  );
};

export default EpisodeRow;
