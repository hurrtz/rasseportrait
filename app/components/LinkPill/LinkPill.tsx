import React, { type MouseEventHandler } from "react";
import { IconExternalLink } from "@tabler/icons-react";
import classes from "./LinkPill.module.css";

interface Props {
  href: string;
  children: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

/** Outline pill for external reading (Wikipedia, FCI standard, clubs) */
const LinkPill = ({ href, children, onClick }: Props) => (
  <a
    href={href}
    target="_blank"
    rel="noopener"
    className={classes.pill}
    onClick={onClick}
  >
    {children}
    <IconExternalLink size={16} className={classes.icon} aria-hidden />
  </a>
);

export default LinkPill;
