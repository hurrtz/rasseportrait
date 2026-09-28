import React, { useState } from "react";
import { Link } from "react-router";
import clsx from "clsx";
import classes from "../Statistics.module.css";

const VISIBLE_ON_MOBILE = 8;

interface Props {
  chips: { label: string; to: string }[];
}

/**
 * Breed chips linking to their pages. Small screens show the first eight
 * and a "+ n weitere" chip that reveals the rest.
 */
const ChipList = ({ chips }: Props) => {
  const [expanded, setExpanded] = useState(false);
  const hidden = chips.length - VISIBLE_ON_MOBILE;

  return (
    <div className={clsx(classes.chips, expanded && classes.expanded)}>
      {chips.map(({ label, to }, index) => (
        <Link
          key={to}
          to={to}
          state={{ from: "statistics" }}
          className={clsx(
            classes.chip,
            index >= VISIBLE_ON_MOBILE && classes.extraChip,
          )}
        >
          {label}
        </Link>
      ))}
      {hidden > 0 && !expanded && (
        <button
          type="button"
          className={clsx(classes.chip, classes.moreChip)}
          aria-expanded={false}
          onClick={() => setExpanded(true)}
        >
          + {hidden} weitere
        </button>
      )}
    </div>
  );
};

export default ChipList;
