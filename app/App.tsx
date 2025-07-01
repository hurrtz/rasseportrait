import { type ReactNode, useEffect } from "react";
import { AppShell, Group, Image } from "@mantine/core";
import classes from "./App.module.css";
import { useNavigate } from "react-router";
import { useAmplitude } from "./hooks/useAmplitude";
import { Menu } from "./components/Menu";

const HEADER_HEIGHT = 60;

const App = ({ children }: { children: ReactNode }) => {
  const { Header, Main } = AppShell;
  const navigate = useNavigate();
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

        const apiKey = "73172d06233b85ff451f0f15f016ec0b";

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
      <Header pl="xs" pr="md">
        <Group className={classes.headerFlex} justify="space-between">
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
          <Menu />
        </Group>
      </Header>

      <Main>{children}</Main>
    </AppShell>
  );
};

export default App;
