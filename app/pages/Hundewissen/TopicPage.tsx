import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router";
import {
  IconArrowLeft,
  IconArrowRight,
  IconChevronRight,
  IconClock,
  IconHeadphones,
} from "@tabler/icons-react";
import type {
  HundewissenArea,
  HundewissenEntry,
  HundewissenEpisode,
  HundewissenIndex,
  HundewissenTopic,
} from "types/hundewissen";
import { LoadError } from "~/components/LoadError";
import LoadingSpinner from "~/components/LoadingSpinner";
import { PlayButton } from "~/components/PlayButton";
import { SortSegments } from "~/components/SortControl";
import { StickyPlayBar } from "~/components/StickyPlayBar";
import { useAmplitude } from "~/hooks/useAmplitude";
import { formatDateLong, formatEpisode } from "~/utils/format";
import HundewissenNotFound from "./HundewissenNotFound";
import {
  CONTACT,
  count,
  entries as entriesLabel,
  episodes as episodesLabel,
  kindLabel,
  listenLabel,
  providerName,
} from "./labels";
import {
  useEnsureHundewissen,
  useEnsureTopic,
  type TopicLinkState,
} from "./useHundewissen";
import shared from "./shared.module.css";
import classes from "./TopicPage.module.css";

type Placement = "topic-featured" | "topic-entry" | "topic-sticky";
type SortMode = "newest" | "main";

const SORT_OPTIONS: { value: SortMode; label: string }[] = [
  { value: "newest", label: "Neueste" },
  { value: "main", label: "Hauptthema zuerst" },
];

/** Episode cards shown on small screens before "weitere Folgen zeigen" */
const MOBILE_EPISODES = 2;

const entryLength = (entry: HundewissenEntry) =>
  entry.endSeconds - entry.startSeconds;

const longestEntry = (episode: HundewissenEpisode) =>
  Math.max(...episode.entries.map(entryLength));

const hasMain = (episode: HundewissenEpisode) =>
  episode.entries.some(({ weight }) => weight === "main");

/** Newest: as compiled. Main first: episodes with a main entry, by their longest entry */
const sortEpisodes = (episodes: HundewissenEpisode[], mode: SortMode) =>
  mode === "newest"
    ? episodes
    : [...episodes].sort(
        (a, b) =>
          Number(hasMain(b)) - Number(hasMain(a)) ||
          longestEntry(b) - longestEntry(a),
      );

/** "Folge 229 · 1. Oktober 2025" */
const episodeLine = (episode: HundewissenEpisode) =>
  [formatEpisode(episode.number), episode.airDate && formatDateLong(episode.airDate)]
    .filter(Boolean)
    .join(" · ");

/** Paragraphs are separated by blank lines; single line breaks are spaces */
const toParagraphs = (content: string) =>
  content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean);

const useTrackTopicPlay = (topic: HundewissenTopic) => {
  const { track } = useAmplitude();
  return (episode: HundewissenEpisode, entry: HundewissenEntry, placement: Placement) =>
    track("Play Clicked", {
      placement,
      topicId: topic.id,
      episodeId: episode.id,
      provider: entry.listen.provider,
      episodeNumber: episode.number,
      timecode: entry.startSeconds,
    });
};

type TrackPlay = ReturnType<typeof useTrackTopicPlay>;

// ---------------------------------------------------------------------------

const Facts = ({ topic }: { topic: HundewissenTopic }) => (
  <>
    <ul aria-label="Umfang" className={classes.facts}>
      <li className={classes.fact}>
        <span className={classes.factValue}>{topic.episodeCount}</span>{" "}
        {topic.episodeCount === 1 ? "Folge" : "Folgen"}
      </li>
      <li className={classes.fact}>
        <span className={classes.factValue}>{topic.entryCount}</span>{" "}
        {topic.entryCount === 1 ? "Stelle" : "Stellen"}
      </li>
      <li className={classes.fact}>
        <span className={classes.factValue}>{topic.totalMinutes} Min.</span> zum
        Nachhören
      </li>
    </ul>
    <p className={classes.factLine}>
      <b>{episodesLabel(topic.episodeCount)}</b> ·{" "}
      {entriesLabel(topic.entryCount)} · {topic.totalMinutes} Min. zum Nachhören
    </p>
  </>
);

