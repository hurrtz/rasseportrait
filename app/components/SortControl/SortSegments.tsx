import React from "react";
import { SegmentedControl } from "@mantine/core";
import classes from "./SortSegments.module.css";

interface Props<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}

/** Ink segmented control for a few sort options; shown from md */
const SortSegments = <T extends string>({
  options,
  value,
  onChange,
}: Props<T>) => (
  <SegmentedControl
    aria-label="Sortierung"
    value={value}
    onChange={(next) => onChange(next as T)}
    data={options}
    classNames={{
      root: classes.segmented,
      indicator: classes.indicator,
      control: classes.control,
      input: classes.input,
      label: classes.label,
    }}
  />
);

export default SortSegments;
