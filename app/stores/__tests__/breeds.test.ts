import { act } from "@testing-library/react";
import useBreedsStore from "../breeds";
import { makeBreed, resetBreedsStore } from "~/test-utils";

const rawBreeds = [
  makeBreed(),
  makeBreed({
    id: 111,
    details: { internal: "golden_retriever", public: ["Golden Retriever"] },
  }),
];

const mockFetch = (response: Partial<Response> & { json?: () => unknown }) =>
  jest.fn(async () => response) as unknown as typeof fetch;

const originalFetch = global.fetch;

beforeEach(() => {
  localStorage.clear();
  resetBreedsStore();
});

afterEach(() => {
  global.fetch = originalFetch;
});

const initialize = () =>
  act(async () => {
    await useBreedsStore.getState().actions.initialize();
  });

describe("breeds store · initialize", () => {
  it("loads breeds.json into display breeds with hashed ids and slugs", async () => {
    global.fetch = mockFetch({
      ok: true,
      json: async () => ({ breeds: rawBreeds }),
    });

    await initialize();

    const { status, rawBreeds: raw, breeds } = useBreedsStore.getState();
    expect(global.fetch).toHaveBeenCalledWith(
      "/rasseportrait/data/breeds.json",
    );
    expect(status).toBe("ready");
    expect(raw).toHaveLength(2);
    expect(breeds.map((breed) => breed.slug)).toEqual([
      "border-collie",
      "golden-retriever",
    ]);
    expect(String(breeds[0].id)).toMatch(/^[a-z0-9]{4}$/);
    expect(breeds[0].originalId).toBe(297);
  });

  it("reports a failed request and can retry", async () => {
    global.fetch = mockFetch({ ok: false, status: 404, statusText: "Nope" });

    await initialize();

    expect(useBreedsStore.getState().status).toBe("error");
    expect(useBreedsStore.getState().error).toMatch(/404/);

    global.fetch = mockFetch({
      ok: true,
      json: async () => ({ breeds: rawBreeds }),
    });
    await initialize();

    expect(useBreedsStore.getState().status).toBe("ready");
    expect(useBreedsStore.getState().error).toBeNull();
  });

  it("treats an empty dataset as an error", async () => {
    global.fetch = mockFetch({ ok: true, json: async () => ({ breeds: [] }) });

    await initialize();

    expect(useBreedsStore.getState().status).toBe("error");
  });

  it("lets a second caller wait for the load already in flight", async () => {
    global.fetch = mockFetch({
      ok: true,
      json: async () => ({ breeds: rawBreeds }),
    });

    await act(async () => {
      const { initialize: init } = useBreedsStore.getState().actions;
      void init();
      await init();
      expect(useBreedsStore.getState().status).toBe("ready");
    });
  });

  it("fetches only once for concurrent and repeated calls", async () => {
    global.fetch = mockFetch({
      ok: true,
      json: async () => ({ breeds: rawBreeds }),
    });

    await act(async () => {
      const { initialize: init } = useBreedsStore.getState().actions;
      await Promise.all([init(), init()]);
    });
    await initialize();

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});

describe("breeds store · search and sort", () => {
  it("keeps the raw search query", () => {
    act(() => useBreedsStore.getState().actions.setQuery("Collie"));

    expect(useBreedsStore.getState().query).toBe("Collie");
  });

  it("sets sort field and order exactly as given, without toggling", () => {
    const { setSort } = useBreedsStore.getState().actions;

    act(() => setSort({ sortBy: "name", sortOrder: "asc" }));
    act(() => setSort({ sortBy: "name", sortOrder: "asc" }));

    expect(useBreedsStore.getState()).toMatchObject({
      sortBy: "name",
      sortOrder: "asc",
    });
  });

  it("persists only the sort setting", () => {
    act(() => {
      useBreedsStore.getState().actions.setQuery("Pudel");
      useBreedsStore
        .getState()
        .actions.setSort({ sortBy: "fci", sortOrder: "asc" });
    });

    const persisted = JSON.parse(
      localStorage.getItem("rasseportrait-sort-settings") ?? "{}",
    );
    expect(persisted.state).toEqual({ sortBy: "fci", sortOrder: "asc" });
  });

  it("maps a stored sort from the old UI onto one of the three options", async () => {
    localStorage.setItem(
      "rasseportrait-sort-settings",
      JSON.stringify({
        state: { sortBy: "name", sortOrder: "desc" },
        version: 1,
      }),
    );

    await act(async () => {
      await useBreedsStore.persist.rehydrate();
    });

    expect(useBreedsStore.getState()).toMatchObject({
      sortBy: "name",
      sortOrder: "asc",
    });
  });
});
