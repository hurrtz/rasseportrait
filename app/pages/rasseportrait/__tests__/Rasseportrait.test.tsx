import React from "react";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import useBreedsStore from "~/stores/breeds";
import {
  makeBreed,
  makePodcast,
  renderWithProviders,
  resetBreedsStore,
  seedBreeds,
} from "~/test-utils";
import Rasseportrait from "../Rasseportrait";

jest.mock("~/hooks/useAmplitude", () => ({
  useAmplitude: () => ({ track: jest.fn() }),
}));

const rawBreeds = [
  makeBreed(),
  makeBreed({
    id: 161,
    classification: { fci: { group: 6, section: 1, standardNumber: 161 } },
    details: { internal: "beagle", public: ["Beagle"] },
    podcast: [
      makePodcast({
        number: 5,
        meta: { airDate: "2025-01-10", timecode: 600 } as never,
      }),
    ],
  }),
  makeBreed({
    id: 2,
    classification: { fci: { group: 7, section: 2, standardNumber: 2 } },
    details: { internal: "english_setter", public: ["English Setter"] },
    podcast: [
      makePodcast({
        number: 15,
        meta: { airDate: "2026-06-04", timecode: 2908 } as never,
      }),
    ],
  }),
];

const cardNames = () =>
  screen
    .getAllByRole("link", { name: /^Details zu / })
    .map((link) => link.getAttribute("aria-label")?.replace("Details zu ", ""));

const search = (value: string) =>
  fireEvent.change(screen.getByRole("searchbox"), { target: { value } });

const originalFetch = global.fetch;

describe("Rasseportrait overview", () => {
  beforeEach(() => resetBreedsStore());
  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("loads the breeds when nothing is loaded yet", async () => {
    global.fetch = jest.fn(async () => ({
      ok: true,
      json: async () => ({ breeds: rawBreeds }),
    })) as unknown as typeof fetch;

    renderWithProviders(<Rasseportrait />);

    expect(
      await screen.findByRole("heading", { level: 1, name: "English Setter" }),
    ).toBeInTheDocument();
  });

  it("shows a loader while loading", () => {
    useBreedsStore.setState({ status: "loading" });

    renderWithProviders(<Rasseportrait />);

    expect(screen.getByText("Rassen werden geladen …")).toBeInTheDocument();
  });

  it("offers to retry after a failed load", async () => {
    useBreedsStore.setState({ status: "error", error: "Failed to load" });
    global.fetch = jest.fn(async () => ({
      ok: true,
      json: async () => ({ breeds: rawBreeds }),
    })) as unknown as typeof fetch;

    renderWithProviders(<Rasseportrait />);
    expect(
      screen.getByText("Die Rassen konnten nicht geladen werden."),
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Neu laden" }));

    expect(
      await screen.findByRole("heading", { level: 1, name: "English Setter" }),
    ).toBeInTheDocument();
  });

  it("shows the newest portrait as hero and all portraits newest first", () => {
    seedBreeds(rawBreeds);

    renderWithProviders(<Rasseportrait />);

    expect(
      screen.getByRole("heading", { level: 1, name: "English Setter" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Alle 3 Portraits" }),
    ).toBeInTheDocument();
    expect(cardNames()).toEqual(["English Setter", "Border Collie", "Beagle"]);
  });

  it("re-sorts the grid A–Z", () => {
    seedBreeds(rawBreeds);
    renderWithProviders(<Rasseportrait />);

    fireEvent.click(screen.getByRole("radio", { name: "A–Z" }));

    expect(cardNames()).toEqual(["Beagle", "Border Collie", "English Setter"]);
  });

  it("filters by name, hides the hero and counts the hits", async () => {
    seedBreeds(rawBreeds);
    renderWithProviders(<Rasseportrait />);

    search("Beagle");

    expect(
      await screen.findByRole("heading", {
        level: 2,
        name: "1 Treffer für »Beagle«",
      }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 1 })).toBeNull();
    expect(cardNames()).toEqual(["Beagle"]);
  });

  it("finds breeds by FCI number", async () => {
    seedBreeds(rawBreeds);
    renderWithProviders(<Rasseportrait />);

    search("297");

    await waitFor(() => expect(cardNames()).toEqual(["Border Collie"]));
  });

  it("explains an empty result and resets the search", async () => {
    seedBreeds(rawBreeds);
    renderWithProviders(<Rasseportrait />);

    search("Dackel");

    expect(
      await screen.findByRole("heading", { name: "Keine Rasse gefunden" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Für »Dackel« gibt es noch kein Portrait. Suche nach einem anderen Namen oder einer FCI-Nummer.",
      ),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Suche zurücksetzen" }));

    expect(screen.getByRole("searchbox")).toHaveValue("");
    await waitFor(() => expect(cardNames()).toHaveLength(3));
  });

  it("redirects old ?breed= links to the breed page", async () => {
    const breeds = seedBreeds(rawBreeds);
    const borderCollie = breeds.find((b) => b.slug === "border-collie")!;

    renderWithProviders(<Rasseportrait />, {
      route: `/?breed=${borderCollie.id}`,
      path: "/",
    });

    await waitFor(() =>
      expect(screen.getByTestId("location")).toHaveTextContent(
        "/rasse/border-collie",
      ),
    );
  });

  it("drops an unknown ?breed= parameter", async () => {
    seedBreeds(rawBreeds);

    renderWithProviders(<Rasseportrait />, { route: "/?breed=zzzz" });

    await waitFor(() =>
      expect(screen.getByTestId("location").textContent).toBe("/"),
    );
  });

  it("keeps the search when the page is shown again", async () => {
    seedBreeds(rawBreeds);
    act(() => useBreedsStore.getState().actions.setQuery("Beagle"));

    renderWithProviders(<Rasseportrait />);

    expect(screen.getByRole("searchbox")).toHaveValue("Beagle");
    expect(cardNames()).toEqual(["Beagle"]);
  });
});
