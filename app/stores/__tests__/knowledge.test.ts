import { act } from "@testing-library/react";
import useKnowledgeStore from "../knowledge";

const topic = {
  id: "medizin",
  title: { internal: "medizin", public: "Medizin" },
  summary: "Impfungen und mehr.",
  status: "draft" as const,
  content: "Text",
  podcast: [],
  furtherReading: [],
};

const originalFetch = global.fetch;

const respond = (response: object) => {
  global.fetch = jest.fn(async () => response) as unknown as typeof fetch;
};

const initialize = () =>
  act(async () => {
    await useKnowledgeStore.getState().actions.initialize();
  });

describe("knowledge store", () => {
  beforeEach(() =>
    useKnowledgeStore.setState({ topics: [], status: "idle", error: null }),
  );
  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("loads the topics from knowledge.json", async () => {
    respond({ ok: true, json: async () => ({ topics: [topic] }) });

    await initialize();

    expect(global.fetch).toHaveBeenCalledWith(
      "/rasseportrait/data/knowledge.json",
    );
    expect(useKnowledgeStore.getState()).toMatchObject({
      status: "ready",
      topics: [topic],
    });
  });

  it("reports a failure and can retry", async () => {
    respond({ ok: false, status: 500, statusText: "Boom" });
    await initialize();
    expect(useKnowledgeStore.getState().status).toBe("error");

    respond({ ok: true, json: async () => ({ topics: [topic] }) });
    await initialize();
    expect(useKnowledgeStore.getState().status).toBe("ready");
  });

  it("fetches once for concurrent calls", async () => {
    respond({ ok: true, json: async () => ({ topics: [topic] }) });

    await act(async () => {
      const { initialize: init } = useKnowledgeStore.getState().actions;
      await Promise.all([init(), init()]);
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
