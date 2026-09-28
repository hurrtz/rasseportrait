import React from "react";
import { Menu } from "@mantine/core";
import { IconArrowsSort, IconCheck } from "@tabler/icons-react";
import {
  SORT_ORDER_BY_FIELD,
  useBreedActions,
  useSortBy,
  type SortBy,
} from "~/stores/breeds";
import { useAmplitude } from "~/hooks/useAmplitude";
import SortSegments from "./SortSegments";
import classes from "./SortControl.module.css";

const OPTIONS: { value: SortBy; label: string }[] = [
  { value: "airDate", label: "Neueste" },
  { value: "name", label: "A–Z" },
  { value: "fci", label: "FCI-Nummer" },
];

/**
 * Three fixed sort options: a segmented control from md, a compact menu
 * button below md (CSS shows one of them).
 */
const SortControl = () => {
  const sortBy = useSortBy();
  const { setSort } = useBreedActions();
  const { track } = useAmplitude();
  const current =
    OPTIONS.find((option) => option.value === sortBy) ?? OPTIONS[0];

  const choose = (value: SortBy) => {
    if (value === sortBy) return;
    const sortOrder = SORT_ORDER_BY_FIELD[value];
    track("Sort Changed", { sortBy: value, sortOrder, previousSortBy: sortBy });
    setSort({ sortBy: value, sortOrder });
  };

  return (
    <div className={classes.sort}>
      <SortSegments options={OPTIONS} value={sortBy} onChange={choose} />

      <Menu position="bottom-end" classNames={{ dropdown: classes.dropdown }}>
        <Menu.Target>
          <button
            type="button"
            className={classes.compact}
            aria-label={`Sortieren: ${current.label}`}
          >
            <IconArrowsSort size={18} aria-hidden />
            {current.label}
          </button>
        </Menu.Target>
        <Menu.Dropdown>
          {OPTIONS.map(({ value, label }) => (
            <Menu.Item
              key={value}
              className={classes.item}
              onClick={() => choose(value)}
              aria-current={value === sortBy ? "true" : undefined}
              rightSection={
                value === sortBy ? <IconCheck size={16} aria-hidden /> : null
              }
            >
              {label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </div>
  );
};

export default SortControl;
