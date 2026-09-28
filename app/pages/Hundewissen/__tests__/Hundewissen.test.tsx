import React from "react";
import { fireEvent, screen, within } from "@testing-library/react";
import type { KnowledgeTopic } from "types/knowledge";
import useKnowledgeStore from "~/stores/knowledge";
import { makePodcast, renderWithProviders } from "~/test-utils";
import Hundewissen from "../Hundewissen";

const mockTrack = jest.fn();
jest.mock("~/hooks/useAmplitude", () => ({
  useAmplitude: () => ({ track: mockTrack }),
}));

const topic = (
  id: string,
  title: string,
  overrides: Partial<KnowledgeTopic> = {},
): KnowledgeTopic => ({
  id,
  title: { internal: id, public: title },
  summary: `Worum es bei ${title} geht.`,
  status: "draft",
  content: `${title} erster Satz,\nder weitergeht.\n\nZweiter Absatz.`,
  podcast: [],
  furtherReading: [],
  ...overrides,
});

const topics = [
  topic("hundesprache", "Hundesprache"),
  topic("medizin", "Medizin", {
    status: "published",
    podcast: [
      makePodcast({
        number: 12,
        episode: "Beim Tierarzt",
        meta: { internal: "listener_question", public: "Hörerfrage" } as never,
      }),
    ],
    furtherReading: [{ name: "Tierärztekammer", url: "https://tk.de" }],
  }),
  topic("qualzuchten", "Qualzuchten"),
];

const renderAt = (route = "/hundewissen") => {
  useKnowledgeStore.setState({ topics, status: "ready", error: null });
  return renderWithProviders(<Hundewissen />, { route });
};

const article = () => screen.getByRole("article");

describe("Hundewissen page", () => {
  beforeEach(() => mockTrack.mockClear());

  it("introduces the page", () => {
    renderAt();

    expect(
      screen.getByRole("heading", { level: 1, name: "Hundewissen" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Hintergründe zu Themen, die im Podcast immer wieder vorkommen.",
      ),
    ).toBeInTheDocument();
  });

  it("lists the topics with their summaries and marks the open one", () => {
    renderAt("/hundewissen?topic=qualzuchten");

    const nav = screen.getByRole("navigation", { name: "Themen" });
    const links = within(nav).getAllByRole("link");
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "/hundewissen?topic=hundesprache",
      "/hundewissen?topic=medizin",
      "/hundewissen?topic=qualzuchten",
    ]);
    expect(links[0]).toHaveTextContent("Worum es bei Hundesprache geht.");
    expect(links[2]).toHaveAttribute("aria-current", "page");
  });

  it("opens the first topic without a topic in the URL", () => {
    renderAt();

    expect(
      within(article()).getByRole("heading", { name: "Hundesprache" }),
    ).toBeInTheDocument();
    expect(article()).toHaveTextContent("Thema 1 von 3");
  });

  it("falls back to the first topic for an unknown id", () => {
    renderAt("/hundewissen?topic=gibtsnicht");

    expect(
      within(article()).getByRole("heading", { name: "Hundesprache" }),
    ).toBeInTheDocument();
  });

  it("shows a draft honestly, with paragraphs from blank lines only", () => {
    renderAt("/hundewissen?topic=qualzuchten");

    expect(article()).toHaveTextContent("Thema 3 von 3");
    expect(
      within(article()).getByText("Wird gerade recherchiert"),
    ).toBeInTheDocument();
    const paragraphs = within(article())
      .getAllByText(/Qualzuchten erster Satz|Zweiter Absatz/)
      .map((p) => p.textContent);
    expect(paragraphs).toEqual([
      "Qualzuchten erster Satz, der weitergeht.",
      "Zweiter Absatz.",
    ]);
  });

  it("invites listeners to suggest episodes when none are linked", () => {
    renderAt("/hundewissen?topic=qualzuchten");

    expect(
      within(article()).getByText("Noch keine Folgen verknüpft"),
    ).toBeInTheDocument();
    expect(
      within(article()).getByRole("link", {
        name: "rasseportrait@tobiaswinkler.berlin",
      }),
    ).toHaveAttribute("href", "mailto:rasseportrait@tobiaswinkler.berlin");
  });

  it("has no empty sections for a topic without links", () => {
    renderAt("/hundewissen?topic=qualzuchten");

    expect(within(article()).getAllByRole("heading")).toHaveLength(1);
    expect(
      within(article()).queryByRole("link", { name: /Tierärztekammer/ }),
    ).toBeNull();
  });

  it("lists linked episodes and further reading of a published topic", () => {
    renderAt("/hundewissen?topic=medizin");

    expect(
      within(article()).queryByText("Wird gerade recherchiert"),
    ).toBeNull();
    expect(
      within(article()).queryByText("Noch keine Folgen verknüpft"),
    ).toBeNull();
    expect(
      within(article()).getByText("Hörerfrage · Folge 12"),
    ).toBeInTheDocument();
    expect(
      within(article()).getByRole("link", { name: "Tierärztekammer" }),
    ).toHaveAttribute("href", "https://tk.de");
  });

  it("switches topics from the list and tracks the choice", () => {
    renderAt();

    fireEvent.click(
      within(screen.getByRole("navigation", { name: "Themen" })).getByRole(
        "link",
        { name: /Medizin/ },
      ),
    );

    expect(
      within(article()).getByRole("heading", { name: "Medizin" }),
    ).toBeInTheDocument();
    expect(mockTrack).toHaveBeenCalledWith("Knowledge Topic Selected", {
      topicId: "medizin",
      topicTitle: "Medizin",
      hasPodcastEpisodes: true,
      episodeCount: 1,
    });
  });
});
