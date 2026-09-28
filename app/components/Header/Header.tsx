import React from "react";
import { Link, useLocation } from "react-router";
import { useDisclosure } from "@mantine/hooks";
import { IconMenu2 } from "@tabler/icons-react";
import { BASE_PATH, NAV_ITEMS } from "~/constants";
import type { NavEvent } from "~/hooks/useAmplitude";
import { useAmplitude } from "~/hooks/useAmplitude";
import { NavDrawer } from "./NavDrawer";
import { isNavItemActive } from "./isNavItemActive";
import classes from "./Header.module.css";

const Header = () => {
  const { pathname } = useLocation();
  const { track } = useAmplitude();
  const [drawerOpened, drawer] = useDisclosure(false);

  const trackNavClick = (event: NavEvent, source: string) =>
    track(event, { source, page: pathname });

  return (
    <header className={classes.header}>
      <Link
        to="/"
        className={classes.brand}
        onClick={() => track("Logo Clicked", { page: pathname })}
      >
        <img
          src={`${BASE_PATH}logo_reduced.png`}
          alt=""
          className={classes.logo}
        />
        <span className={classes.wordmark}>Rasseportrait</span>
      </Link>

      <nav aria-label="Hauptnavigation" className={classes.nav}>
        {NAV_ITEMS.map(({ label, to, event }) => (
          <Link
            key={to}
            to={to}
            className={classes.navLink}
            aria-current={isNavItemActive(to, pathname) ? "page" : undefined}
            onClick={() => trackNavClick(event, "header_nav")}
          >
            {label}
          </Link>
        ))}
      </nav>

      <button
        type="button"
        className={classes.menuButton}
        aria-label="Menü öffnen"
        aria-expanded={drawerOpened}
        onClick={drawer.open}
      >
        <IconMenu2 size={22} stroke={2} aria-hidden />
      </button>

      <NavDrawer
        opened={drawerOpened}
        onClose={drawer.close}
        pathname={pathname}
        onNavigate={(event) => {
          trackNavClick(event, "drawer");
          drawer.close();
        }}
      />
    </header>
  );
};

export default Header;
