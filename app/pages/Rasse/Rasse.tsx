import React, { useEffect, useId, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import clsx from "clsx";
import { IconArrowLeft, IconHeart } from "@tabler/icons-react";
import type { Breed } from "types/breed";
import { EpisodeRow } from "~/components/EpisodeRow";
import { LinkPill } from "~/components/LinkPill";
import { LoadError } from "~/components/LoadError";
import LoadingSpinner from "~/components/LoadingSpinner";
import { LOADING_MESSAGE } from "~/constants";
import { useAmplitude } from "~/hooks/useAmplitude";
import { useEnsureBreeds } from "~/hooks/useEnsureBreeds";
import { useTrackPlay } from "~/hooks/useTrackPlay";
import { useAllBreeds, useBreedActions, useBreedBySlug } from "~/stores/breeds";
import { getBreedView, getRelatedBreeds } from "~/utils/breed";
import { formatDateLong, formatEpisode } from "~/utils/format";
import FactTiles from "./components/FactTiles";
import PlayerCard from "./components/PlayerCard";
import RelatedBreeds from "./components/RelatedBreeds";
import StickyPlayer from "./components/StickyPlayer";
import classes from "./Rasse.module.css";

type Referrer = "grid" | "hero" | "related" | "statistics" | "direct";

const useReferrer = (): Referrer => {
  const { state } = useLocation();
  return (state as { from?: Referrer } | null)?.from ?? "direct";
};

/**
 * Back to the overview: history back when we came from it (keeps search,
 * sort and scroll), else a fresh overview.
 */
const BackLinks = () => {
  const navigate = useNavigate();
  const referrer = useReferrer();
  const onClick = (event: React.MouseEvent) => {
    if (referrer === "grid" || referrer === "hero") {
      event.preventDefault();
      navigate(-1);
    }
  };

  return (
    <>
      <Link to="/" className={classes.backPill} onClick={onClick}>
        <IconArrowLeft size={18} aria-hidden />
        Alle Portraits
      </Link>
      <Link
        to="/"
        className={classes.backCircle}
        aria-label="Zurück zu allen Portraits"
        onClick={onClick}
      >
        <IconArrowLeft size={20} aria-hidden />
      </Link>
    </>
  );
};

const BreedPage = ({ breed }: { breed: Breed }) => {
  const breeds = useAllBreeds();
  const referrer = useReferrer();
  const { track } = useAmplitude();
  const trackPlay = useTrackPlay();
  const moreTitleId = useId();
  const [variantIndex, setVariantIndex] = useState(0);
  const view = getBreedView(breed, variantIndex);
  const { name, primary, listen, fci, group } = view;
  const notPresented = breed.details.isOfficiallyPresented === false;

  const related = useMemo(
    () => (fci ? getRelatedBreeds(breeds, breed, fci.group) : []),
    [breeds, breed, fci],
  );

  useEffect(() => {
    track("Breed Page Viewed", {
      breedId: String(breed.id),
      breedName: breed.details.public[0],
      slug: breed.slug,
      referrer,
    });
    // once per breed page, not again when the variant changes
  }, [breed.id]);

  const selectVariant = (index: number) => {
    setVariantIndex(index);
    track("Variant Selected", {
      breedId: String(breed.id),
      variantName: view.variants[index],
      index,
    });
  };

  return (
    <div className={classes.page}>
      <div className={clsx(classes.media, notPresented && classes.grayscale)}>
        <img
          src={view.illustration.full}
          alt={view.illustration.alt}
          className={classes.image}
          fetchPriority="high"
          decoding="async"
        />
        <BackLinks />
      </div>

      <article className={classes.content}>
        <header className={classes.head}>
          {notPresented && (
            <span className={classes.notPresented}>
              Noch nicht offiziell vorgestellt
            </span>
          )}
          {primary && (
            <>
              <span className={clsx(classes.eyebrow, classes.desktopOnly)}>
                {primary.meta.public} · {formatEpisode(primary.number)}
              </span>
              <span className={clsx(classes.eyebrow, classes.mobileOnly)}>
                {formatEpisode(primary.number)} ·{" "}
                {formatDateLong(primary.meta.airDate)}
              </span>
            </>
          )}
          <h1 className={classes.name}>{name}</h1>
          {primary && (
            <span className={clsx(classes.from, classes.mobileOnly)}>
              aus »{primary.episode}«
            </span>
          )}
          {view.variants.length > 0 && (
            <div
              className={classes.variants}
              role="group"
              aria-label="Varianten"
            >
              {view.variants.map((variant, index) => (
                <button
                  key={variant}
                  type="button"
                  className={classes.variant}
                  aria-pressed={index === variantIndex}
                  onClick={() => selectVariant(index)}
                >
                  {variant}
                </button>
              ))}
            </div>
          )}
        </header>

        {primary && (
          <PlayerCard
            podcast={primary}
            listen={listen}
            onPlay={() => listen && trackPlay(breed, primary, listen, "detail")}
          />
        )}

        {view.others.length > 0 && (
          <section className={classes.more} aria-labelledby={moreTitleId}>
            <h2 id={moreTitleId} className={classes.sectionTitle}>
              Weitere Folgen mit dieser Rasse
            </h2>
            <ul className={classes.rows}>
              {view.others.map((podcast) => (
                <EpisodeRow
                  key={`${podcast.number}-${podcast.meta.timecode}`}
                  podcast={podcast}
                  onPlay={(target) => trackPlay(breed, podcast, target, "more")}
                />
              ))}
            </ul>
          </section>
        )}

        <FactTiles view={view} />

        {view.links.length > 0 && (
          <div className={classes.links}>
            {view.links.map(({ name: linkName, url }) => (
              <LinkPill
                key={url}
                href={url}
                onClick={() =>
                  track("Further Reading Link Clicked", {
                    breedId: String(breed.id),
                    breedName: name,
                    linkName,
                    linkUrl: url,
                    currentVariant: view.variantName,
                  })
                }
              >
                {linkName}
              </LinkPill>
            ))}
          </div>
        )}

        {group && related.length > 0 && (
          <RelatedBreeds
            group={group}
            breeds={related}
            onSelect={(to) =>
              track("Related Breed Clicked", {
                fromBreedId: String(breed.id),
                toBreedId: String(to.id),
              })
            }
          />
        )}

        {breed.recognitions?.length ? (
          <p className={classes.recognitions}>
            <IconHeart size={16} className={classes.heart} aria-hidden />
            <span>{breed.recognitions.join(" · ")}</span>
          </p>
        ) : null}
      </article>

      {primary && listen && (
        <StickyPlayer
          podcast={primary}
          listen={listen}
          onPlay={() => trackPlay(breed, primary, listen, "sticky")}
        />
      )}
    </div>
  );
};

const NotFound = () => (
  <div className={classes.notFound}>
    <h1 className={classes.notFoundTitle}>Rasse nicht gefunden</h1>
    <p className={classes.notFoundText}>
      Unter dieser Adresse gibt es kein Portrait.
    </p>
    <Link to="/" className={classes.backPillStatic}>
      <IconArrowLeft size={18} aria-hidden />
      Alle Portraits
    </Link>
  </div>
);

const Rasse = () => {
  const { slug } = useParams();
  const status = useEnsureBreeds();
  const breed = useBreedBySlug(slug);
  const { initialize } = useBreedActions();

  if (status === "error") {
    return (
      <LoadError
        title="Die Rasse konnte nicht geladen werden."
        onRetry={initialize}
      />
    );
  }
  if (status !== "ready") return <LoadingSpinner message={LOADING_MESSAGE} />;
  if (!breed) return <NotFound />;

  return <BreedPage key={breed.id} breed={breed} />;
};

export default Rasse;
