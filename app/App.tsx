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
import { useAmplitude } from "./hooks/useAmplitude";

const SORT_BY_OPTIONS: { label: string; value: "name" | "fci" | "airDate" }[] =
  [
    { label: "Name", value: "name" },
    { label: "FCI", value: "fci" },
    { label: "Datum", value: "airDate" },
  ];

const HEADER_HEIGHT = 60;

const App = ({ children }: { children: ReactNode }) => {
  const { Header, Main } = AppShell;
  const { Target, Dropdown, Label, Item, Divider } = Menu;
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();
  const sortBy = useSortBy();
  const sortOrder = useSortOrder();
  const { setSort } = useBreedActions();
  const { track } = useAmplitude();

  // Handle GitHub Pages SPA redirect
  useEffect(() => {
    const redirectPath = sessionStorage.getItem("redirectPath");
    if (redirectPath) {
      sessionStorage.removeItem("redirectPath");
      navigate(redirectPath, { replace: true });
    }
  }, [navigate]);

  // Initialize Amplitude Analytics (client-side only)
  useEffect(() => {
    const initializeAmplitude = async () => {
      // Only run on client side to avoid SSR issues
      if (typeof window === "undefined") return;

      try {
        // Dynamic import to avoid SSR issues
        const { init, track } = await import("@amplitude/analytics-browser");
        const { sessionReplayPlugin } = await import(
          "@amplitude/plugin-session-replay-browser"
        );

        // Initialize Amplitude with your API key
        const apiKey =
          process.env.REACT_APP_AMPLITUDE_API_KEY ||
          process.env.VITE_AMPLITUDE_API_KEY;

        if (!apiKey) {
          console.warn("Amplitude API key not found. Analytics disabled.");
          return;
        }

        // Initialize with session replay plugin
        await init(apiKey, undefined, {
          defaultTracking: {
            sessions: true,
            pageViews: true,
            formInteractions: true,
            fileDownloads: true,
          },
        });

        // Add session replay plugin
        const sessionReplay = sessionReplayPlugin({
          sampleRate: 1, // Capture 100% of sessions (adjust as needed)
        });

        // Add the plugin to Amplitude (no setup call needed)
        const { add } = await import("@amplitude/analytics-browser");
        add(sessionReplay);

        // Track initial app load
        track("App Loaded", {
          timestamp: Date.now(),
          url: window.location.href,
        });

        console.log("✅ Amplitude analytics initialized successfully");
      } catch (error) {
        console.error("❌ Failed to initialize Amplitude:", error);
      }
    };

    initializeAmplitude();
  }, []);

  return (
    <AppShell header={{ height: HEADER_HEIGHT }} padding="md">
      <Header>
        <Flex
          justify="space-between"
          align="center"
          className={classes.headerFlex}
        >
          <div
            className={classes.logoWrapper}
            onClick={() => {
              track("Logo Clicked", { page: window.location.pathname });
              navigate("/");
            }}
          >
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
                    track("Sort Changed", {
                      sortBy: value,
                      sortOrder,
                      previousSortBy: sortBy,
                    });
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
                  track("Impressum Clicked", {
                    source: "header_menu",
                    page: window.location.pathname,
                  });
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
