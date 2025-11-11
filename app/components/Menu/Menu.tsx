import React, { useMemo } from "react";
import {
  IconChartBar,
  IconSectionSign,
  IconSortAscending,
  IconSortDescending,
  IconDog,
  IconBook,
} from "@tabler/icons-react";
import { useAmplitude } from "../../hooks/useAmplitude";
import { useNavigate, useLocation } from "react-router";
import { Burger, Menu } from "@mantine/core";
import classes from "./Menu.module.css";
import { useDisclosure } from "@mantine/hooks";
import { useBreedActions, useSortBy, useSortOrder } from "../../stores/breeds";
import clsx from "clsx";
import "./Menu.module.css";

const SORT_BY_OPTIONS: { label: string; value: "name" | "fci" | "airDate" }[] =
  [
    { label: "Name", value: "name" },
    { label: "FCI", value: "fci" },
    { label: "Datum", value: "airDate" },
  ];

export default () => {
  const { track } = useAmplitude();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const sortBy = useSortBy();
  const sortOrder = useSortOrder();
  const { setSort } = useBreedActions();
  const [opened, { toggle: toggleMenuButton }] = useDisclosure();
  const { Target, Dropdown, Label, Item, Divider } = Menu;

  return (
    <Menu shadow="md">
      <Target>
        <div className={classes.burgerWrapper}>
          <Burger opened={opened} onClick={toggleMenuButton} />
        </div>
      </Target>
      <Dropdown>
        <Label>Sortieren nach</Label>
        {SORT_BY_OPTIONS.map(({ value, label }) => (
          <Item
            key={value}
            onClick={() => {
              track("Sort Changed", {
                sortBy: value,
                sortOrder,
                previousSortBy: sortBy,
              });
              setSort({ sortBy: value, sortOrder });
              toggleMenuButton();
            }}
            leftSection={
              sortBy === value && sortOrder === "asc" ? (
                <IconSortAscending />
              ) : (
                <IconSortDescending />
              )
            }
            className={clsx({
              [classes.active]: value === sortBy,
            })}
          >
            {label}
          </Item>
        ))}
        <Divider />
        <Label>Seiten</Label>
        <Item
          leftSection={<IconDog />}
          onClick={() => {
            track("Rasseportrait Clicked", {
              source: "header_menu",
              page: window.location.pathname,
            });
            navigate("/");
            toggleMenuButton();
          }}
          className={clsx({
            [classes.active]: pathname === "/",
          })}
        >
          Rasseportrait
        </Item>
        <Item
          leftSection={<IconBook />}
          onClick={() => {
            track("Hundewissen Clicked", {
              source: "header_menu",
              page: window.location.pathname,
            });
            navigate("/hundewissen");
            toggleMenuButton();
          }}
          className={clsx({
            [classes.active]: pathname === "/hundewissen",
          })}
        >
          Hundewissen
        </Item>
        <Item
          leftSection={<IconChartBar />}
          onClick={() => {
            track("Statistics Clicked", {
              source: "header_menu",
              page: window.location.pathname,
            });
            navigate("/statistiken");
            toggleMenuButton();
          }}
          className={clsx({
            [classes.active]: pathname === "/statistiken",
          })}
        >
          Statistiken
        </Item>
        <Item
          leftSection={<IconSectionSign />}
          onClick={() => {
            track("Impressum Clicked", {
              source: "header_menu",
              page: window.location.pathname,
            });
            navigate("/impressum");
            toggleMenuButton();
          }}
          className={clsx({
            [classes.active]: pathname === "/impressum",
          })}
        >
          Impressum
        </Item>
      </Dropdown>
    </Menu>
  );
};
