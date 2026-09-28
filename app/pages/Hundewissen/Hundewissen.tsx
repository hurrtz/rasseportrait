import React, { useEffect, useId, useRef } from "react";
import { Link, useSearchParams } from "react-router";
import { IconArrowRight, IconHeadphones } from "@tabler/icons-react";
import type { KnowledgeTopic } from "types/knowledge";
import { EpisodeRow } from "~/components/EpisodeRow";
import { LinkPill } from "~/components/LinkPill";
import { LoadError } from "~/components/LoadError";
import LoadingSpinner from "~/components/LoadingSpinner";
import { useAmplitude } from "~/hooks/useAmplitude";
import {
  useKnowledgeActions,
  useKnowledgeStatus,
  useKnowledgeTopics,
} from "~/stores/knowledge";
import classes from "./Hundewissen.module.css";

const CONTACT = "rasseportrait@tobiaswinkler.berlin";

/**
 * Paragraphs are separated by blank lines; the source files wrap lines at
 * ~100 characters, so single line breaks are just spaces
 */
const toParagraphs = (content: string) =>
  content
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean);

const StatusPill = () => (
  <span className={classes.status}>
    <span className={classes.statusDot} aria-hidden />
    Wird gerade recherchiert
  </span>
);

const EmptyEpisodes = () => (
  <div className={classes.empty}>
    <span className={classes.emptyIcon} aria-hidden>
      <IconHeadphones size={22} />
    </span>
    <span className={classes.emptyText}>
      <span className={classes.emptyTitle}>Noch keine Folgen verknüpft</span>
      <span className={classes.emptyHint}>
        Kennst du eine Stelle im Podcast zu diesem Thema? Schreib an{" "}
        <a href={`mailto:${CONTACT}`} className={classes.mail}>
          {CONTACT}
        </a>
        .
      </span>
    </span>
  </div>
);

interface TopicListProps {
  topics: KnowledgeTopic[];
  activeId: string;
  onSelect: (topic: KnowledgeTopic) => void;
}

/** Topic list from md, a scrollable row of pills below */
const TopicList = ({ topics, activeId, onSelect }: TopicListProps) => {
  const navRef = useRef<HTMLElement>(null);
  const activeRef = useRef<HTMLAnchorElement>(null);

  // keep the active pill visible in the horizontal row on small screens
  useEffect(() => {
    const nav = navRef.current;
    const active = activeRef.current;
    if (!nav || !active || nav.scrollWidth <= nav.clientWidth) return;
    nav.scrollTo?.({
      left: active.offsetLeft - (nav.clientWidth - active.clientWidth) / 2,
      behavior: "smooth",
    });
  }, [activeId]);

  return (
    <nav ref={navRef} aria-label="Themen" className={classes.topics}>
      {topics.map((topic) => {
        const active = topic.id === activeId;
        return (
          <Link
            key={topic.id}
            ref={active ? activeRef : undefined}
            to={{ search: `?topic=${topic.id}` }}
            replace
            preventScrollReset
            className={classes.topic}
            aria-current={active ? "page" : undefined}
            onClick={() => onSelect(topic)}
          >
            <span className={classes.topicTitle}>
              {topic.title.public}
              <IconArrowRight
                size={18}
                className={classes.topicArrow}
                aria-hidden
              />
            </span>
            <span className={classes.topicSummary}>{topic.summary}</span>
          </Link>
        );
      })}
    </nav>
  );
};

const TopicArticle = ({
  topic,
  position,
  count,
}: {
  topic: KnowledgeTopic;
  position: number;
  count: number;
}) => {
  const { track } = useAmplitude();
  const titleId = useId();
  const episodesId = useId();

  return (
    <article className={classes.article} aria-labelledby={titleId}>
      <div className={classes.articleHead}>
        <span className={classes.eyebrow}>
          Thema {position} von {count}
        </span>
        {topic.status === "draft" && <StatusPill />}
      </div>
      <h2 id={titleId} className={classes.articleTitle}>
        {topic.title.public}
      </h2>
      <div className={classes.text}>
        {toParagraphs(topic.content).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {topic.podcast.length ? (
        <section className={classes.episodes} aria-labelledby={episodesId}>
          <h3 id={episodesId} className={classes.sectionTitle}>
            Folgen zu diesem Thema
          </h3>
          <ul className={classes.rows}>
            {topic.podcast.map((podcast) => (
              <EpisodeRow
                key={`${podcast.number}-${podcast.meta.timecode}`}
                podcast={podcast}
                onPlay={({ url }) =>
                  track("Knowledge Podcast Link Clicked", {
                    topicId: topic.id,
                    topicTitle: topic.title.public,
                    episodeNumber: String(podcast.number),
                    url,
                  })
                }
              />
            ))}
          </ul>
        </section>
      ) : (
        <EmptyEpisodes />
      )}

      {topic.furtherReading.length > 0 && (
        <div className={classes.links}>
          {topic.furtherReading.map(({ name, url }) => (
            <LinkPill
              key={url}
              href={url}
              onClick={() =>
                track("Knowledge Further Reading Clicked", {
                  topicId: topic.id,
                  topicTitle: topic.title.public,
                  linkName: name,
                  url,
                })
              }
            >
              {name}
            </LinkPill>
          ))}
        </div>
      )}
    </article>
  );
};

const HundewissenContent = ({ topics }: { topics: KnowledgeTopic[] }) => {
  const [searchParams] = useSearchParams();
  const { track } = useAmplitude();
  const requested = searchParams.get("topic");
  const topic = topics.find(({ id }) => id === requested) ?? topics[0];

  return (
    <div className={classes.layout}>
      <TopicList
        topics={topics}
        activeId={topic.id}
        onSelect={(selected) =>
          track("Knowledge Topic Selected", {
            topicId: selected.id,
            topicTitle: selected.title.public,
            hasPodcastEpisodes: selected.podcast.length > 0,
            episodeCount: selected.podcast.length,
          })
        }
      />
      <TopicArticle
        key={topic.id}
        topic={topic}
        position={topics.indexOf(topic) + 1}
        count={topics.length}
      />
    </div>
  );
};

const Hundewissen = () => {
  const status = useKnowledgeStatus();
  const topics = useKnowledgeTopics();
  const { initialize } = useKnowledgeActions();

  useEffect(() => {
    if (status === "idle") initialize();
  }, [status, initialize]);

  return (
    <div className={classes.page}>
      <header className={classes.head}>
        <h1 className={classes.title}>Hundewissen</h1>
        <p className={classes.intro}>
          Hintergründe zu Themen, die im Podcast immer wieder vorkommen.
        </p>
      </header>

      {status === "error" ? (
        <LoadError
          title="Die Themen konnten nicht geladen werden."
          onRetry={initialize}
        />
      ) : status === "ready" && topics.length ? (
        <HundewissenContent topics={topics} />
      ) : (
        <LoadingSpinner message="Themen werden geladen …" />
      )}
    </div>
  );
};

export default Hundewissen;
