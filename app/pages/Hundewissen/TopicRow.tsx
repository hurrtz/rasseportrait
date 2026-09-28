import React from "react";
import { Link } from "react-router";
import { IconArrowRight, IconHeadphones } from "@tabler/icons-react";
import type { HundewissenTopicSummary } from "types/hundewissen";
import { episodes } from "./labels";
import type { TopicLinkState } from "./useHundewissen";
import classes from "./TopicRow.module.css";

interface Props {
  topic: HundewissenTopicSummary;
  from: TopicLinkState["from"];
}

/** One topic as a card row: label, episode count, arrow */
const TopicRow = ({ topic, from }: Props) => (
  <li>
    <Link
      to={`/hundewissen/${topic.area}/${topic.id}`}
      state={{ from } satisfies TopicLinkState}
      className={classes.row}
    >
      <span className={classes.label}>{topic.label}</span>
      <span className={classes.meta}>
        <span
          className={classes.count}
          data-accent={topic.episodeCount > 1 || undefined}
        >
          <IconHeadphones size={14} className={classes.countIcon} aria-hidden />
          {episodes(topic.episodeCount)}
        </span>
        <IconArrowRight size={18} className={classes.arrow} aria-hidden />
      </span>
    </Link>
  </li>
);

export default TopicRow;
