import React from "react";
import { Loader } from "@mantine/core";
import classes from "./LoadingSpinner.module.css";

interface Props {
  message?: string;
}

const LoadingSpinner = ({ message = "Wird geladen …" }: Props) => (
  <div role="status" className={classes.spinner}>
    <Loader color="var(--rp-accent)" size="md" aria-hidden />
    <span className={classes.message}>{message}</span>
  </div>
);

export default LoadingSpinner;
