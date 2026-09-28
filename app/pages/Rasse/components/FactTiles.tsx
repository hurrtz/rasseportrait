import React from "react";
import clsx from "clsx";
import type { Podcast } from "types/breed";
import type { BreedView } from "~/utils/breed";
import { formatDateShort, formatTimecode } from "~/utils/format";
import classes from "../Rasse.module.css";

const HOSTS = { mr: "Martin", ka: "Katharina" } as const;

interface Fact {
  label: string;
  value: string;
  sub?: string;
  /** shown only from md ("desktop") or below md ("mobile") */
  only?: "desktop" | "mobile";
}

const guessFact = (primary: Podcast): Fact => {
  const { isGuessable, guessedBy, isGuessedCorrectly } = primary.meta;
  if (!isGuessable || !guessedBy) {
    return { label: "Geraten", value: "Nicht geraten" };
  }
  return {
    label: "Geraten",
    value: HOSTS[guessedBy],
    sub: isGuessedCorrectly ? "richtig" : "daneben",
  };
};

const getFacts = ({ fci, group, primary }: BreedView): Fact[] => [
  fci
    ? { label: "FCI-Nummer", value: String(fci.standardNumber) }
    : { label: "Nicht im FCI-Standard", value: "—" },
  {
    label: "Gruppe",
    value: group ? `${group.roman} · ${group.short}` : "Ohne FCI",
  },
  ...(primary
    ? [
        {
          label: "Vorgestellt",
          value: formatDateShort(primary.meta.airDate),
          only: "desktop" as const,
        },
        {
          label: "Portrait ab",
          value: formatTimecode(primary.meta.timecode),
          only: "mobile" as const,
        },
        guessFact(primary),
      ]
    : []),
];

const FactTiles = ({ view }: { view: BreedView }) => (
  <ul className={classes.facts} aria-label="Steckbrief">
    {getFacts(view).map(({ label, value, sub, only }) => (
      <li
        key={label}
        className={clsx(
          classes.fact,
          only === "desktop" && classes.desktopOnly,
          only === "mobile" && classes.mobileOnly,
        )}
      >
        <span className={classes.factLabel}>{label}</span>
        <span className={classes.factValue}>{value}</span>
        {sub && <span className={classes.factSub}>{sub}</span>}
      </li>
    ))}
  </ul>
);

export default FactTiles;
