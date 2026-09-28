import React from "react";
import clsx from "clsx";
import classes from "../Statistics.module.css";

interface Props {
  /** 0–100 */
  value: number;
  className?: string;
}

/** Decorative bar; the number it shows is always printed next to it */
const ProgressBar = ({ value, className }: Props) => (
  <div className={clsx(classes.track, className)} aria-hidden>
    <div
      className={classes.fill}
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);

export default ProgressBar;
