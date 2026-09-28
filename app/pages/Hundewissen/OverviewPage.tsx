import React, { useId, useMemo, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router";
import { IconArrowRight, IconChevronRight, IconHeadphones } from "@tabler/icons-react";
import type {
  HundewissenArea,
  HundewissenIndex,
  HundewissenTopicSummary,
} from "types/hundewissen";
import { LoadError } from "~/components/LoadError";
import LoadingSpinner from "~/components/LoadingSpinner";
import { SearchPill } from "~/components/SearchPill";
import { SEARCH_DEBOUNCE_DELAY_MS } from "~/constants";
import { useDebounce } from "~/hooks/useDebounce";
import AreaPicture from "./AreaPicture";
import { episodes, topics as topicsLabel } from "./labels";
import { bySize, useTopicSearch, useTrackTopicSearch } from "./search";
import TopicRow from "./TopicRow";
import { useEnsureHundewissen, type TopicLinkState } from "./useHundewissen";
import shared from "./shared.module.css";
import classes from "./OverviewPage.module.css";

const INTRO =
  "Alles, was im Podcast neben den Rasseportraits besprochen wird: Verhalten, Training, Gesundheit, Zucht und Tierschutz. Jedes Thema führt direkt zur Stelle in der Folge.";

/** Area cards shown in full on small screens; the rest become compact rows */
const MOBILE_CARDS = 3;

/**
 * Grid spans of the area cards: rows of two wide cards (6 of 12 columns) and
 * three narrow ones (4) alternate; a lone card in the last row spans 12, two
 * span 6 each.
 */
export const areaSpans = (count: number) => {
  const spans: number[] = [];
  let wide = true;
  while (spans.length < count) {
    const take = Math.min(wide ? 2 : 3, count - spans.length);
    const span = take === 1 ? 12 : take === 2 ? 6 : 4;
    spans.push(...Array<number>(take).fill(span));
    wide = !wide;
  }
  return spans;
};

const StatusCard = ({ index, topicCount }: { index: HundewissenIndex; topicCount: number }) => {
  const titleId = useId();
  const done = index.indexedEpisodes >= index.totalEpisodes;
  const share = Math.max(3, (index.indexedEpisodes / index.totalEpisodes) * 100);

  return (
    <section aria-labelledby={titleId} className={classes.status}>
      <span id={titleId} className={shared.eyebrow}>
        {done ? "Alle Folgen ausgewertet" : "Stand der Auswertung"}
      </span>
      <div className={classes.statusValue}>
        {index.indexedEpisodes}
        <span className={classes.statusTotal}> von {index.totalEpisodes} Folgen</span>
      </div>
      <div className={classes.bar} aria-hidden>
        <div className={classes.barFill} style={{ width: `${Math.min(100, share)}%` }} />
      </div>
      <span className={classes.statusText}>
        {topicsLabel(topicCount)} in {index.areas.length}{" "}
        {index.areas.length === 1 ? "Bereich" : "Bereichen"}.
        {!done && " Die Sammlung wächst mit jeder ausgewerteten Folge."}
      </span>
    </section>
  );
};

const AreaChips = ({ areas }: { areas: HundewissenArea[] }) => (
  <nav aria-label="Bereiche" className={classes.chips}>
    <Link to="/hundewissen" aria-current="page" className={classes.chip}>
      Alle
    </Link>
    {areas.map((area) => (
      <Link key={area.slug} to={`/hundewissen/${area.slug}`} className={classes.chip}>
        {area.name}
      </Link>
    ))}
  </nav>
);

const Frequent = ({ index }: { index: HundewissenIndex }) => {
  const titleId = useId();
  const top = [...index.topics].sort(bySize).slice(0, 3);
  if (!top.some(({ episodeCount }) => episodeCount > 1)) return null;

  return (
    <section aria-labelledby={titleId} className={classes.section}>
      <h2 id={titleId} className={classes.sectionTitle}>
        Am häufigsten besprochen
      </h2>
      <div className={classes.frequent}>
        {top.map((topic) => (
          <Link
            key={topic.id}
            to={`/hundewissen/${topic.area}/${topic.id}`}
            state={{ from: "frequent" } satisfies TopicLinkState}
            className={classes.frequentCard}
          >
            <span className={classes.frequentText}>
              <span className={classes.frequentArea}>
                {index.areas.find(({ slug }) => slug === topic.area)?.name}
              </span>
              <span className={classes.frequentLabel}>{topic.label}</span>
            </span>
            <span className={classes.frequentFoot}>
              <span className={classes.count}>
                <IconHeadphones size={14} className={classes.countIcon} aria-hidden />
                {episodes(topic.episodeCount)}
              </span>
              <IconArrowRight size={18} className={classes.muted} aria-hidden />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

interface AreaCardProps {
  area: HundewissenArea;
  topics: HundewissenTopicSummary[];
  span: number;
  compact: boolean;
}

const AreaCard = ({ area, topics, span, compact }: AreaCardProps) => {
  const narrow = span === 4;

  return (
    <li className={classes.areaItem} style={{ gridColumn: `span ${span}` }}>
      <Link
        to={`/hundewissen/${area.slug}`}
        className={classes.areaCard}
        data-span={span}
        data-narrow={narrow || undefined}
        data-compact={compact || undefined}
      >
        <AreaPicture area={area} className={classes.areaPicture} iconSize={44} />
        <span className={classes.areaBody}>
          <span className={classes.areaHead}>
            <span className={classes.areaName}>{area.name}</span>
            <span className={classes.areaCount}>{topicsLabel(area.topicCount)}</span>
          </span>
          <ul className={classes.areaTopics}>
            {topics.slice(0, narrow ? 4 : 5).map((topic) => (
              <li key={topic.id} className={classes.areaTopic}>
                <span className={classes.areaTopicLabel}>{topic.label}</span>
                <span
                  className={classes.areaTopicCount}
                  data-many={topic.episodeCount > 1 || undefined}
                >
                  {episodes(topic.episodeCount)}
                </span>
              </li>
            ))}
          </ul>
          <span className={classes.areaMore}>
            {area.topicCount === 1 ? "Zum Thema" : `Alle ${area.topicCount} Themen`}
            <IconArrowRight size={16} aria-hidden />
          </span>
        </span>
        <IconChevronRight size={20} className={classes.compactArrow} aria-hidden />
      </Link>
    </li>
  );
};

const Areas = ({ index }: { index: HundewissenIndex }) => {
  const titleId = useId();
  const spans = areaSpans(index.areas.length);
  const byArea = useMemo(() => {
    const grouped = new Map<string, HundewissenTopicSummary[]>();
    [...index.topics].sort(bySize).forEach((topic) => {
      grouped.set(topic.area, [...(grouped.get(topic.area) ?? []), topic]);
    });
    return grouped;
  }, [index]);

  return (
    <section className={classes.section}>
      <h2 id={titleId} className={classes.sectionTitle}>
        Alle Bereiche
      </h2>
      <ul aria-labelledby={titleId} className={classes.areas}>
        {index.areas.map((area, i) => (
          <AreaCard
            key={area.slug}
            area={area}
            topics={byArea.get(area.slug) ?? []}
            span={spans[i]}
            compact={i >= MOBILE_CARDS}
          />
        ))}
      </ul>
    </section>
  );
};

interface ResultsProps {
  needle: string;
  hits: HundewissenTopicSummary[];
  onReset: () => void;
}

const SearchResults = ({ needle, hits, onReset }: ResultsProps) => {
  const titleId = useId();

  if (!hits.length) {
    return (
      <div className={classes.empty}>
        <p className={classes.emptyTitle}>Kein Thema gefunden</p>
        <p className={classes.emptyText}>
          Für »{needle}« gibt es noch kein Thema. Versuche ein anderes Wort.
        </p>
        <button type="button" className={classes.reset} onClick={onReset}>
          Suche zurücksetzen
        </button>
      </div>
    );
  }

  return (
    <section aria-labelledby={titleId} className={classes.section}>
      <h2 id={titleId} className={classes.sectionTitle}>
        {topicsLabel(hits.length)} für »{needle}«
      </h2>
      <ul aria-labelledby={titleId} className={classes.results}>
        {hits.map((topic) => (
          <TopicRow key={topic.id} topic={topic} from="search" />
        ))}
      </ul>
    </section>
  );
};

const Overview = ({ index }: { index: HundewissenIndex }) => {
  const [query, setQuery] = useState("");
  const needle = useDebounce(query.trim(), SEARCH_DEBOUNCE_DELAY_MS);
  const searchable = useMemo(
    () =>
      index.topics.map((topic) => ({
        ...topic,
        areaName: index.areas.find(({ slug }) => slug === topic.area)?.name,
      })),
    [index],
  );
  const hits = useTopicSearch(searchable, needle);
  useTrackTopicSearch(needle, hits?.length ?? 0);

  return (
    <div className={classes.page}>
      <section className={classes.head}>
        <div className={classes.intro}>
          <h1 className={classes.title}>Hundewissen</h1>
          <p className={classes.lead}>{INTRO}</p>
        </div>
        <StatusCard index={index} topicCount={index.topics.length} />
      </section>

      <div className={classes.tools}>
        <SearchPill
          value={query}
          onChange={setQuery}
          label="Themen durchsuchen"
          placeholder="Thema suchen"
          className={classes.search}
        />
        <AreaChips areas={index.areas} />
      </div>

      {hits ? (
        <SearchResults needle={needle} hits={hits} onReset={() => setQuery("")} />
      ) : (
        <>
          <Frequent index={index} />
          <Areas index={index} />
        </>
      )}
    </div>
  );
};

/** /hundewissen; old links (?topic=<id>) lead to the topic's page */
const OverviewPage = () => {
  const [searchParams] = useSearchParams();
  const { status, index, retry } = useEnsureHundewissen();
  const requested = searchParams.get("topic");

  if (status === "error") {
    return <LoadError title="Hundewissen konnte nicht geladen werden." onRetry={retry} />;
  }
  if (!index) return <LoadingSpinner message="Themen werden geladen …" />;

  if (requested) {
    const topic = index.topics.find(({ id }) => id === requested);
    return (
      <Navigate replace to={topic ? `/hundewissen/${topic.area}/${topic.id}` : "/hundewissen"} />
    );
  }

  return <Overview index={index} />;
};

export default OverviewPage;
