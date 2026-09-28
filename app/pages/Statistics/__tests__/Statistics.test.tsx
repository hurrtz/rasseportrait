import React from "react";
import { fireEvent, screen, within } from "@testing-library/react";
import type { Breed } from "types/breed";
import {
  makeBreed,
  makePodcast,
  renderWithProviders,
  resetBreedsStore,
  seedBreeds,
} from "~/test-utils";
import Statistics from "../Statistics";

jest.mock("~/hooks/useAmplitude", () => ({
  useAmplitude: () => ({ track: jest.fn() }),
}));

const portrait = (meta: object, number: number | string = 7) =>
  makePodcast({ number, meta: meta as never });

const breed = (
  id: number | string,
  internal: string,
  name: string,
  group: number | undefined,
  podcast: ReturnType<typeof makePodcast>[],
  details: Partial<Breed["details"]> = {},
) =>
  makeBreed({
    id,
    classification: {
      fci: group
        ? { group, section: 1, standardNumber: Number(id) }
        : undefined,
    },
    details: { internal, public: [name], ...details },
    podcast,
  });

const rawBreeds = [
  breed("special_1", "elo", "Elo", undefined, [
    portrait({ airDate: "2021-10-19", isGuessable: false }),
  ]),
  breed(297, "border_collie", "Border Collie", 1, [
    portrait({ airDate: "2026-06-04" }, 15),
  ]),
  breed(161, "beagle", "Beagle", 6, [
    portrait({ airDate: "2024-05-01", isGuessedCorrectly: false }),
  ]),
  breed(336, "spanish_water_dog", "Spanischer Wasserhund", 8, [
    portrait({ airDate: "2022-10-27", isGuessedCorrectly: undefined }),
  ]),
  breed(172, "poodle", "Pudel", 9, [
    portrait({ airDate: "2023-03-03", guessedBy: "ka" }),
  ]),
  breed(
    255,
    "akita",
    "Akita",
    5,
    [portrait({ internal: "other", airDate: "2025-01-01" })],
    { isOfficiallyPresented: false },
  ),
];

const card = (eyebrow: string) => screen.getByRole("region", { name: eyebrow });

describe("Statistik page", () => {
  beforeEach(() => {
    resetBreedsStore();
    seedBreeds(rawBreeds);
  });

  it("states how current the numbers are", () => {
    renderWithProviders(<Statistics />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Statistik" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Stand: Folge 15, 4. Juni 2026"),
    ).toBeInTheDocument();
  });

  it("shows the progress through the FCI list", () => {
    renderWithProviders(<Statistics />);

    const fci = card("FCI-Rasseliste");
    expect(fci).toHaveTextContent("5 von 362");
    expect(fci).toHaveTextContent("1,38 %");
    expect(fci).toHaveTextContent(
      "Vorgestellte Rassen aus der FCI-Liste: 346 anerkannte und 16 vorläufig anerkannte Rassen.",
    );
  });

  it("compares the guessing rates with the water dog caveat", () => {
    renderWithProviders(<Statistics />);

    const guesses = card("Wer errät die Rasse?");
    expect(guesses).toHaveTextContent("Martin33,33 %");
    expect(guesses).toHaveTextContent(
      "1 von 3 erratbaren Rassen richtig. Der Spanische Wasserhund wird nicht gewertet.",
    );
    expect(
      within(guesses).getByRole("link", { name: "Spanische Wasserhund" }),
    ).toHaveAttribute("href", "/rasse/spanish-water-dog");
    expect(guesses).toHaveTextContent("Katharina100 %");
    expect(guesses).toHaveTextContent("1 von 1 erratbaren Rasse richtig.");
  });

  it("charts the portraits per year and marks the running year", () => {
    renderWithProviders(<Statistics />);

    const years = card("Portraits pro Jahr");
    expect(
      within(years).getByRole("heading", {
        name: "Seit Oktober 2021 im Podcast",
      }),
    ).toBeInTheDocument();
    expect(
      within(years)
        .getAllByRole("listitem")
        .map((item) => item.getAttribute("aria-label")),
    ).toEqual([
      "2021: 1 Portrait",
      "2022: 1 Portrait",
      "2023: 1 Portrait",
      "2024: 1 Portrait",
      "2025: 0 Portraits",
      "2026: 1 Portrait",
    ]);
    expect(years).toHaveTextContent("2026 bis Juni, gestrichelt.");
  });

  it("ranks the FCI groups", () => {
    renderWithProviders(<Statistics />);

    const groups = card("Portraits je FCI-Gruppe");
    expect(
      within(groups).getByRole("heading", {
        name: "Hütehunde und Laufhunde vorn",
      }),
    ).toBeInTheDocument();
    const rows = within(groups).getAllByRole("listitem");
    expect(rows).toHaveLength(10);
    expect(rows[0]).toHaveAttribute(
      "aria-label",
      "Gruppe I, Hüte- und Treibhunde: 1",
    );
    expect(groups).toHaveTextContent("Dazu 1 Rasse ohne FCI-Anerkennung.");
  });

  it("links breeds outside the FCI list and those only mentioned", () => {
    renderWithProviders(<Statistics />);

    const outside = card("Außerhalb der FCI-Liste vorgestellt");
    expect(within(outside).getByRole("link", { name: "Elo" })).toHaveAttribute(
      "href",
      "/rasse/elo",
    );
    expect(
      within(outside).getByRole("link", { name: "Akita" }),
    ).toHaveAttribute("href", "/rasse/akita");
  });

  it("folds long chip lists behind a '+ n weitere' chip", () => {
    const many = Array.from({ length: 10 }, (_, i) =>
      breed(`special_${i + 10}`, `extra_${i}`, `Extra ${i}`, undefined, [
        portrait({ airDate: "2022-01-01" }),
      ]),
    );
    seedBreeds([...rawBreeds, ...many]);
    renderWithProviders(<Statistics />);

    const more = screen.getByRole("button", { name: "+ 3 weitere" });
    expect(more).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(more);

    expect(screen.queryByRole("button", { name: "+ 3 weitere" })).toBeNull();
  });
});
