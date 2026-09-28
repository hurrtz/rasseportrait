import React, { useEffect, useId, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { IconArrowLeft } from "@tabler/icons-react";
import type { HundewissenArea, HundewissenIndex } from "types/hundewissen";
import { LoadError } from "~/components/LoadError";
import LoadingSpinner from "~/components/LoadingSpinner";
import { SearchPill } from "~/components/SearchPill";
import { SEARCH_DEBOUNCE_DELAY_MS } from "~/constants";
import { useAmplitude } from "~/hooks/useAmplitude";
import { useDebounce } from "~/hooks/useDebounce";
import AreaPicture from "./AreaPicture";
import HundewissenNotFound from "./HundewissenNotFound";
import { topics as topicsLabel } from "./labels";
import { byEpisodes, useTopicSearch, useTrackTopicSearch } from "./search";
import TopicRow from "./TopicRow";
import { useEnsureHundewissen } from "./useHundewissen";
import shared from "./shared.module.css";
import classes from "./AreaPage.module.css";

/** Rows shown before "Weitere {n} Themen zeigen"; longer lists get a search */
const VISIBLE_TOPICS = 30;

const OtherAreas = ({
  area,
  index,
}: {
  area: HundewissenArea;
  index: HundewissenIndex;
}) => {
  const titleId = useId();
  const others = index.areas.filter(({ slug }) => slug !== area.slug);
  if (!others.length) return null;

  return (
    <aside aria-labelledby={titleId} className={classes.others}>
      <h2 id={titleId} className={`${shared.eyebrow} ${classes.othersTitle}`}>
        Andere Bereiche
      </h2>
      {others.map((other) => (
        <Link
          key={other.slug}
          to={`/hundewissen/${other.slug}`}
          className={classes.other}
        >
          <AreaPicture
            area={other}
            className={classes.otherIcon}
            iconSize={20}
            thumbnail
            decorative
          />
          <span className={classes.otherText}>
            <span className={classes.otherName}>{other.name}</span>
            <span className={classes.otherCount}>
              {topicsLabel(other.topicCount)}
            </span>
          </span>
        </Link>
      ))}
    </aside>
  );
};

const AreaView = ({
  area,
  index,
}: {
  area: HundewissenArea;
  index: HundewissenIndex;
}) => {
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const needle = useDebounce(query.trim(), SEARCH_DEBOUNCE_DELAY_MS);
  const topics = useMemo(
    () =>
      index.topics.filter((topic) => topic.area === area.slug).sort(byEpisodes),
    [index, area],
  );
  const hits = useTopicSearch(topics, needle);
  useTrackTopicSearch(needle, hits?.length ?? 0);
  const searchable = topics.length > VISIBLE_TOPICS;
  const shown = hits ?? (showAll ? topics : topics.slice(0, VISIBLE_TOPICS));
  const rest = topics.length - shown.length;

  return (
    <div className={classes.page}>
      <div className={classes.back}>
        <Link to="/hundewissen" className={shared.backLink}>
          <IconArrowLeft size={18} aria-hidden />
          Alle Bereiche
        </Link>
      </div>

      <section className={classes.head}>
        <div className={classes.picture}>
          <AreaPicture area={area} className={classes.image} iconSize={44} />
          <Link
            to="/hundewissen"
            aria-label="Zurück zu allen Bereichen"
            className={classes.backCircle}
          >
            <IconArrowLeft size={20} aria-hidden />
          </Link>
        </div>
        <div className={classes.intro}>
          <span className={shared.eyebrow}>Hundewissen · Bereich</span>
          <h1 className={classes.title}>{area.name}</h1>
          <p className={classes.lead}>
            {topicsLabel(topics.length)} aus {index.indexedEpisodes}{" "}
            ausgewerteten Folgen, sortiert danach, wie oft sie vorkamen.
          </p>
        </div>
      </section>

      <div className={classes.body}>
        <div className={classes.list}>
          {searchable && (
            <SearchPill
              value={query}
              onChange={setQuery}
              label={`In ${area.name} suchen`}
              placeholder={`In ${area.name} suchen`}
              className={classes.search}
            />
          )}
          {hits && !hits.length ? (
            <p className={classes.empty}>Kein Thema gefunden</p>
          ) : (
            <ul aria-label="Themen" className={classes.rows}>
              {shown.map((topic) => (
                <TopicRow
                  key={topic.id}
                  topic={topic}
                  from={hits ? "search" : "area"}
                />
              ))}
            </ul>
          )}
          {!hits && rest > 0 && (
            <button
              type="button"
              className={classes.more}
              onClick={() => setShowAll(true)}
            >
              Weitere {rest} {rest === 1 ? "Thema" : "Themen"} zeigen
            </button>
          )}
        </div>
        <OtherAreas area={area} index={index} />
      </div>
    </div>
  );
};

const TrackedArea = ({
  area,
  index,
}: {
  area: HundewissenArea;
  index: HundewissenIndex;
}) => {
  const { track } = useAmplitude();

  useEffect(() => {
    track("Hundewissen Area Viewed", { area: area.slug });
  }, [track, area.slug]);

  return <AreaView key={area.slug} area={area} index={index} />;
};

/** /hundewissen/:area */
const AreaPage = () => {
  const params = useParams();
  const { status, index, retry } = useEnsureHundewissen();

  if (status === "error") {
    return (
      <LoadError
        title="Hundewissen konnte nicht geladen werden."
        onRetry={retry}
      />
    );
  }
  if (!index) return <LoadingSpinner message="Themen werden geladen …" />;

  const area = index.areas.find(({ slug }) => slug === params.area);
  if (!area) return <HundewissenNotFound title="Bereich nicht gefunden" />;

  return <TrackedArea area={area} index={index} />;
};

export default AreaPage;
