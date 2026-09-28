import React from "react";
import { BASE_PATH } from "~/constants";
import classes from "./BreedNotFound.module.css";

interface Props {
  needle: string;
  onReset: () => void;
}

export const BreedNotFound = ({ needle, onReset }: Props) => (
  <div className={classes.notFound}>
    <img
      src={`${BASE_PATH}illustrations/general_purpose/not_found_illustration_thumbnail.jpeg`}
      alt=""
      className={classes.image}
      loading="lazy"
      decoding="async"
    />
    <h3 className={classes.title}>Keine Rasse gefunden</h3>
    <p className={classes.text}>
      Für »{needle}« gibt es noch kein Portrait. Suche nach einem anderen Namen
      oder einer FCI-Nummer.
    </p>
    <button type="button" className={classes.reset} onClick={onReset}>
      Suche zurücksetzen
    </button>
  </div>
);
