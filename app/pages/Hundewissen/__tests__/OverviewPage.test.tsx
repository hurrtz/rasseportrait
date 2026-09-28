import React from "react";
import { act, fireEvent, screen, within } from "@testing-library/react";
import type { HundewissenIndex } from "types/hundewissen";
import { renderWithProviders } from "~/test-utils";
import OverviewPage from "../OverviewPage";
import { area, makeIndex, seedHundewissen, summary } from "./fixtures";

const mockTrack = jest.fn();
jest.mock("~/hooks/useAmplitude", () => ({
  useAmplitude: () => ({ track: mockTrack }),
}));

const renderOverview = (index: HundewissenIndex = makeIndex(), route = "/hundewissen") => {
  seedHundewissen(index);
  return renderWithProviders(<OverviewPage />, { path: "/hundewissen", route });
};

const areaCards = () => within(screen.getByRole("list", { name: "Alle Bereiche" })).getAllByRole("link");

/** Seven areas with 7, 6, … 1 topics */
const sevenAreas = () => {
  const names = [
    ["tierschutz-ethik", "Tierschutz & Ethik"],
    ["verhalten-kommunikation", "Verhalten & Kommunikation"],
    ["zucht-rassen", "Zucht & Rassen"],
    ["erziehung-training", "Erziehung & Training"],
    ["haltung-pflege", "Haltung & Pflege"],
    ["gesundheit-medizin", "Gesundheit & Medizin"],
    ["ernaehrung", "Ernährung"],
  ];
  return makeIndex({
    areas: names.map(([slug, name], i) => area(slug, name, 7 - i)),
    topics: names.flatMap(([slug], i) =>
      Array.from({ length: 7 - i }, (_, j) => summary(`${slug}-${j}`, `${slug} ${j}`, slug)),
    ),
  });
};

