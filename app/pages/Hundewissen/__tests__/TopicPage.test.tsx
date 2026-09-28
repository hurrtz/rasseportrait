import React from "react";
import { fireEvent, screen, within } from "@testing-library/react";
import useHundewissenStore from "~/stores/hundewissen";
import { renderWithProviders } from "~/test-utils";
import TopicPage from "../TopicPage";
import { makeIndex, makeTopic, seedHundewissen } from "./fixtures";

const mockTrack = jest.fn();
jest.mock("~/hooks/useAmplitude", () => ({
  useAmplitude: () => ({ track: mockTrack }),
}));

const PATH = "/hundewissen/:area/:topic";

const renderTopic = (
  route = "/hundewissen/zucht-rassen/qualzuchten",
  topic = makeTopic(),
  state?: object,
) => {
  seedHundewissen(makeIndex(), [topic]);
  return renderWithProviders(<TopicPage />, {
    path: PATH,
    entries: [{ pathname: route, state }],
  });
};

const episodeCards = () =>
  screen.getAllByRole("heading", { level: 3 }).map(({ textContent }) => textContent);

describe("topic page", () => {
  beforeEach(() => mockTrack.mockClear());

  it("names the topic, its area and how much there is to hear", () => {
    renderTopic();

    const crumbs = screen.getByRole("navigation", { name: "Brotkrumen" });
    expect(within(crumbs).getByRole("link", { name: "Hundewissen" })).toHaveAttribute(
      "href",
      "/hundewissen",
    );
    expect(
      within(crumbs).getByRole("link", { name: "Zucht & Rassen" }),
    ).toHaveAttribute("href", "/hundewissen/zucht-rassen");
    expect(within(crumbs).getByText("Qualzuchten")).toHaveAttribute(
      "aria-current",
      "page",
    );

    expect(screen.getByRole("heading", { level: 1, name: "Qualzuchten" })).toBeInTheDocument();
    expect(screen.getByText("Zucht & Rassen · Thema")).toBeInTheDocument();
    expect(
      screen.getByText("Zucht auf extreme Merkmale, die die Gesundheit schädigt."),
    ).toBeInTheDocument();

    const facts = screen.getByRole("list", { name: "Umfang" });
    expect(
      within(facts)
        .getAllByRole("listitem")
        .map(({ textContent }) => textContent),
    ).toEqual(["4 Folgen", "6 Stellen", "12 Min. zum Nachhören"]);
  });

  it("uses the singular for one episode and one entry", () => {
    renderTopic(
      undefined,
      makeTopic({
        episodeCount: 1,
        entryCount: 1,
        totalMinutes: 2,
        episodes: [makeTopic().episodes[3]],
      }),
    );

    expect(
      within(screen.getByRole("list", { name: "Umfang" }))
        .getAllByRole("listitem")
        .map(({ textContent }) => textContent),
    ).toEqual(["1 Folge", "1 Stelle", "2 Min. zum Nachhören"]);
    expect(screen.getByText("1 Stelle zu diesem Thema")).toBeInTheDocument();
  });

  it("offers the featured entry to play directly", () => {
    renderTopic();

    const featured = screen.getByRole("region", { name: "Direkt zum Thema" });
    expect(
      within(featured).getByRole("link", { name: "Ab 30:28 auf Spotify anhören" }),
    ).toHaveAttribute("href", "https://open.spotify.com/episode/e229?t=1828");
    expect(within(featured).getByText("Riesen, Hämorrhoiden & Essgeräusche")).toBeInTheDocument();
    expect(within(featured).getByText("Folge 229 · 1. Oktober 2025")).toBeInTheDocument();
    expect(within(featured).getByText("30:28 bis 32:24")).toBeInTheDocument();
    expect(within(featured).getByText("Spotify")).toBeInTheDocument();
  });

  it("lists every entry grouped by episode, newest first", () => {
    renderTopic();

    expect(episodeCards()).toEqual([
      "Riesen, Hämorrhoiden & Essgeräusche",
      "Verona, Veggie-Futter & Vorsorge",
      "Der große Leberwursttest",
      "Otterjagd & Dackelkatzen",
    ]);

    const first = screen.getByRole("article", {
      name: "Riesen, Hämorrhoiden & Essgeräusche",
    });
    expect(within(first).getByText("Folge 229 · 1. Oktober 2025")).toBeInTheDocument();
    expect(within(first).getByText("2 Stellen zu diesem Thema")).toBeInTheDocument();
    expect(within(first).getByText("30:28–32:24")).toBeInTheDocument();
    expect(within(first).getByText("2 Min. · Diskussion")).toBeInTheDocument();
    expect(within(first).getByText("Hauptthema")).toBeInTheDocument();
    expect(within(first).getByText("Genetische Enge in der Zucht")).toBeInTheDocument();
    expect(within(first).getByText("1 Min. · Nachricht")).toBeInTheDocument();
    expect(within(first).getByText("Randbemerkung")).toBeInTheDocument();
    expect(within(first).getByText("Hinweis auf eine TV-Folge zu Qualzucht.")).toBeInTheDocument();
    expect(within(first).getByRole("link", { name: "Ab 39:52 anhören" })).toHaveAttribute(
      "href",
      "https://open.spotify.com/episode/e229?t=2392",
    );
  });

  it("puts episodes with a main entry first, by their longest entry", () => {
    renderTopic();

    fireEvent.click(screen.getByRole("radio", { name: "Hauptthema zuerst" }));

    // longest entries: 5:24, 2:19, 1:56; 228 has only a side remark
    expect(episodeCards()).toEqual([
      "Otterjagd & Dackelkatzen",
      "Der große Leberwursttest",
      "Riesen, Hämorrhoiden & Essgeräusche",
      "Verona, Veggie-Futter & Vorsorge",
    ]);
  });

  it("shows two episodes on small screens until asked for more", () => {
    renderTopic();

    const more = screen.getByRole("button", { name: "2 weitere Folgen zeigen" });
    const hidden = screen.getByRole("article", { name: "Der große Leberwursttest" });
    expect(hidden).toHaveAttribute("data-collapsed", "true");

    fireEvent.click(more);

    expect(hidden).not.toHaveAttribute("data-collapsed");
    expect(screen.queryByRole("button", { name: /weitere Folgen/ })).not.toBeInTheDocument();
  });

  it("asks for corrections by mail, naming the topic", () => {
    renderTopic();

    expect(
      screen.getByRole("link", { name: "rasseportrait@tobiaswinkler.berlin" }),
    ).toHaveAttribute(
      "href",
      "mailto:rasseportrait@tobiaswinkler.berlin?subject=Hundewissen%3A%20Qualzuchten",
    );
  });

  it("links the breeds of these episodes and related topics", () => {
    renderTopic();

    const breeds = screen.getByRole("complementary", { name: "Rassen in diesen Folgen" });
    expect(
      within(breeds).getByRole("link", { name: /Deutsche Dogge.*Rasseportrait in Folge 229/ }),
    ).toHaveAttribute("href", "/rasse/great-dane");
    expect(
      within(breeds).getByRole("link", { name: /Irischer Wolfshund.*Erwähnt in Folge 229/ }),
    ).toHaveAttribute("href", "/rasse/irish-wolfhound");

    const related = screen.getByRole("complementary", { name: "Verwandte Themen" });
    expect(
      within(related)
        .getAllByRole("link")
        .map((link) => [link.textContent, link.getAttribute("href")]),
    ).toEqual([
      ["Zucht & RassenRasseerhalt", "/hundewissen/zucht-rassen/rasseerhalt"],
      ["Gesundheit & MedizinGelenkprobleme", "/hundewissen/gesundheit-medizin/gelenke"],
    ]);
  });

  it("hides breeds and related topics when there are none", () => {
    renderTopic(undefined, makeTopic({ breeds: [], related: [] }));

    expect(screen.queryByText("Rassen in diesen Folgen")).not.toBeInTheDocument();
    expect(screen.queryByText("Verwandte Themen")).not.toBeInTheDocument();
  });

  it("shows the editorial text only when there is one", () => {
    const { unmount } = renderTopic();
    expect(screen.queryByText("Wird gerade recherchiert")).not.toBeInTheDocument();
    unmount();

    renderTopic(
      undefined,
      makeTopic({
        editorial: {
          content: "Qualzucht bezeichnet Zuchtformen,\nbei denen …\n\nZweiter Absatz.",
          status: "draft",
        },
      }),
    );

    expect(screen.getByText("Wird gerade recherchiert")).toBeInTheDocument();
    expect(screen.getByText("Qualzucht bezeichnet Zuchtformen, bei denen …")).toBeInTheDocument();
    expect(screen.getByText("Zweiter Absatz.")).toBeInTheDocument();
  });

  it("pins a play bar for the featured entry on small screens", () => {
    renderTopic();

    const bar = screen.getByRole("region", { name: "Wiedergabe" });
    expect(within(bar).getByText("Ab 30:28 anhören")).toBeInTheDocument();
    expect(within(bar).getByText("Spotify · Folge 229")).toBeInTheDocument();
  });

  it("names the feed audio when there is no Spotify or RTL+ link", () => {
    renderTopic(undefined, makeTopic({ featured: { episode: 3, entry: 0 } }));

    const featured = screen.getByRole("region", { name: "Direkt zum Thema" });
    expect(
      within(featured).getByRole("link", { name: "Ab 9:03 im Podcast-Feed anhören" }),
    ).toHaveAttribute("href", "https://feed.example/a04.mp3#t=543");
  });

  it("redirects a topic requested under another area to its own", () => {
    renderTopic("/hundewissen/gesundheit-medizin/qualzuchten");

    expect(screen.getByTestId("location")).toHaveTextContent(
      "/hundewissen/zucht-rassen/qualzuchten",
    );
  });

  it("says so for a topic that does not exist", () => {
    renderTopic("/hundewissen/zucht-rassen/gibt-es-nicht");

    expect(
      screen.getByRole("heading", { level: 1, name: "Thema nicht gefunden" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Alle Bereiche" })).toHaveAttribute(
      "href",
      "/hundewissen",
    );
  });

  it("offers a retry when the topic cannot be loaded", () => {
    seedHundewissen(makeIndex());
    useHundewissenStore.setState({ topics: { qualzuchten: { status: "error" } } });
    renderWithProviders(<TopicPage />, {
      path: PATH,
      route: "/hundewissen/zucht-rassen/qualzuchten",
    });

    expect(screen.getByText("Das Thema konnte nicht geladen werden.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Neu laden" })).toBeInTheDocument();
  });

  it("tracks the view with where the visitor came from", () => {
    renderTopic(undefined, makeTopic(), { from: "area" });

    expect(mockTrack).toHaveBeenCalledWith("Hundewissen Topic Viewed", {
      topicId: "qualzuchten",
      area: "zucht-rassen",
      referrer: "area",
    });
  });

  it("tracks a direct visit", () => {
    renderTopic();

    expect(mockTrack).toHaveBeenCalledWith(
      "Hundewissen Topic Viewed",
      expect.objectContaining({ referrer: "direct" }),
    );
  });

  it("tracks plays with their placement", () => {
    renderTopic();

    fireEvent.click(screen.getByRole("link", { name: "Ab 39:52 anhören" }));

    expect(mockTrack).toHaveBeenCalledWith("Play Clicked", {
      placement: "topic-entry",
      topicId: "qualzuchten",
      episodeId: "rtl-229",
      provider: "spotify",
      episodeNumber: 229,
      timecode: 2392,
    });
  });

  it("tracks clicks on related topics", () => {
    renderTopic();

    fireEvent.click(screen.getByRole("link", { name: /Rasseerhalt/ }));

    expect(mockTrack).toHaveBeenCalledWith("Related Topic Clicked", {
      fromTopicId: "qualzuchten",
      toTopicId: "rasseerhalt",
    });
  });
});
