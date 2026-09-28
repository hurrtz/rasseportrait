import { initAnalytics, SESSION_REPLAY_SAMPLE_RATE } from "../analytics";

const setup = (random: number) => {
  const amplitude = {
    init: jest.fn(async () => undefined),
    add: jest.fn(),
    track: jest.fn(),
  };
  const replayPlugin = { name: "replay" };
  const loadReplay = jest.fn(async () => ({
    sessionReplayPlugin: jest.fn(() => replayPlugin),
  }));
  const run = () =>
    initAnalytics({
      apiKey: "key",
      loadAmplitude: async () => amplitude as never,
      loadReplay: loadReplay as never,
      random: () => random,
    });
  return { amplitude, loadReplay, replayPlugin, run };
};

describe("initAnalytics", () => {
  it("records sessions for the sampled share only", async () => {
    const { amplitude, loadReplay, replayPlugin, run } = setup(
      SESSION_REPLAY_SAMPLE_RATE / 2,
    );

    await run();

    expect(loadReplay).toHaveBeenCalledTimes(1);
    expect(amplitude.add).toHaveBeenCalledWith(replayPlugin);
  });

  it("does not even download session replay for everybody else", async () => {
    const { amplitude, loadReplay, run } = setup(SESSION_REPLAY_SAMPLE_RATE);

    await run();

    expect(amplitude.init).toHaveBeenCalledWith("key", undefined, {
      defaultTracking: {
        sessions: true,
        pageViews: true,
        formInteractions: true,
        fileDownloads: true,
      },
    });
    expect(loadReplay).not.toHaveBeenCalled();
    expect(amplitude.add).not.toHaveBeenCalled();
    expect(amplitude.track).toHaveBeenCalledWith(
      "App Loaded",
      expect.objectContaining({ url: expect.any(String) }),
    );
  });
});