describe("Hundewissen overview", () => {
  beforeEach(() => mockTrack.mockClear());

  it("introduces the page and the state of the analysis", () => {
    renderOverview();

    expect(screen.getByRole("heading", { level: 1, name: "Hundewissen" })).toBeInTheDocument();
    expect(
      screen.getByText(/Alles, was im Podcast neben den Rasseportraits besprochen wird/),
    ).toBeInTheDocument();

    const status = screen.getByRole("region", { name: "Stand der Auswertung" });
    expect(status).toHaveTextContent("8 von 260 Folgen");
    expect(status).toHaveTextContent(
      "4 Themen in 2 Bereichen. Die Sammlung wächst mit jeder ausgewerteten Folge.",
    );
  });

  it("says when every episode has been analysed", () => {
    renderOverview(makeIndex({ indexedEpisodes: 260 }));

    const status = screen.getByRole("region", { name: "Alle Folgen ausgewertet" });
    expect(status).toHaveTextContent("260 von 260 Folgen");
    expect(status).not.toHaveTextContent("Die Sammlung wächst");
  });

  it("offers every area as a chip", () => {
    renderOverview();

    const chips = screen.getByRole("navigation", { name: "Bereiche" });
    expect(
      within(chips)
        .getAllByRole("link")
        .map((link) => [link.textContent, link.getAttribute("href")]),
    ).toEqual([
      ["Alle", "/hundewissen"],
      ["Zucht & Rassen", "/hundewissen/zucht-rassen"],
      ["Gesundheit & Medizin", "/hundewissen/gesundheit-medizin"],
    ]);
    expect(within(chips).getByRole("link", { name: "Alle" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("shows the three most discussed topics", () => {
    renderOverview(
      makeIndex({
        topics: [
          summary("a", "Seltener", "zucht-rassen", 1),
          summary("b", "Häufig", "zucht-rassen", 5),
          summary("c", "Mittel, mehr Stellen", "gesundheit-medizin", 3, 6),
          summary("d", "Mittel", "zucht-rassen", 3, 3),
        ],
      }),
    );

    const frequent = screen.getByRole("region", { name: "Am häufigsten besprochen" });
    expect(
      within(frequent)
        .getAllByRole("link")
        .map((link) => [link.textContent, link.getAttribute("href")]),
    ).toEqual([
      ["Zucht & RassenHäufig5 Folgen", "/hundewissen/zucht-rassen/b"],
      ["Gesundheit & MedizinMittel, mehr Stellen3 Folgen", "/hundewissen/gesundheit-medizin/c"],
      ["Zucht & RassenMittel3 Folgen", "/hundewissen/zucht-rassen/d"],
    ]);
  });

  it("has no most discussed topics while every topic has one episode", () => {
    renderOverview(
      makeIndex({ topics: [summary("a", "A", "zucht-rassen"), summary("b", "B", "zucht-rassen")] }),
    );

    expect(screen.queryByText("Am häufigsten besprochen")).not.toBeInTheDocument();
  });

  it("shows each area with its biggest topics", () => {
    renderOverview();

    const [first] = areaCards();
    expect(first).toHaveAttribute("href", "/hundewissen/zucht-rassen");
    expect(within(first).getByText("Zucht & Rassen")).toBeInTheDocument();
    expect(within(first).getByText("3 Themen")).toBeInTheDocument();
    expect(
      within(first)
        .getAllByRole("listitem")
        .map(({ textContent }) => textContent),
    ).toEqual(["Qualzuchten4 Folgen", "Rasseerhalt2 Folgen", "Zuchtverbände1 Folge"]);
    expect(within(first).getByText("Alle 3 Themen")).toBeInTheDocument();
  });

  it("shows an area's picture on its card, as decoration beside the name", () => {
    const index = makeIndex();
    index.areas[0].image = {
      src: "/rasseportrait/illustrations/hundewissen/zucht-rassen/illustration.jpeg",
      thumbnail:
        "/rasseportrait/illustrations/hundewissen/zucht-rassen/illustration_thumbnail.jpeg",
      alt: "Eine Hündin mit ihren Welpen im Körbchen",
    };
    renderOverview(index);

    const image = areaCards()[0].querySelector("img");
    expect(image).toHaveAttribute(
      "src",
      "/rasseportrait/illustrations/hundewissen/zucht-rassen/illustration.jpeg",
    );
    expect(image).toHaveAttribute("alt", "");
  });

  it("loads only the thumbnail for compact rows on small screens", () => {
    const index = sevenAreas();
    index.areas[3].image = {
      src: "/x/erziehung-training/illustration.jpeg",
      thumbnail: "/x/erziehung-training/illustration_thumbnail.jpeg",
      alt: "Training",
    };
    renderOverview(index);

    const source = areaCards()[3].querySelector("picture source");
    expect(source).toHaveAttribute("srcset", "/x/erziehung-training/illustration_thumbnail.jpeg");
    expect(source).toHaveAttribute("media", "(max-width: 61.99em)");
  });

  it("lays out areas two wide, then three narrow", () => {
    renderOverview(sevenAreas());

    expect(areaCards().map((card) => card.getAttribute("data-span"))).toEqual([
      "6", "6", "4", "4", "4", "6", "6",
    ]);
  });

  it("lets a lone card in the last row span the full width", () => {
    renderOverview(
      makeIndex({
        areas: [
          area("zucht-rassen", "Zucht & Rassen", 2),
          area("gesundheit-medizin", "Gesundheit & Medizin", 1),
          area("ernaehrung", "Ernährung", 1),
        ],
        topics: [
          summary("a", "A", "zucht-rassen"),
          summary("b", "B", "zucht-rassen"),
          summary("c", "C", "gesundheit-medizin"),
          summary("d", "D", "ernaehrung"),
        ],
      }),
    );

    expect(areaCards().map((card) => card.getAttribute("data-span"))).toEqual(["6", "6", "12"]);
  });

  it("marks areas after the third as compact rows for small screens", () => {
    renderOverview(sevenAreas());

    expect(areaCards().map((card) => card.hasAttribute("data-compact"))).toEqual([
      false, false, false, true, true, true, true,
    ]);
  });

  describe("search", () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    const search = (value: string) => {
      fireEvent.change(screen.getByRole("searchbox", { name: "Themen durchsuchen" }), {
        target: { value },
      });
      act(() => {
        jest.advanceTimersByTime(300);
      });
    };

    it("lists matching topics instead of the areas", () => {
      renderOverview();

      search("Qualzucht");

      expect(
        screen.getByRole("heading", { level: 2, name: "1 Thema für »Qualzucht«" }),
      ).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /Qualzuchten/ })).toHaveAttribute(
        "href",
        "/hundewissen/zucht-rassen/qualzuchten",
      );
      expect(screen.queryByText("Alle Bereiche")).not.toBeInTheDocument();
      expect(mockTrack).toHaveBeenCalledWith("Hundewissen Search Performed", {
        searchTerm: "Qualzucht",
        resultsCount: 1,
      });
    });

    it("finds topics by their area's name", () => {
      renderOverview();

      search("Gesundheit");

      expect(screen.getByRole("link", { name: /Gelenkprobleme/ })).toBeInTheDocument();
    });

    it("says when nothing matches and can reset", () => {
      renderOverview();

      search("Xylophon");

      expect(screen.getByText("Kein Thema gefunden")).toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: "Suche zurücksetzen" }));
      act(() => {
        jest.advanceTimersByTime(300);
      });
      expect(screen.getByText("Alle Bereiche")).toBeInTheDocument();
    });
  });

  describe("old topic links", () => {
    it("lead to the topic's page", () => {
      renderOverview(makeIndex(), "/hundewissen?topic=qualzuchten");

      expect(screen.getByTestId("location")).toHaveTextContent(
        "/hundewissen/zucht-rassen/qualzuchten",
      );
    });

    it("of topics that no longer exist lead to the overview", () => {
      renderOverview(makeIndex(), "/hundewissen?topic=silvester");

      expect(screen.getByTestId("location").textContent).toBe("/hundewissen");
    });
  });
});
