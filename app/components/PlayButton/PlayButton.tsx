import React, { type CSSProperties, type MouseEventHandler } from "react";
import clsx from "clsx";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import classes from "./PlayButton.module.css";

const ICON_SIZE = { 40: 18, 56: 24, 64: 28, 72: 32 } as const;

type Size = keyof typeof ICON_SIZE;

interface Props {
  href: string;
  /** Accessible name, e.g. "Portrait ab 44:50 anhören" */
  label: string;
  size: Size;
  /** Size from md (62em) on, when it differs */
  mdSize?: Size;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  className?: string;
}

/** Round orange play link; every play button leads out to Spotify or RTL+ */
const PlayButton = ({
  href,
  label,
  size,
  mdSize = size,
  onClick,
  className,
}: Props) => (
  <a
    href={href}
    target="_blank"
    rel="noopener"
    aria-label={label}
    className={clsx(classes.play, className)}
    style={
      {
        "--play-size": `${size}px`,
        "--play-icon": `${ICON_SIZE[size]}px`,
        "--play-size-md": `${mdSize}px`,
        "--play-icon-md": `${ICON_SIZE[mdSize]}px`,
      } as CSSProperties
    }
    onClick={onClick}
  >
    <IconPlayerPlayFilled size={ICON_SIZE[size]} aria-hidden />
  </a>
);

export default PlayButton;
