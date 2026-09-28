import { act } from "@testing-library/react";
import type { HundewissenIndex, HundewissenTopic } from "types/hundewissen";
import useHundewissenStore, { resetHundewissenStore } from "../hundewissen";

const index: HundewissenIndex = {
  generated: "2026-09-28",
  indexedEpisodes: 8,
  totalEpisodes: 260,
  areas: [
    { slug: "zucht-rassen", name: "Zucht & Rassen", icon: "IconDna2", topicCount: 1 },
  ],
  topics: [
    {
      id: "qualzuchten",
      label: "Qualzuchten",
      area: "zucht-rassen",
      episodeCount: 4,
      entryCount: 6,
    },
  ],
};

const topic = {
  id: "qualzuchten",
  label: "Qualzuchten",
  area: "zucht-rassen",
} as HundewissenTopic;

const originalFetch = global.fetch;

const respond = (...responses: object[]) => {
  const queue = [...responses];
  global.fetch = jest.fn(
    async () => queue.shift() ?? responses[responses.length - 1],
  ) as unknown as typeof fetch;
};

const ok = (body: object) => ({ ok: true, json: async () => body });
const failed = { ok: false, status: 500, statusText: "Boom" };

describe("hundewissen store", () => {
  beforeEach(resetHundewissenStore);
  afterEach(() => {
    global.fetch = originalFetch;
  });

  describe("initialize", () => {
    it("loads the index from hundewissen.json", async () => {
      respond(ok(index));

      await act(() => useHundewissenStore.getState().actions.initialize());

      expect(global.fetch).toHaveBeenCalledWith(
        "/rasseportrait/data/hundewissen.json",
      );
      expect(useHundewissenStore.getState()).toMatchObject({
        status: "ready",
        index,
      });
    });

    it("reports a failure and can retry", async () => {
      respond(failed, ok(index));

      await act(() => useHundewissenStore.getState().actions.initialize());
      expect(useHundewissenStore.getState().status).toBe("error");

      await act(() => useHundewissenStore.getState().actions.initialize());
      expect(useHundewissenStore.getState().status).toBe("ready");
    });

    it("fetches once for concurrent calls", async () => {
      respond(ok(index));

      await act(async () => {
        const { initialize } = useHundewissenStore.getState().actions;
        await Promise.all([initialize(), initialize()]);
      });

      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
  });

  describe("loadTopic", () => {
    it("loads a topic file once and keeps it", async () => {
      respond(ok(topic));

      await act(() => useHundewissenStore.getState().actions.loadTopic("qualzuchten"));
      await act(() => useHundewissenStore.getState().actions.loadTopic("qualzuchten"));

      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        "/rasseportrait/data/hundewissen/qualzuchten.json",
      );
      expect(useHundewissenStore.getState().topics.qualzuchten).toEqual({
        status: "ready",
        topic,
      });
    });

    it("fetches once for concurrent calls of the same topic", async () => {
      respond(ok(topic));

      await act(async () => {
        const { loadTopic } = useHundewissenStore.getState().actions;
        await Promise.all([loadTopic("qualzuchten"), loadTopic("qualzuchten")]);
      });

      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it("reports a failure per topic and can retry", async () => {
      respond(failed, ok(topic));

      await act(() => useHundewissenStore.getState().actions.loadTopic("qualzuchten"));
      expect(useHundewissenStore.getState().topics.qualzuchten).toEqual({
        status: "error",
      });

      await act(() => useHundewissenStore.getState().actions.loadTopic("qualzuchten"));
      expect(useHundewissenStore.getState().topics.qualzuchten?.status).toBe("ready");
    });
  });
});
