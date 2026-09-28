import React from "react";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import type { Breed } from "types/breed";
import {
  makeBreed,
  makePodcast,
  renderWithProviders,
  resetBreedsStore,
  seedBreeds,
} from "~/test-utils";
import Rasse from "../Rasse";

const mockTrack = jest.fn();
jest.mock("~/hooks/useAmplitude", () => ({
  useAmplitude: () => ({ track: mockTrack }),
}));

const borderCollie = makeBreed({
  furtherReading: [
    { name: "Wikipedia", url: "https://de.wikipedia.org/wiki/Border_Collie" },
  ],
  recognitions: ["Danke an Robin für den Hinweis!"],
});

const beardedCollie = makeBreed({
  id: 271,
  details: { internal: "bearded_collie", public: ["Bearded Collie"] },
  podcast: [
    makePodcast({
      number: 195,
      meta: { airDate: "2025-03-01", timecode: 2557 } as never,
    }),
  ],
});

const beagle = makeBreed({
  id: 161,
  classification: { fci: { group: 6, section: 1, standardNumber: 161 } },
  details: { internal: "beagle", public: ["Beagle"] },
});

const renderBreed = (slug: string, raw: Breed[], from?: string) => {
  seedBreeds(raw);
  return renderWithProviders(<Rasse />, {
    path: "/rasse/:slug",
    entries: [
      "/?sort=previous",
      { pathname: `/rasse/${slug}`, state: from ? { from } : null },
    ],
  });
};

