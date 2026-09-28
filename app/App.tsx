import { type ReactNode, useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { Header } from "./components/Header";
import ErrorBoundary from "./components/ErrorBoundary";
import { logger } from "./utils/logger";

const App = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Handle GitHub Pages SPA redirect
  useEffect(() => {
    const redirectPath = sessionStorage.getItem("redirectPath");
    if (redirectPath) {
      sessionStorage.removeItem("redirectPath");
      navigate(redirectPath, { replace: true });
    }
  }, [navigate]);

  // Initialize Amplitude Analytics (production only)
  useEffect(() => {
    let isInitialized = false;
    let cleanup: (() => void) | undefined;

    const initializeAmplitude = async () => {
      // Only run on client side and in production to avoid SSR issues and dev tracking
      if (typeof window === "undefined" || isInitialized || import.meta.env.DEV)
        return;

      try {
        // Dynamic import to avoid SSR issues
        const { init, track } = await import("@amplitude/analytics-browser");
        const { sessionReplayPlugin } = await import(
          "@amplitude/plugin-session-replay-browser"
        );

        const { config } = await import("./config/environment");
        const apiKey = config.amplitude.apiKey;

        if (!apiKey) {
          logger.warn("Amplitude API key not found. Analytics disabled.");
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

        // Add session replay plugin with reduced sample rate
        const sessionReplay = sessionReplayPlugin({
          sampleRate: 0.1, // Capture 10% of sessions instead of 100%
        });

        // Add the plugin to Amplitude
        const { add } = await import("@amplitude/analytics-browser");
        add(sessionReplay);

        // Track initial app load
        track("App Loaded", {
          timestamp: Date.now(),
          url: window.location.href,
        });

        isInitialized = true;
        logger.info("✅ Amplitude analytics initialized successfully");
      } catch (error) {
        logger.error("❌ Failed to initialize Amplitude:", error);
      }
    };

    initializeAmplitude();

    // Cleanup function
    cleanup = () => {
      if (isInitialized && typeof window !== "undefined") {
        // Amplitude doesn't have a direct cleanup method, but we can mark as uninitialized
        isInitialized = false;
      }
    };

    return cleanup;
  }, []);

  // The breed detail page is full-bleed; its back button replaces the header
  const isBreedPage = pathname.startsWith("/rasse/");

  return (
    <>
      {!isBreedPage && <Header />}
      <main>
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
    </>
  );
};

export default App;
