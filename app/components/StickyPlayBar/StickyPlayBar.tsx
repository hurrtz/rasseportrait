import React from "react";
import { PlayButton } from "~/components/PlayButton";
import classes from "./StickyPlayBar.module.css";

interface Props {
  href: string;
  /** "Ab 44:50 anhören"; also the play link's name */
  title: string;
  /** "Spotify · Folge 7" */
  meta: string;
  onPlay: () => void;
}

/**
 * Play bar pinned to the bottom of small screens (hidden from md); the page
 * leaves room for it at the bottom.
 */
const StickyPlayBar = ({ href, title, meta, onPlay }: Props) => (
  <div role="region" aria-label="Wiedergabe" className={classes.sticky}>
    <PlayButton size={56} href={href} label={title} onClick={onPlay} />
    <span className={classes.text}>
      <span className={classes.title}>{title}</span>
      <span className={classes.meta}>{meta}</span>
    </span>
  </div>
);

export default StickyPlayBar;
