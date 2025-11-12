import React from "react";
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
import { Burger, Drawer, NavLink, Stack, Text, Portal } from "@mantine/core";
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
  const [opened, { open, close }] = useDisclosure();

  return (
    <>
      <Portal>
        <div className={classes.burgerWrapper}>
          <Burger opened={opened} onClick={opened ? close : open} />
        </div>
      </Portal>

      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        withCloseButton={false}
      >
        <Stack gap="xs">
          <Text size="sm" fw="bold">
            Sortieren nach
          </Text>
          {SORT_BY_OPTIONS.map(({ value, label }) => (
            <NavLink
              key={value}
              label={label}
              onClick={() => {
                track("Sort Changed", {
                  sortBy: value,
                  sortOrder,
                  previousSortBy: sortBy,
                });
                setSort({ sortBy: value, sortOrder });
                close();
              }}
              leftSection={
                sortBy === value && sortOrder === "asc" ? (
                  <IconSortAscending size={20} />
                ) : (
                  <IconSortDescending size={20} />
                )
              }
              active={value === sortBy}
              variant="light"
              autoContrast
              color="orange"
            />
          ))}
        </Stack>

        <Stack gap="xs" mt={32}>
          <Text size="sm" fw="bold">
            Seiten
          </Text>
          <NavLink
            label="Rasseportrait"
            leftSection={<IconDog size={20} />}
            onClick={() => {
              track("Rasseportrait Clicked", {
                source: "header_menu",
                page: window.location.pathname,
              });
              navigate("/");
              close();
            }}
            active={pathname === "/"}
            variant="filled"
            autoContrast
            color="lime"
          />
          <NavLink
            label="Hundewissen"
            leftSection={<IconBook size={20} />}
            onClick={() => {
              track("Hundewissen Clicked", {
                source: "header_menu",
                page: window.location.pathname,
              });
              navigate("/hundewissen");
              close();
            }}
            active={pathname === "/hundewissen"}
            variant="filled"
            autoContrast
            color="lime"
          />
          <NavLink
            label="Statistiken"
            leftSection={<IconChartBar size={20} />}
            onClick={() => {
              track("Statistics Clicked", {
                source: "header_menu",
                page: window.location.pathname,
              });
              navigate("/statistiken");
              close();
            }}
            active={pathname === "/statistiken"}
            variant="filled"
            autoContrast
            color="lime"
          />
          <NavLink
            label="Impressum"
            leftSection={<IconSectionSign size={20} />}
            onClick={() => {
              track("Impressum Clicked", {
                source: "header_menu",
                page: window.location.pathname,
              });
              navigate("/impressum");
              close();
            }}
            active={pathname === "/impressum"}
            variant="filled"
            autoContrast
            color="lime"
          />
        </Stack>
      </Drawer>
    </>
  );
};