describe("Rasse page", () => {
  beforeEach(() => {
    resetBreedsStore();
    mockTrack.mockClear();
  });

  it("shows the breed with the episode it was presented in", () => {
    renderBreed("border-collie", [borderCollie]);

    expect(
      screen.getByRole("heading", { level: 1, name: "Border Collie" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Rasseportrait · Folge 7")).toBeInTheDocument();
    expect(screen.getByText("Folge 7 · 8. April 2026")).toBeInTheDocument();
    expect(screen.getByText("aus »Hunde, die bellen«")).toBeInTheDocument();
    expect(screen.getByAltText("Border Collie")).toHaveAttribute(
      "src",
      "/rasseportrait/illustrations/breeds/297/illustration.jpeg",
    );
  });

  it("plays the portrait on Spotify from the player card", () => {
    renderBreed("border-collie", [borderCollie]);

    const player = screen.getByRole("region", { name: "Hunde, die bellen" });
    expect(
      within(player).getByRole("link", {
        name: "Ab 44:50 auf Spotify anhören",
      }),
    ).toHaveAttribute("href", "https://open.spotify.com/episode/abc?t=2690");
    expect(
      within(player).getByText("Tierisch Menschlich · 8. April 2026"),
    ).toBeInTheDocument();
    expect(
      within(player).getByText("Portrait startet bei 44:50"),
    ).toBeInTheDocument();
    expect(
      within(player).getByRole("link", { name: "Auch auf RTL+" }),
    ).toHaveAttribute("href", "https://plus.rtl.de/podcast/abc");
  });

  it("names the provider when there is only one source", () => {
    renderBreed("border-collie", [
      makeBreed({
        podcast: [
          makePodcast({
            sources: [
              {
                url: "https://open.spotify.com/episode/abc",
                type: "audio",
                provider: "spotify",
              },
            ],
          }),
        ],
      }),
    ]);

    const player = screen.getByRole("region", { name: "Hunde, die bellen" });
    expect(within(player).getByText("Spotify")).toBeInTheDocument();
  });

  it("offers the RTL+ video next to the RTL+ audio", () => {
    renderBreed("border-collie", [
      makeBreed({
        podcast: [
          makePodcast({
            sources: [
              { url: "https://rtl/audio", type: "audio", provider: "rtl" },
              { url: "https://rtl/video", type: "video", provider: "rtl" },
            ],
          }),
        ],
      }),
    ]);

    expect(
      screen.getByRole("link", { name: "Ab 44:50 auf RTL+ anhören" }),
    ).toHaveAttribute("href", "https://rtl/audio");
    expect(
      screen.getByRole("link", { name: "Video auf RTL+" }),
    ).toHaveAttribute("href", "https://rtl/video");
  });

  it("has a sticky play bar for small screens", () => {
    renderBreed("border-collie", [borderCollie]);

    expect(
      screen.getByRole("link", { name: "Ab 44:50 anhören" }),
    ).toHaveAttribute("href", "https://open.spotify.com/episode/abc?t=2690");
    expect(screen.getByText("Spotify · Folge 7")).toBeInTheDocument();
  });

  it("lists the facts", () => {
    renderBreed("border-collie", [borderCollie]);

    const facts = screen.getByRole("list", { name: "Steckbrief" });
    const text = within(facts)
      .getAllByRole("listitem")
      .map((item) => item.textContent);
    expect(text).toEqual([
      "FCI-Nummer297",
      "GruppeI · Hütehunde",
      "Vorgestellt08.04.2026",
      "Portrait ab44:50",
      "GeratenMartinrichtig",
    ]);
  });

  it("explains missing FCI data and unguessed breeds", () => {
    renderBreed("elo", [
      makeBreed({
        id: "special_1",
        classification: { fci: undefined },
        details: { internal: "elo", public: ["Elo"] },
        podcast: [makePodcast({ meta: { isGuessable: false } as never })],
      }),
    ]);

    const facts = screen.getByRole("list", { name: "Steckbrief" });
    expect(
      within(facts).getByText("Nicht im FCI-Standard"),
    ).toBeInTheDocument();
    expect(within(facts).getByText("Ohne FCI")).toBeInTheDocument();
    expect(within(facts).getByText("Nicht geraten")).toBeInTheDocument();
    expect(screen.queryByText(/Auch aus Gruppe/)).toBeNull();
  });

  it("links further reading in a new tab", () => {
    renderBreed("border-collie", [borderCollie]);

    const link = screen.getByRole("link", { name: "Wikipedia" });
    expect(link).toHaveAttribute(
      "href",
      "https://de.wikipedia.org/wiki/Border_Collie",
    );
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("switches image, episode and links with the variant pills", () => {
    renderBreed("corgi", [
      makeBreed({
        id: 38,
        classification: { fci: { group: 1, section: 1, standardNumber: 38 } },
        details: {
          internal: "corgi_cardigan",
          public: ["Welsh Corgi Cardigan"],
          groupAs: "Corgi",
        },
      }),
      makeBreed({
        id: 39,
        classification: { fci: { group: 1, section: 1, standardNumber: 39 } },
        podcast: [makePodcast({ number: 21 })],
        furtherReading: [{ name: "Pembroke-Club", url: "https://p.org" }],
        details: {
          internal: "corgi_pembroke",
          public: ["Welsh Corgi Pembroke"],
          groupAs: "Corgi",
        },
      }),
    ]);

    const cardigan = screen.getByRole("button", {
      name: "Welsh Corgi Cardigan",
    });
    expect(cardigan).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(
      screen.getByRole("button", { name: "Welsh Corgi Pembroke" }),
    );

    expect(
      screen.getByRole("button", { name: "Welsh Corgi Pembroke" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("Rasseportrait · Folge 21")).toBeInTheDocument();
    expect(
      screen.getByAltText("Corgi, Welsh Corgi Pembroke"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Pembroke-Club" }),
    ).toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith("Variant Selected", {
      breedId: expect.any(String),
      variantName: "Welsh Corgi Pembroke",
      index: 1,
    });
  });

  it("lists further appearances below the player", () => {
    renderBreed("border-collie", [
      makeBreed({
        podcast: [
          makePodcast({
            number: 3,
            episode: "Kleine Geschichten",
            meta: {
              internal: "personal_anecdote",
              public: "Persönliche Anekdote",
              timecode: 125,
            } as never,
          }),
          makePodcast(),
        ],
      }),
    ]);

    const more = screen.getByRole("region", {
      name: "Weitere Folgen mit dieser Rasse",
    });
    expect(
      within(more).getByText("Persönliche Anekdote · Folge 3"),
    ).toBeInTheDocument();
    expect(
      within(more).getByText("Kleine Geschichten · ab 2:05"),
    ).toBeInTheDocument();
    expect(screen.getByText("Rasseportrait · Folge 7")).toBeInTheDocument();
  });

  it("recommends other breeds of the same FCI group", () => {
    renderBreed("border-collie", [borderCollie, beardedCollie, beagle]);

    const related = screen.getByRole("region", { name: "Auch aus Gruppe I" });
    const link = within(related).getByRole("link");
    expect(link).toHaveAttribute("href", "/rasse/bearded-collie");
    expect(link).toHaveTextContent("Bearded Collie");
    expect(link).toHaveTextContent("Folge 195 · ab 42:37");
  });

  it("thanks contributors at the end", () => {
    renderBreed("border-collie", [borderCollie]);

    expect(
      screen.getByText("Danke an Robin für den Hinweis!"),
    ).toBeInTheDocument();
  });

  it("marks breeds that are not officially presented", () => {
    renderBreed("akita", [
      makeBreed({
        details: {
          internal: "akita",
          public: ["Akita"],
          isOfficiallyPresented: false,
        },
      }),
    ]);

    expect(
      screen.getByText("Noch nicht offiziell vorgestellt"),
    ).toBeInTheDocument();
  });

  it("goes back to the overview it came from, keeping its state", async () => {
    renderBreed("border-collie", [borderCollie], "grid");

    fireEvent.click(screen.getByRole("link", { name: "Alle Portraits" }));

    await waitFor(() =>
      expect(screen.getByTestId("location")).toHaveTextContent(
        "/?sort=previous",
      ),
    );
  });

  it("leaves modifier clicks on the back link to the browser (new tab)", () => {
    renderBreed("border-collie", [borderCollie], "grid");

    fireEvent.click(screen.getByRole("link", { name: "Alle Portraits" }), {
      metaKey: true,
    });
    fireEvent.click(screen.getByRole("link", { name: "Alle Portraits" }), {
      ctrlKey: true,
    });

    expect(screen.getByTestId("location")).toHaveTextContent(
      "/rasse/border-collie",
    );
  });

  it("goes to the overview when opened directly", async () => {
    renderBreed("border-collie", [borderCollie]);

    fireEvent.click(
      screen.getByRole("link", { name: "Zurück zu allen Portraits" }),
    );

    await waitFor(() =>
      expect(screen.getByTestId("location").textContent).toBe("/"),
    );
  });

  it("tracks the page view with its referrer", () => {
    renderBreed("border-collie", [borderCollie], "hero");

    expect(mockTrack).toHaveBeenCalledWith("Breed Page Viewed", {
      breedId: expect.any(String),
      breedName: "Border Collie",
      slug: "border-collie",
      referrer: "hero",
    });
  });

  it("says so when the slug is unknown", () => {
    renderBreed("dackelpudel", [borderCollie]);

    expect(
      screen.getByRole("heading", { name: "Rasse nicht gefunden" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Alle Portraits" }),
    ).toHaveAttribute("href", "/");
  });
});
