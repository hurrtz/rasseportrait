import React from "react";
import { screen } from "@testing-library/react";
import { makeBreed, makePodcast, renderWithProviders } from "~/test-utils";
import { toDisplayBreeds } from "~/utils/breed";
import { HeroPortrait } from "..";

jest.mock("~/hooks/useAmplitude", () => ({
  useAmplitude: () => ({ track: jest.fn() }),
}));

const englishSetter = (overrides: Parameters<typeof makeBreed>[0] = {}) =>
  makeBreed({
    id: 2,
    classification: { fci: { group: 7, section: 2, standardNumber: 2 } },
    podcast: [
      makePodcast({
        number: 15,
        episode: "Fettige Ohren und Albtraumbabys",
        meta: { timecode: 2908, airDate: "2026-06-04" } as never,
      }),
    ],
    ...overrides,
    details: {
      internal: "english_setter",
      public: ["English Setter"],
      ...overrides.details,
    },
  });

const renderHero = (overrides?: Parameters<typeof makeBreed>[0]) => {
  const [breed] = toDisplayBreeds([englishSetter(overrides)]);
  renderWithProviders(<HeroPortrait breed={breed} />);
};

describe("HeroPortrait", () => {
  it("introduces the newest portrait with episode, date and name", () => {
    renderHero();

    expect(screen.getAllByText("Neues Portrait").length).toBeGreaterThan(0);
    expect(screen.getByText("Folge 15 · 4. Juni 2026")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "English Setter" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "aus »Fettige Ohren und Albtraumbabys« · FCI Nº 2, Vorstehhunde",
      ),
    ).toBeInTheDocument();
  });

  it("links the eagerly loaded illustration to the breed page", () => {
    renderHero();

    const image = screen.getByAltText("English Setter");
    expect(image).toHaveAttribute("loading", "eager");
    expect(image).toHaveAttribute("fetchpriority", "high");
    expect(image.closest("a")).toHaveAttribute("href", "/rasse/english-setter");
  });

  it("plays the portrait on Spotify at its timecode", () => {
    renderHero();

    const play = screen.getByRole("link", {
      name: "Portrait ab 48:28 anhören",
    });
    expect(play).toHaveAttribute(
      "href",
      "https://open.spotify.com/episode/abc?t=2908",
    );
    expect(
      screen.getByText("Öffnet Spotify an der richtigen Stelle"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Ab 48:28 anhören" }),
    ).toHaveAttribute("href", "https://open.spotify.com/episode/abc?t=2908");
  });

  it("says RTL+ when that is the only source", () => {
    renderHero({
      podcast: [
        makePodcast({
          sources: [
            { url: "https://plus.rtl.de/x", type: "audio", provider: "rtl" },
          ],
          meta: { airDate: "2026-06-04" } as never,
        }),
      ],
    });

    expect(screen.getByText("Öffnet RTL+")).toBeInTheDocument();
  });

  it("tells whether the host guessed the breed", () => {
    renderHero();

    expect(screen.getByText("Martin lag richtig")).toBeInTheDocument();
  });

  it("reports a wrong guess by Katharina", () => {
    renderHero({
      podcast: [
        makePodcast({
          meta: {
            airDate: "2026-06-04",
            guessedBy: "ka",
            isGuessedCorrectly: false,
          } as never,
        }),
      ],
    });

    expect(screen.getByText("Katharina lag daneben")).toBeInTheDocument();
  });

  it("leaves out guess and FCI when they do not apply", () => {
    renderHero({
      classification: { fci: undefined },
      podcast: [
        makePodcast({
          episode: "Elos",
          meta: { airDate: "2026-06-04", isGuessable: false } as never,
        }),
      ],
    });

    expect(screen.getByText("aus »Elos«")).toBeInTheDocument();
    expect(screen.queryByText(/lag (richtig|daneben)/)).toBeNull();
  });
});
