import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { IconHeadphones } from "@tabler/icons-react";
import type { EpisodeHit } from "types/hundewissen-search";
import { useAmplitude } from "~/hooks/useAmplitude";
import { formatDateLong, formatEpisode, formatTimecode } from "~/utils/format";
import {
  audioAt,
  excerptParts,
  searchTranscripts,
  type TranscriptSearchResult,
} from "./transcriptSearch";
import { resolveSearchQuery } from "./searchAliases";
import classes from "./TranscriptResults.module.css";

const PAGE_SIZE = 6;

const EpisodeResult = ({
  hit,
  query,
  position,
}: {
  hit: EpisodeHit;
  query: string;
  position: number;
}) => {
  const { track } = useAmplitude();
  const [expanded, setExpanded] = useState(false);
  const { episode, passages } = hit;
  const visible = expanded ? passages : passages.slice(0, 3);
  return (
    <article className={classes.episode}>
      <p className={classes.meta}>
        {formatEpisode(episode.number)}
        {episode.published && ` · ${formatDateLong(episode.published)}`}
      </p>
      <h3 className={classes.title}>{episode.title}</h3>
      <ul
        className={classes.passages}
        aria-label={`Fundstellen in ${episode.title}`}
      >
        {visible.map((passage) => (
          <li key={passage.start} className={classes.passage}>
            <a
              className={classes.listen}
              href={audioAt(episode.audioUrl, passage.start)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${episode.title} ab ${formatTimecode(passage.start)} anhören`}
              onClick={() =>
                track("Hundewissen Search Result Played", {
                  searchTerm: query,
                  episodeId: episode.id,
                  timecode: passage.start,
                  position,
                })
              }
            >
              <IconHeadphones size={17} aria-hidden />
              {formatTimecode(passage.start)}–{formatTimecode(passage.end)}
              <span>Anhören</span>
            </a>
            <span className={classes.source}>
              {passage.summary ? "Zusammenfassung" : "Aus dem Transkript"}
            </span>
            <p className={classes.excerpt}>
              {excerptParts(passage.excerpt, query, passage.start).map(
                (part, i) =>
                  part.highlight ? (
                    <mark key={i}>{part.text}</mark>
                  ) : (
                    <React.Fragment key={i}>{part.text}</React.Fragment>
                  ),
              )}
            </p>
            {passage.topics.length > 0 && (
              <div className={classes.topics}>
                {passage.topics.slice(0, 3).map((topic) => (
                  <Link
                    key={topic.id}
                    to={`/hundewissen/${topic.area}/${topic.id}`}
                    state={{ from: "search" }}
                  >
                    {topic.label}
                  </Link>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
      {!expanded && passages.length > visible.length && (
        <button
          className={classes.more}
          type="button"
          onClick={() => setExpanded(true)}
        >
          {passages.length - visible.length}{" "}
          {passages.length - visible.length === 1
            ? "weitere Fundstelle"
            : "weitere Fundstellen"}{" "}
          in dieser Folge
        </button>
      )}
    </article>
  );
};

/** Mounted only for a nonempty debounced query: browsing never loads Pagefind. */
const TranscriptResults = ({ query }: { query: string }) => {
  const { track } = useAmplitude();
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<{
    query: string;
    status: "loading" | "ready" | "error";
    result?: TranscriptSearchResult;
    hits: EpisodeHit[];
  }>({ query, status: "loading", hits: [] });
  const [more, setMore] = useState<"idle" | "loading" | "error">("idle");
  const generation = useRef(0);

  useEffect(() => {
    const current = ++generation.current;
    setMore("idle");
    setState({ query, status: "loading", hits: [] });
    if (query.length < 2) return;
    searchTranscripts(query)
      .then(async (result) => {
        const hits = await result.load(0, PAGE_SIZE);
        if (generation.current !== current) return;
        setState({ query, status: "ready", result, hits });
        track("Hundewissen Full Text Search Performed", {
          searchTerm: query,
          resultsCount: result.count,
        });
      })
      .catch(() => {
        if (generation.current === current)
          setState({ query, status: "error", hits: [] });
      });
    return () => {
      generation.current++;
    };
  }, [query, attempt, track]);

  const loadMore = async () => {
    if (!state.result || more === "loading") return;
    const current = generation.current;
    setMore("loading");
    try {
      const hits = await state.result.load(state.hits.length, PAGE_SIZE);
      if (generation.current !== current) return;
      setState((previous) => ({
        ...previous,
        hits: [...previous.hits, ...hits],
      }));
      setMore("idle");
    } catch {
      if (generation.current === current) setMore("error");
    }
  };

  const aliases = resolveSearchQuery(query).aliases;
  return (
    <section className={classes.results} aria-label="Fundstellen in den Folgen">
      <div aria-live="polite" role="status">
        {query.length < 2 ? (
          <p>Gib mindestens zwei Zeichen ein.</p>
        ) : state.query !== query || state.status === "loading" ? (
          <p>Folgen werden durchsucht …</p>
        ) : state.status === "error" ? (
          <div>
            <p>Die Suche konnte nicht geladen werden.</p>
            <button
              className={classes.more}
              onClick={() => setAttempt((n) => n + 1)}
            >
              Erneut versuchen
            </button>
          </div>
        ) : (
          <>
            <h2 className={classes.heading}>
              {state.result?.count === 0
                ? "Keine Fundstellen"
                : `${state.result?.count} ${state.result?.count === 1 ? "Folge" : "Folgen"}`}{" "}
              für »{query}«
            </h2>
            {aliases.length > 0 && (
              <p className={classes.hint}>
                Auch gesucht: {aliases.map(({ label }) => label).join(", ")} und
                weitere Schreibweisen.
              </p>
            )}
            {state.result?.count === 0 && (
              <p>
                Versuche einen anderen Begriff oder eine kürzere Suchanfrage.
              </p>
            )}
          </>
        )}
      </div>
      {state.query === query && state.status === "ready" && (
        <>
          {state.hits.map((hit, i) => (
            <EpisodeResult
              key={`${query}-${hit.episode.id}`}
              hit={hit}
              query={query}
              position={i + 1}
            />
          ))}
          {state.hits.length < (state.result?.count ?? 0) && (
            <button
              className={classes.more}
              onClick={loadMore}
              disabled={more === "loading"}
            >
              {more === "loading"
                ? "Weitere Folgen werden geladen …"
                : more === "error"
                  ? "Laden fehlgeschlagen · Erneut versuchen"
                  : "Weitere Folgen zeigen"}
            </button>
          )}
          <p className={classes.hint}>
            Die Suche umfasst auch kurze Erwähnungen und Wiederholungen.
            Transkripte und Zeitangaben können Fehler enthalten.
          </p>
        </>
      )}
    </section>
  );
};

export default TranscriptResults;
