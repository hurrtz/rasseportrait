import React, { useId } from "react";
import { IconClock, IconHeadphones } from "@tabler/icons-react";
import type { Podcast } from "types/breed";
import { PlayButton } from "~/components/PlayButton";
import { providerName, type ListenTarget } from "~/utils/breed";
import { formatDateLong, formatTimecode } from "~/utils/format";
import classes from "../Rasse.module.css";

interface Props {
  podcast: Podcast;
  listen: ListenTarget | undefined;
  onPlay: () => void;
}

/**
 * Other ways to hear the entry besides the play button: the second audio
 * provider ("Auch auf RTL+") and videos ("Video auf RTL+")
 */
const getAlternatives = (podcast: Podcast, listen: ListenTarget | undefined) =>
  podcast.sources
    .filter(({ url }) => !listen || !listen.url.startsWith(url))
    .map((source) => ({
      url: source.url,
      label:
        source.type === "video"
          ? `Video auf ${providerName(source.provider)}`
          : `Auch auf ${providerName(source.provider)}`,
    }));

/** Desktop player: episode, date, timecode and where it plays */
const PlayerCard = ({ podcast, listen, onPlay }: Props) => {
  const titleId = useId();
  const timecode = formatTimecode(podcast.meta.timecode);
  const alternatives = getAlternatives(podcast, listen);

  return (
    <section className={classes.player} aria-labelledby={titleId}>
      <div className={classes.playerRow}>
        {listen && (
          <PlayButton
            size={72}
            href={listen.url}
            label={
              listen.provider
                ? `Ab ${timecode} auf ${providerName(listen.provider)} anhören`
                : `Ab ${timecode} anhören`
            }
            onClick={onPlay}
          />
        )}
        <div className={classes.playerText}>
          <h2 id={titleId} className={classes.playerTitle}>
            {podcast.episode}
          </h2>
          <span className={classes.playerSubtitle}>
            Tierisch Menschlich · {formatDateLong(podcast.meta.airDate)}
          </span>
        </div>
      </div>
      <div className={classes.chips}>
        <span className={classes.chip}>
          <IconClock size={16} className={classes.chipIcon} aria-hidden />
          Portrait startet bei {timecode}
        </span>
        {listen && (
          <span className={classes.providers}>
            <IconHeadphones size={16} aria-hidden />
            {alternatives.length
              ? alternatives.map(({ url, label }, index) => (
                  <React.Fragment key={url}>
                    {index > 0 && " · "}
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener"
                      className={classes.providerLink}
                    >
                      {label}
                    </a>
                  </React.Fragment>
                ))
              : providerName(listen.provider)}
          </span>
        )}
      </div>
    </section>
  );
};

export default PlayerCard;
