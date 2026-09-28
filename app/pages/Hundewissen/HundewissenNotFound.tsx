import React from "react";
import { Link } from "react-router";
import { IconArrowLeft } from "@tabler/icons-react";
import classes from "./shared.module.css";

/** Unknown area or topic, like an unknown breed slug */
const HundewissenNotFound = ({ title }: { title: string }) => (
  <div className={classes.notFound}>
    <h1 className={classes.notFoundTitle}>{title}</h1>
    <p className={classes.notFoundText}>
      Unter dieser Adresse gibt es im Hundewissen nichts. Vielleicht ist das
      Thema umgezogen.
    </p>
    <Link to="/hundewissen" className={classes.backPill}>
      <IconArrowLeft size={18} aria-hidden />
      Alle Bereiche
    </Link>
  </div>
);

export default HundewissenNotFound;
