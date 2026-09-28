import React, { memo } from "react";
import { Link } from "react-router";
import clsx from "clsx";
import type { Breed } from "types/breed";
import { PlayButton } from "~/components/PlayButton";
import { useTrackPlay } from "~/hooks/useTrackPlay";
import {
  getIllustrations,
  getListenUrl,
  getPrimaryPortrait,
} from "~/utils/breed";
import { formatEpisode, formatTimecode } from "~/utils/format";
import classes from "./PortraitCard.module.css";

interface Props {
  breed: Breed;
}

/**
 * Grid card: the card links to the breed page, the play button (a sibling,
 * never nested) opens the episode at the portrait's timecode.
 */
const PortraitCard = ({ breed }: Props) => {
  const trackPlay = useTrackPlay();
  const name = breed.details.public[0];
  const [illustration] = getIllustrations(breed);
  const portrait = getPrimaryPortrait(breed);
  const listen = portrait && getListenUrl(portrait);
  const timecode = portrait && formatTimecode(portrait.meta.timecode);
  const variantCount = breed.details.isGrouped
    ? (breed.details.variants?.length ?? 0)
    : 0;
  const notPresented = breed.details.isOfficiallyPresented === false;

  const meta = portrait
    ? variantCount > 1
      ? `${variantCount} Varianten · ${formatEpisode(portrait.number)}`
      : `${formatEpisode(portrait.number)} · ab ${timecode}`
    : undefined;

  return (
    <div className={clsx(classes.card, notPresented && classes.notPresented)}>
      <Link
        to={`/rasse/${breed.slug}`}
        state={{ from: "grid" }}
        className={classes.link}
        aria-label={`Details zu ${name}`}
      >
        <span className={classes.frame}>
          <img
            src={illustration.thumbnail}
            alt={illustration.alt}
            className={classes.image}
            loading="lazy"
            decoding="async"
          />
          {notPresented && (
            <span className={classes.badge}>Noch nicht vorgestellt</span>
          )}
        </span>
        <span className={classes.text}>
          <span className={classes.name}>{name}</span>
          {meta && <span className={classes.meta}>{meta}</span>}
        </span>
      </Link>

      {portrait && listen && (
        <div className={classes.overlay}>
          <PlayButton
            size={40}
            href={listen.url}
            label={`${name}: Portrait ab ${timecode} anhören`}
            className={classes.play}
            onClick={(event) => {
              event.stopPropagation();
              trackPlay(breed, portrait, listen, "card");
            }}
          />
        </div>
      )}
    </div>
  );
};

export default memo(PortraitCard);
