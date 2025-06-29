import { type ReactNode, useEffect } from "react";
import { AppShell, Burger, Flex, Image, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./App.module.css";
import { useBreedActions, useSortBy, useSortOrder } from "./stores/breeds";
import {
  IconSortAscending,
  IconSortDescending,
  IconSectionSign,
} from "@tabler/icons-react";
import clsx from "clsx";
import { useNavigate } from "react-router";

const SORT_BY_OPTIONS: { label: string; value: "name" | "fci" | "airDate" }[] =
  [
    { label: "Name", value: "name" },
    { label: "FCI", value: "fci" },
    { label: "Datum", value: "airDate" },
  ];

const HEADER_HEIGHT = 60;

// Initialize Amplitude only on client side
const initializeAmplitude = async () => {
  // Check if we're in a browser environment
  if (typeof window === "undefined") return;

  try {
    // Dynamic imports to avoid SSR issues
    const [{ default: amplitude }, { sessionReplayPlugin }] = await Promise.all(
      [
        import("@amplitude/analytics-browser"),
        import("@amplitude/plugin-session-replay-browser"),
      ],
    );

    const sessionReplayTracking = sessionReplayPlugin();
    amplitude.add(sessionReplayTracking);
    amplitude.init(
      window.location.hostname === "localhost"
        ? "" // no tracking during development
        : "73172d06233b85ff451f0f15f016ec0b",
    );
  } catch (error) {
    console.warn("Failed to initialize Amplitude:", error);
  }
};

const App = ({ children }: { children: ReactNode }) => {
  const { Header, Main } = AppShell;
  const { Target, Dropdown, Label, Item, Divider } = Menu;
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();
  const sortBy = useSortBy();
  const sortOrder = useSortOrder();
  const { setSort } = useBreedActions();

  // Initialize Amplitude on client side only
  useEffect(() => {
    initializeAmplitude();
  }, []);

  // Handle GitHub Pages SPA redirect
  useEffect(() => {
    const redirectPath = sessionStorage.getItem("redirectPath");
    if (redirectPath) {
      sessionStorage.removeItem("redirectPath");
      navigate(redirectPath, { replace: true });
    }
  }, [navigate]);

  return (
    <AppShell header={{ height: HEADER_HEIGHT }} padding="md">
      <Header>
        <Flex
          justify="space-between"
          align="center"
          className={classes.headerFlex}
        >
          <div className={classes.logoWrapper} onClick={() => navigate("/")}>
            <Image
              src="logo.png"
              alt="Logo"
              style={{ maxHeight: HEADER_HEIGHT }}
              fit="contain"
            />
          </div>

          <Menu shadow="md" width={200}>
            <Target>
              <div className={classes.burgerWrapper}>
                <Burger opened={opened} onClick={toggle} />
              </div>
            </Target>
            <Dropdown>
              <Label>Sortieren nach</Label>
              {SORT_BY_OPTIONS.map(({ value, label }) => (
                <Item
                  key={value}
                  onClick={() => {
                    setSort({ sortBy: value, sortOrder });
                    toggle();
                  }}
                  leftSection={
                    sortBy === value && sortOrder === "asc" ? (
                      <IconSortAscending />
                    ) : (
                      <IconSortDescending />
                    )
                  }
                  className={clsx([classes.sortByItem], {
                    [classes.active]: value === sortBy,
                  })}
                >
                  {label}
                </Item>
              ))}
              <Divider />
              <Label>Seiten</Label>
              <Item
                leftSection={<IconSectionSign />}
                onClick={() => {
                  navigate("/impressum");
                }}
              >
                Impressum
              </Item>
            </Dropdown>
          </Menu>
        </Flex>
      </Header>

      <Main>{children}</Main>
    </AppShell>
  );
};

export default App;
