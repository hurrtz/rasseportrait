import React from "react";
import { act, fireEvent, screen, within } from "@testing-library/react";
import { renderWithProviders } from "~/test-utils";
import AreaPage from "../AreaPage";
import { area, makeIndex, seedHundewissen, summary } from "./fixtures";

const mockTrack = jest.fn();
jest.mock("~/hooks/useAmplitude", () => ({
  useAmplitude: () => ({ track: mockTrack }),
}));

const renderArea = (route = "/hundewissen/zucht-rassen", index = makeIndex()) => {
  seedHundewissen(index);
  return renderWithProviders(<AreaPage />, { path: "/hundewissen/:area", route });
};

const topicList = () => screen.getByRole("list", { name: "Themen" });
const topicRows = () =>
  within(topicList())
    .getAllByRole("link")
    .map((link) => link.textContent);

describe("area page", () => {
  beforeEach(() => mockTrack.mockClear());

  it("introduces the area", () => {
    renderArea();

    expect(
      screen.getByRole("heading", { level: 1, name: "Zucht & Rassen" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Hundewissen · Bereich")).toBeInTheDocument();
    expect(
      screen.getByText(
        "3 Themen aus 8 ausgewerteten Folgen, sortiert danach, wie oft sie vorkamen.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Alle Bereiche" })).toHaveAttribute(
      "href",
      "/hundewissen",
    );
    expect(
      screen.getByRole("link", { name: "Zurück zu allen Bereichen" }),
    ).toHaveAttribute("href", "/hundewissen");
  });

  it("lists its topics, the most discussed first", () => {
    renderArea();

    expect(topicRows()).toEqual([
      "Qualzuchten4 Folgen",
      "Rasseerhalt2 Folgen",
      "Zuchtverbände1 Folge",
    ]);
    const first = within(topicList()).getAllByRole("link")[0];
    expect(first).toHaveAttribute("href", "/hundewissen/zucht-rassen/qualzuchten");
  });

  it("highlights topics from more than one episode", () => {
    renderArea();

    const pills = within(topicList())
      .getAllByText(/Folgen?$/)
      .map((pill) => [pill.textContent, pill.getAttribute("data-accent")]);
    expect(pills).toEqual([
      ["4 Folgen", "true"],
      ["2 Folgen", "true"],
      ["1 Folge", null],
    ]);
  });

  it("orders topics with the same count alphabetically", () => {
    renderArea(
      undefined,
      makeIndex({
        topics: [
          summary("zecken", "Zecken", "zucht-rassen"),
          summary("aerger", "Ärger", "zucht-rassen"),
          summary("bellen", "Bellen", "zucht-rassen"),
        ],
      }),
    );

    expect(topicRows()).toEqual(["Ärger1 Folge", "Bellen1 Folge", "Zecken1 Folge"]);
  });

  it("shows other areas with their thumbnail, as decoration beside the name", () => {
    const index = makeIndex();
    index.areas[1].image = {
      src: "/rasseportrait/illustrations/hundewissen/gesundheit-medizin/illustration.jpeg",
      thumbnail:
        "/rasseportrait/illustrations/hundewissen/gesundheit-medizin/illustration_thumbnail.jpeg",
      alt: "Eine Tierärztin hört einen Hund ab",
    };
    renderArea(undefined, index);

    const others = screen.getByRole("complementary", { name: "Andere Bereiche" });
    const link = within(others).getByRole("link", { name: /Gesundheit & Medizin/ });
    expect(link.querySelector("img")).toHaveAttribute(
      "src",
      "/rasseportrait/illustrations/hundewissen/gesundheit-medizin/illustration_thumbnail.jpeg",
    );
    expect(link.querySelector("img")).toHaveAttribute("alt", "");
  });

  it("links the other areas", () => {
    renderArea();

    const others = screen.getByRole("complementary", { name: "Andere Bereiche" });
    expect(
      within(others)
        .getAllByRole("link")
        .map((link) => [link.textContent, link.getAttribute("href")]),
    ).toEqual([["Gesundheit & Medizin1 Thema", "/hundewissen/gesundheit-medizin"]]);
  });

  it("shows the area picture when there is one", () => {
    const index = makeIndex();
    index.areas[0].image = {
      src: "/rasseportrait/illustrations/hundewissen/zucht-rassen/illustration.jpeg",
      thumbnail:
        "/rasseportrait/illustrations/hundewissen/zucht-rassen/illustration_thumbnail.jpeg",
      alt: "Zwei Welpen im Körbchen",
    };
    renderArea(undefined, index);

    expect(screen.getByRole("img", { name: "Zwei Welpen im Körbchen" })).toHaveAttribute(
      "src",
      "/rasseportrait/illustrations/hundewissen/zucht-rassen/illustration.jpeg",
    );
  });

  describe("with more than 30 topics", () => {
    const many = makeIndex({
      areas: [area("zucht-rassen", "Zucht & Rassen", 35)],
      topics: Array.from({ length: 35 }, (_, i) =>
        summary(`thema-${i}`, `Thema ${String(i).padStart(2, "0")}`, "zucht-rassen"),
      ),
    });

    it("shows 30 and offers the rest", () => {
      renderArea(undefined, many);

      expect(topicRows()).toHaveLength(30);
      fireEvent.click(screen.getByRole("button", { name: "Weitere 5 Themen zeigen" }));
      expect(topicRows()).toHaveLength(35);
    });

    it("can search the area", () => {
      jest.useFakeTimers();
      renderArea(undefined, many);

      fireEvent.change(screen.getByRole("searchbox", { name: "In Zucht & Rassen suchen" }), {
        target: { value: "Thema 34" },
      });
      act(() => {
        jest.advanceTimersByTime(300);
      });

      expect(topicRows()[0]).toBe("Thema 341 Folge");
      jest.useRealTimers();
    });
  });

  it("has no search for a short list", () => {
    renderArea();

    expect(screen.queryByRole("searchbox")).not.toBeInTheDocument();
  });

  it("says so for an area that does not exist", () => {
    renderArea("/hundewissen/kochen");

    expect(
      screen.getByRole("heading", { level: 1, name: "Bereich nicht gefunden" }),
    ).toBeInTheDocument();
  });

  it("tracks the view", () => {
    renderArea();

    expect(mockTrack).toHaveBeenCalledWith("Hundewissen Area Viewed", {
      area: "zucht-rassen",
    });
  });
});
