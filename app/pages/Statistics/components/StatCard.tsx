import React, { useId, type ReactNode } from "react";
import clsx from "clsx";
import classes from "../Statistics.module.css";

interface Props {
  eyebrow: string;
  className?: string;
  children: ReactNode;
}

/** Bento card; its eyebrow names the region for screen readers */
const StatCard = ({ eyebrow, className, children }: Props) => {
  const id = useId();

  return (
    <section className={clsx(classes.card, className)} aria-labelledby={id}>
      <span id={id} className={classes.eyebrow}>
        {eyebrow}
      </span>
      {children}
    </section>
  );
};

export default StatCard;
