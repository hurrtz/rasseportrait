import React, { useId } from "react";
import { Link } from "react-router";
import type { Breed } from "types/breed";
import {
  getIllustrations,
  getPrimaryPortrait,
  type FciGroupLabel,
} from "~/utils/breed";
import { formatEpisode, formatTimecode } from "~/utils/format";
import classes from "../Rasse.module.css";

interface Props {
  group: FciGroupLabel;
  breeds: Breed[];
  onSelect: (breed: Breed) => void;
}

/** "Auch aus Gruppe I": the newest other breeds of the FCI group */
const RelatedBreeds = ({ group, breeds, onSelect }: Props) => {
  const titleId = useId();

  return (
    <section className={classes.related} aria-labelledby={titleId}>
      <h2 id={titleId} className={classes.sectionTitle}>
        Auch aus Gruppe {group.roman}
      </h2>
      <ul className={classes.rows}>
        {breeds.map((breed) => {
          const [illustration] = getIllustrations(breed);
          const portrait = getPrimaryPortrait(breed);
          return (
            <li key={breed.id}>
              <Link
                to={`/rasse/${breed.slug}`}
                state={{ from: "related" }}
                className={classes.relatedRow}
                onClick={() => onSelect(breed)}
              >
                <img
                  src={illustration.thumbnail}
                  alt=""
                  className={classes.relatedThumb}
                  loading="lazy"
                  decoding="async"
                />
                <span className={classes.relatedText}>
                  <span className={classes.relatedName}>
                    {breed.details.public[0]}
                  </span>
                  {portrait && (
                    <span className={classes.relatedMeta}>
                      {formatEpisode(portrait.number)} · ab{" "}
                      {formatTimecode(portrait.meta.timecode)}
                    </span>
                  )}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default RelatedBreeds;
