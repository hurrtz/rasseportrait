import React from "react";
import classes from "./LoadError.module.css";

interface Props {
  title: string;
  onRetry: () => void;
}

/** Card shown when data could not be loaded, with a retry pill */
const LoadError = ({ title, onRetry }: Props) => (
  <div className={classes.wrap}>
    <div role="alert" className={classes.card}>
      <p className={classes.title}>{title}</p>
      <p className={classes.text}>
        Prüfe deine Verbindung und versuche es noch einmal.
      </p>
      <button type="button" className={classes.retry} onClick={onRetry}>
        Neu laden
      </button>
    </div>
  </div>
);

export default LoadError;
