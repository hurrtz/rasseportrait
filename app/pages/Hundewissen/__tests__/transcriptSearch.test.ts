import {
  audioAt,
  episodeHit,
  excerptParts,
  mergePassages,
  searchCompleteWords,
} from "../transcriptSearch";
import { resolveSearchQuery } from "../searchAliases";

describe("transcript search results", () => {
  it("does not turn an unknown long word into an unrelated short-word result", async () => {
    const search = jest.fn(async () => ({ results: [] }));
    expect(
      await searchCompleteWords({ search }, "Xylophonunfindbarzxq"),
    ).toEqual({ results: [] });
    expect(search.mock.calls).toEqual([['"Xylophonunfindbarzxq"']]);
  });
  it.each([
    "french bulldog",
    "Frenchies",
    "französische Bulldogge",
    "französischen Bulldoggen",
    "franzoesische bulldogge",
  ])("resolves %s to the same breed", (query) => {
    expect(resolveSearchQuery(query).term).toBe("synbreed101x");
  });
  it("keeps conditions and different breeds distinct, and preserves additional words", () => {
    expect(resolveSearchQuery("french bulldog qualzucht").term).toBe(
      "synbreed101x qualzucht",
    );
    expect(resolveSearchQuery("English bulldog").term).toBe("synbreed149x");
    expect(resolveSearchQuery("Qualzucht Brachyzephalie Bulldogge").term).toBe(
      "Qualzucht Brachyzephalie Bulldogge",
    );
  });
  it("merges adjacent matches but keeps separate discussions separate", () => {
    expect(
      mergePassages([
        { anchor: "t-120", start: 120, end: 180, topics: [], excerpt: "third" },
        { anchor: "t-0", start: 0, end: 60, topics: [], excerpt: "first" },
        { anchor: "t-60", start: 60, end: 90, topics: [], excerpt: "second" },
      ]).map(({ start, end }) => [start, end]),
    ).toEqual([
      [0, 90],
      [120, 180],
    ]);
  });
  it("uses each recording's exact audio URL and start, including query parameters", () => {
    expect(audioAt("https://cdn.example/episode.mp3?v=2#old", 248.14)).toBe(
      "https://cdn.example/episode.mp3?v=2#t=248",
    );
    expect(audioAt("javascript:alert(1)", 0)).toBeUndefined();
  });
  it("removes internal alias tokens, highlights the real name, and treats markup as text", () => {
    const parts = excerptParts(
      "60. <mark>synbreed101x.</mark> französische Bulldogge &amp; &lt;img onerror=evil&gt;",
      "French bulldog",
      60,
    );
    expect(parts.map(({ text }) => text).join("")).toBe(
      "französische Bulldogge & <img onerror=evil>",
    );
    expect(parts.find(({ highlight }) => highlight)?.text).toBe(
      "französische Bulldogge",
    );
  });
  it("ignores unanchored headings and preserves rerun metadata and timecodes", () => {
    const episode = {
      id: "rerun",
      number: "Summer Edition #4",
      title: "Example",
      published: "2026-07-01",
      audioUrl: "https://example.com/rerun.mp3",
      passages: [{ anchor: "t-302", start: 302, end: 362, topics: [] }],
    };
    const hit = episodeHit({
      meta: { episode: JSON.stringify(episode) },
      sub_results: [
        { url: "/", excerpt: "generic title" },
        {
          url: "/#t-302",
          anchor: { id: "t-302" },
          excerpt: "matching passage",
        },
      ],
    });
    expect(hit.episode).toEqual(episode);
    expect(hit.passages).toEqual([
      {
        anchor: "t-302",
        start: 302,
        end: 362,
        topics: [],
        excerpt: "matching passage",
      },
    ]);
  });
});
