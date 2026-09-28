import { logger } from "./logger";

/** Share of sessions that are recorded with session replay */
export const SESSION_REPLAY_SAMPLE_RATE = 0.1;

type Amplitude = typeof import("@amplitude/analytics-browser");
type SessionReplay = typeof import("@amplitude/plugin-session-replay-browser");

interface Options {
  apiKey: string;
  loadAmplitude?: () => Promise<Amplitude>;
  loadReplay?: () => Promise<SessionReplay>;
  random?: () => number;
}

/**
 * Starts Amplitude. Sampling happens before the session replay plugin is
 * imported, so the 90% of visitors who are not recorded never download it.
 */
export const initAnalytics = async ({
  apiKey,
  loadAmplitude = () => import("@amplitude/analytics-browser"),
  loadReplay = () => import("@amplitude/plugin-session-replay-browser"),
  random = Math.random,
}: Options) => {
  try {
    const amplitude = await loadAmplitude();
    await amplitude.init(apiKey, undefined, {
      defaultTracking: {
        sessions: true,
        pageViews: true,
        formInteractions: true,
        fileDownloads: true,
      },
    });

    if (random() < SESSION_REPLAY_SAMPLE_RATE) {
      const { sessionReplayPlugin } = await loadReplay();
      // already sampled above, so record every session that gets here
      amplitude.add(sessionReplayPlugin({ sampleRate: 1 }));
    }

    amplitude.track("App Loaded", {
      timestamp: Date.now(),
      url: window.location.href,
    });
    logger.info("Amplitude analytics initialized");
  } catch (error) {
    logger.error("Failed to initialize Amplitude:", error);
  }
};