interface FeaturedProps {
  episode: HundewissenEpisode;
  entry: HundewissenEntry;
  onPlay: () => void;
}

const FeaturedPlayer = ({ episode, entry, onPlay }: FeaturedProps) => {
  const labelId = useId();

  return (
    <section aria-labelledby={labelId} className={classes.featured}>
      <span id={labelId} className={`${shared.eyebrow} ${classes.featuredEyebrow}`}>
        Direkt zum Thema
      </span>
      <div className={classes.featuredRow}>
        <PlayButton
          size={56}
          mdSize={72}
          href={entry.listen.url}
          label={listenLabel(entry.start, entry.listen.provider)}
          onClick={onPlay}
        />
        <div className={classes.featuredText}>
          <span className={classes.featuredTitle}>{episode.title}</span>
          <span className={classes.featuredMeta}>{episodeLine(episode)}</span>
        </div>
      </div>
      <div className={classes.chips}>
        <span className={classes.timeChip}>
          <IconClock size={16} className={classes.clock} aria-hidden />
          {entry.start} bis {entry.end}
        </span>
        <span className={classes.provider}>
          <IconHeadphones size={16} aria-hidden />
          {providerName(entry.listen.provider)}
        </span>
      </div>
    </section>
  );
};

const Editorial = ({ topic }: { topic: HundewissenTopic }) => {
  if (!topic.editorial) return null;
  const { content, status } = topic.editorial;

  return (
    <section aria-label="Einordnung" className={classes.editorial}>
      {status === "draft" && (
        <span className={classes.status}>
          <span className={classes.statusDot} aria-hidden />
          Wird gerade recherchiert
        </span>
      )}
      <div className={classes.editorialText}>
        {toParagraphs(content).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
};

interface EpisodeCardProps {
  episode: HundewissenEpisode;
  collapsed: boolean;
  onPlay: (entry: HundewissenEntry) => void;
}

const EpisodeCard = ({ episode, collapsed, onPlay }: EpisodeCardProps) => {
  const titleId = useId();

  return (
    <article
      aria-labelledby={titleId}
      className={classes.episode}
      data-collapsed={collapsed || undefined}
    >
      <div className={classes.episodeHead}>
        <span className={classes.episodeEyebrow}>{episodeLine(episode)}</span>
        <h3 id={titleId} tabIndex={-1} className={classes.episodeTitle}>
          {episode.title}
        </h3>
        <span className={classes.episodeCount}>
          {count(episode.entries.length, "Stelle", "Stellen")} zu diesem Thema
        </span>
      </div>
      {episode.entries.map((entry) => (
        <div key={entry.startSeconds} className={classes.entry}>
          <PlayButton
            size={40}
            href={entry.listen.url}
            label={`Ab ${entry.start} anhören`}
            onClick={() => onPlay(entry)}
          />
          <div className={classes.entryBody}>
            <div className={classes.entryLine}>
              <span className={classes.entryTime}>
                {entry.start}–{entry.end}
              </span>
              <span className={classes.entryMeta}>
                {entry.minutes} Min. · {kindLabel(entry.kind)}
              </span>
              <span
                className={
                  entry.weight === "main" ? classes.tagMain : classes.tagSide
                }
              >
                {entry.weight === "main" ? "Hauptthema" : "Randbemerkung"}
              </span>
            </div>
            <span className={classes.entryLabel}>{entry.label}</span>
            {entry.summaries.map((text) => (
              <p key={text} className={classes.summary}>
                {text}
              </p>
            ))}
          </div>
        </div>
      ))}
    </article>
  );
};

const Entries = ({
  topic,
  trackPlay,
}: {
  topic: HundewissenTopic;
  trackPlay: TrackPlay;
}) => {
  const [sort, setSort] = useState<SortMode>("newest");
  const [expanded, setExpanded] = useState(false);
  const sorted = useMemo(() => sortEpisodes(topic.episodes, sort), [topic, sort]);
  const hidden = expanded ? 0 : Math.max(0, sorted.length - MOBILE_EPISODES);
  const listRef = useRef<HTMLDivElement>(null);
  const focusNew = useRef(false);

  // the button disappears; keyboard users continue at the first new card
  useEffect(() => {
    if (!expanded || !focusNew.current) return;
    focusNew.current = false;
    listRef.current
      ?.querySelectorAll<HTMLElement>("article h3")
      [MOBILE_EPISODES]?.focus();
  }, [expanded]);

  const showAll = () => {
    focusNew.current = true;
    setExpanded(true);
  };

  return (
    <div ref={listRef} className={classes.entries}>
      <div className={classes.entriesHead}>
        <h2 className={classes.sectionTitle}>Alle Stellen im Podcast</h2>
        <SortSegments options={SORT_OPTIONS} value={sort} onChange={setSort} />
      </div>
      {sorted.map((episode, index) => (
        <EpisodeCard
          key={episode.id}
          episode={episode}
          collapsed={!expanded && index >= MOBILE_EPISODES}
          onPlay={(entry) => trackPlay(episode, entry, "topic-entry")}
        />
      ))}
      {hidden > 0 && (
        <button
          type="button"
          className={classes.more}
          onClick={showAll}
        >
          {hidden === 1 ? "1 weitere Folge zeigen" : `${hidden} weitere Folgen zeigen`}
        </button>
      )}
    </div>
  );
};

const Breeds = ({ topic }: { topic: HundewissenTopic }) => {
  const titleId = useId();
  if (!topic.breeds.length) return null;

  return (
    <aside aria-labelledby={titleId} className={classes.breeds}>
      <h2 id={titleId} className={`${shared.eyebrow} ${classes.asideTitle}`}>
        Rassen in diesen Folgen
      </h2>
      {topic.breeds.map((breed) => (
        <Link key={breed.slug} to={`/rasse/${breed.slug}`} className={classes.breed}>
          <img
            src={breed.thumbnail}
            alt=""
            className={classes.breedImage}
            loading="lazy"
            decoding="async"
          />
          <span className={classes.breedText}>
            <span className={classes.breedName}>{breed.name}</span>
            <span className={classes.breedMeta}>
              {breed.relation === "portrait" ? "Rasseportrait in " : "Erwähnt in "}
              {formatEpisode(breed.number)}
            </span>
          </span>
          <IconArrowRight size={18} className={classes.arrow} aria-hidden />
        </Link>
      ))}
    </aside>
  );
};

const Related = ({
  topic,
  index,
}: {
  topic: HundewissenTopic;
  index: HundewissenIndex;
}) => {
  const titleId = useId();
  const { track } = useAmplitude();
  const related = topic.related
    .map((id) => index.topics.find((other) => other.id === id))
    .filter((other) => other !== undefined);
  if (!related.length) return null;

  return (
    <aside aria-labelledby={titleId} className={classes.related}>
      <h2 id={titleId} className={`${shared.eyebrow} ${classes.asideTitle}`}>
        Verwandte Themen
      </h2>
      {related.map((other) => (
        <Link
          key={other.id}
          to={`/hundewissen/${other.area}/${other.id}`}
          state={{ from: "related" } satisfies TopicLinkState}
          className={classes.relatedRow}
          onClick={() =>
            track("Related Topic Clicked", {
              fromTopicId: topic.id,
              toTopicId: other.id,
            })
          }
        >
          <span className={classes.relatedArea}>
            {index.areas.find(({ slug }) => slug === other.area)?.name}
          </span>
          <span className={classes.relatedLabel}>{other.label}</span>
        </Link>
      ))}
    </aside>
  );
};

interface ViewProps {
  topic: HundewissenTopic;
  area: HundewissenArea;
  index: HundewissenIndex;
}

const TopicView = ({ topic, area, index }: ViewProps) => {
  const trackPlay = useTrackTopicPlay(topic);
  const featuredEpisode = topic.episodes[topic.featured.episode];
  const featuredEntry = featuredEpisode.entries[topic.featured.entry];
  const subject = encodeURIComponent(`Hundewissen: ${topic.label}`);

  return (
    <div className={classes.page}>
      <nav aria-label="Brotkrumen" className={classes.crumbs}>
        <Link to="/hundewissen" className={classes.crumb}>
          Hundewissen
        </Link>
        <IconChevronRight size={16} className={classes.crumbIcon} aria-hidden />
        <Link to={`/hundewissen/${area.slug}`} className={classes.crumb}>
          {area.name}
        </Link>
        <IconChevronRight size={16} className={classes.crumbIcon} aria-hidden />
        <span aria-current="page">{topic.label}</span>
      </nav>
      <div className={classes.back}>
        <Link to={`/hundewissen/${area.slug}`} className={shared.backLink}>
          <IconArrowLeft size={18} aria-hidden />
          {area.name}
        </Link>
      </div>

      <section className={classes.head}>
        <div className={classes.intro}>
          <span className={shared.eyebrow}>{area.name} · Thema</span>
          <h1 className={classes.title}>{topic.label}</h1>
          {topic.description && (
            <p className={classes.description}>{topic.description}</p>
          )}
          <Facts topic={topic} />
        </div>
        <FeaturedPlayer
          episode={featuredEpisode}
          entry={featuredEntry}
          onPlay={() => trackPlay(featuredEpisode, featuredEntry, "topic-featured")}
        />
      </section>

      <Editorial topic={topic} />

      <div className={classes.body}>
        <Entries topic={topic} trackPlay={trackPlay} />
        <div className={classes.sidebar}>
          <Breeds topic={topic} />
          <Related topic={topic} index={index} />
        </div>
        <p className={classes.note}>
          Stellen und Zusammenfassungen werden aus den Transkripten der Folgen
          erstellt und können Fehler enthalten. Stimmt etwas nicht? Schreib an{" "}
          <a href={`mailto:${CONTACT}?subject=${subject}`}>{CONTACT}</a>.
        </p>
      </div>

      <StickyPlayBar
        href={featuredEntry.listen.url}
        title={`Ab ${featuredEntry.start} anhören`}
        meta={`${providerName(featuredEntry.listen.provider)} · ${formatEpisode(featuredEpisode.number)}`}
        onPlay={() => trackPlay(featuredEpisode, featuredEntry, "topic-sticky")}
      />
    </div>
  );
};

/** Loads the topic file, then renders it */
const TopicContent = ({ id, area, index }: { id: string } & Omit<ViewProps, "topic">) => {
  const { state, retry } = useEnsureTopic(id);
  const location = useLocation();
  const { track } = useAmplitude();
  const referrer = (location.state as TopicLinkState | null)?.from ?? "direct";

  useEffect(() => {
    track("Hundewissen Topic Viewed", { topicId: id, area: area.slug, referrer });
    // once per topic; the referrer belongs to the navigation that led here
  }, [id]);

  if (state?.status === "error") {
    return <LoadError title="Das Thema konnte nicht geladen werden." onRetry={retry} />;
  }
  if (state?.status !== "ready") {
    return <LoadingSpinner message="Thema wird geladen …" />;
  }
  return <TopicView topic={state.topic} area={area} index={index} />;
};

/** /hundewissen/:area/:topic */
const TopicPage = () => {
  const params = useParams();
  const location = useLocation();
  const { status, index, retry } = useEnsureHundewissen();

  if (status === "error") {
    return <LoadError title="Hundewissen konnte nicht geladen werden." onRetry={retry} />;
  }
  if (!index) return <LoadingSpinner message="Thema wird geladen …" />;

  const summary = index.topics.find(({ id }) => id === params.topic);
  const area = index.areas.find(({ slug }) => slug === summary?.area);
  if (!summary || !area) return <HundewissenNotFound title="Thema nicht gefunden" />;

  // a re-build may move a topic to another area
  if (summary.area !== params.area) {
    return (
      <Navigate
        replace
        to={`/hundewissen/${summary.area}/${summary.id}`}
        state={location.state}
      />
    );
  }

  return <TopicContent key={summary.id} id={summary.id} area={area} index={index} />;
};

export default TopicPage;
