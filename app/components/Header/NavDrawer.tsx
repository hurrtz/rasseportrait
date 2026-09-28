import React from "react";
import { Drawer } from "@mantine/core";
import { Link } from "react-router";
import { IconX } from "@tabler/icons-react";
import { NAV_ITEMS } from "~/constants";
import type { NavEvent } from "~/hooks/useAmplitude";
import { isNavItemActive } from "./isNavItemActive";
import classes from "./Header.module.css";

interface Props {
  opened: boolean;
  onClose: () => void;
  pathname: string;
  onNavigate: (event: NavEvent) => void;
}

export const NavDrawer = ({ opened, onClose, pathname, onNavigate }: Props) => (
  <Drawer
    opened={opened}
    onClose={onClose}
    position="right"
    size="min(100vw, 360px)"
    title="Menü"
    closeButtonProps={{
      "aria-label": "Menü schließen",
      icon: <IconX size={22} stroke={2} />,
    }}
    classNames={{
      content: classes.drawerContent,
      header: classes.drawerHeader,
      title: classes.drawerTitle,
      close: classes.drawerClose,
    }}
  >
    <nav aria-label="Seiten" className={classes.drawerNav}>
      {NAV_ITEMS.map(({ label, to, event }) => (
        <Link
          key={to}
          to={to}
          className={classes.drawerLink}
          aria-current={isNavItemActive(to, pathname) ? "page" : undefined}
          onClick={() => onNavigate(event)}
        >
          {label}
        </Link>
      ))}
    </nav>
  </Drawer>
);
