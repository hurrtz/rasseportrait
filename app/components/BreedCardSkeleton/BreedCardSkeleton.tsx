import React from "react";
import classes from "./BreedCardSkeleton.module.css";

/** Placeholder with the card's geometry, so lazy cards never shift the grid */
const BreedCardSkeleton = () => (
  <div className={classes.skeleton} aria-hidden>
    <span className={classes.image} />
    <span className={classes.name} />
    <span className={classes.meta} />
  </div>
);

export default BreedCardSkeleton;
