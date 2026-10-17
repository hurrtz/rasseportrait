import React from "react";
import { Link } from "react-router";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import type { Breed } from "types/breed";
import { PlayButton } from "~/components/PlayButton";
import { useTrackPlay } from "~/hooks/useTrackPlay";
import {
  fciGroupLabel,
  getIllustrations,
  getListenUrl,
  getPrimaryPortrait,
} from "~/utils/breed";
import { formatDateLong, formatEpisode, formatTimecode } from "~/utils/format";
import classes from "./HeroPortrait.module.css";

interface Props {
  breed: Breed;
}

/** "Neues Portrait": the newest breed with a play bar, above the grid */
const HeroPortrait = ({ breed }: Props) => {
  const trackPlay = useTrackPlay();
  const portrait = getPrimaryPortrait(breed);
  if (!portrait) return null;

  const name = breed.details.public[0];
  const [illustration] = getIllustrations(breed);
  const listen = getListenUrl(portrait);
  const timecode = formatTimecode(portrait.meta.timecode);
  const fci = breed.classification.fci;
  const group = fci && fciGroupLabel(fci.group);
  const episode = formatEpisode(portrait.number);
  const onPlay = () => listen && trackPlay(breed, portrait, listen, "hero");

  return (
    <section className={classes.hero} aria-label="Neues Portrait">
      <Link
        to={`/rasse/${breed.slug}`}
        state={{ from: "hero" }}
        className={classes.imageLink}
      >
        <img
          src={illustration.thumbnail}
          alt={illustration.alt}
          className={classes.image}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </Link>

      <div className={classes.body}>
        <div className={classes.metaRow}>
          <span className={classes.pill}>Neues Portrait</span>
          <span className={classes.meta}>
            {episode} · {formatDateLong(portrait.meta.airDate)}
          </span>
        </div>
        <span className={classes.metaMobile}>
          <strong>Neues Portrait</strong> · {episode}
        </span>

        <h1 className={classes.name}>{name}</h1>

        <p className={classes.subline}>
          aus »{portrait.episode}«
          {fci && group && ` · FCI Nº ${fci.standardNumber}, ${group.short}`}
        </p>

        {listen && (
          <>
            <div className={classes.playBar}>
              <PlayButton
                size={64}
                href={listen.url}
                label={`Portrait ab ${timecode} anhören`}
                onClick={onPlay}
              />
              <span className={classes.playText}>
                <span className={classes.playTitle}>
                  Portrait ab {timecode} anhören
                </span>
                <span className={classes.playHint}>
                  {listen.provider === "spotify"
                    ? "Öffnet Spotify an der richtigen Stelle"
                    : listen.provider === "rtl"
                      ? "Öffnet RTL+"
                      : "Öffnet den Podcast"}
                </span>
              </span>
            </div>

            <a
              href={listen.url}
              target="_blank"
              rel="noopener"
              className={classes.playPill}
              onClick={onPlay}
            >
              <span className={classes.playPillIcon} aria-hidden>
                <IconPlayerPlayFilled size={20} />
              </span>
              Ab {timecode} anhören
            </a>
          </>
        )}
      </div>
    </section>
  );
};

export default HeroPortrait;
