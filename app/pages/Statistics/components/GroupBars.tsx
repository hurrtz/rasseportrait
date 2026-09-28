import React from "react";
import { fciGroupLabel } from "~/utils/breed";
import ProgressBar from "./ProgressBar";
import classes from "../Statistics.module.css";

interface Props {
  groups: { group: number; count: number }[];
}

/** One row per FCI group: numeral, name, bar relative to the largest group */
const GroupBars = ({ groups }: Props) => {
  const max = Math.max(1, ...groups.map(({ count }) => count));

  return (
    <ol className={classes.groups}>
      {groups.map(({ group, count }) => {
        const label = fciGroupLabel(group)!;
        return (
          <li key={group} className={classes.groupRow}>
            <span className="rp-visually-hidden">
              Gruppe {label.roman}, {label.long}: {count}
            </span>
            <span className={classes.groupRoman} aria-hidden>
              {label.roman}
            </span>
            <span className={classes.groupName} aria-hidden>
              <span className={classes.groupLong}>{label.long}</span>
              <span className={classes.groupShort}>{label.short}</span>
            </span>
            <ProgressBar value={(count / max) * 100} className={classes.thin} />
            <span className={classes.groupCount} aria-hidden>
              {count}
            </span>
          </li>
        );
      })}
    </ol>
  );
};

export default GroupBars;
