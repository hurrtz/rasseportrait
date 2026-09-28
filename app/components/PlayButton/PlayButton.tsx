import React, { type MouseEventHandler } from "react";
import clsx from "clsx";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import classes from "./PlayButton.module.css";

const ICON_SIZE = { 40: 18, 56: 24, 64: 28, 72: 32 } as const;

interface Props {
  href: string;
  /** Accessible name, e.g. "Portrait ab 44:50 anhören" */
  label: string;
  size: keyof typeof ICON_SIZE;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  className?: string;
}

/** Round orange play link; every play button leads out to Spotify or RTL+ */
const PlayButton = ({ href, label, size, onClick, className }: Props) => (
  <a
    href={href}
    target="_blank"
    rel="noopener"
    aria-label={label}
    className={clsx(classes.play, className)}
    style={{ width: size, height: size }}
    onClick={onClick}
  >
    <IconPlayerPlayFilled size={ICON_SIZE[size]} aria-hidden />
  </a>
);

export default PlayButton;
