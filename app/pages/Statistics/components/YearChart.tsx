import React, { type CSSProperties } from "react";
import clsx from "clsx";
import classes from "../Statistics.module.css";

interface Props {
  years: { year: number; count: number }[];
}

/**
 * Portraits per year: vertical bars from md, horizontal rows below. The
 * last year is still running and drawn dashed.
 */
const YearChart = ({ years }: Props) => {
  const max = Math.max(1, ...years.map(({ count }) => count));

  return (
    <ol className={classes.years}>
      {years.map(({ year, count }, index) => (
        <li
          key={year}
          className={clsx(
            classes.year,
            index === years.length - 1 && classes.running,
          )}
          style={{ "--share": count / max } as CSSProperties}
        >
          <span className="rp-visually-hidden">
            {year}: {count} {count === 1 ? "Portrait" : "Portraits"}
          </span>
          <span className={classes.yearValue} aria-hidden>
            {count}
          </span>
          <span className={classes.yearTrack} aria-hidden>
            <span className={classes.yearBar} />
          </span>
          <span className={classes.yearLabel} aria-hidden>
            {year}
          </span>
        </li>
      ))}
    </ol>
  );
};

export default YearChart;
