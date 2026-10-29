/** @jest-environment node */
import { episodeDocument, parseTranscript } from "../search";
import type { TopicIndexFile } from "../compile";

const index: TopicIndexFile = {
  generated: "2026-10-29",
  indexedEpisodes: 1,
  totalEpisodes: 1,
  episodes: {
    "mina-019": {
      feed: "mina",
      number: 19,
      title: 'Title <script> & "quoted"',
      published: "2026-10-29",
      duration: 180,
      audioUrl: "https://cdn.example/audio.mp3?v=2",
      breeds: [{ name: "English Pointer", start: "0:01:20" }],
      portrait: { present: true, breed: "English Pointer", start: "0:01:20" },
    },
  },
  topics: [
    {
      id: "qualzuchten",
      label: "Qualzuchten",
      category: "Zucht & Rassen",
      description: "",
      episodeCount: 1,
      entries: [
        {
          episode: "mina-019",
          number: 19,
          title: "Example",
          label: "Französische Bulldogge",
          start: "0:00:20",
          end: "0:00:55",
          weight: "main",
          kind: "discussion",
          summaries: ["Atemprobleme bei Frenchies."],
        },
      ],
    },
  ],
};

describe("transcript search compilation", () => {
  it("parses Whisper and publisher timestamps without losing fractions", () => {
    expect(parseTranscript("[0:00:10] A\n[00:01:02.143] B\r\n")).toEqual([
      { start: 10, text: "A" },
      { start: 62.143, text: "B" },
    ]);
  });

  it.each(["", "plain text", "[0:00:20] A\n[0:00:10] B"])(
    "rejects unusable transcripts instead of silently omitting content: %s",
    (text) => {
      expect(() => parseTranscript(text)).toThrow();
    },
  );

  it("retains all transcript text, escapes HTML and enriches only the relevant recording", () => {
    const doc = episodeDocument(
      "mina-019",
      index,
      "[0:00:10] <script>alert('x')</script>\n[0:01:10] Eine englische Bulldogge.\n[0:02:10] Letzter Satz.",
      new Map([
        [
          "qualzuchten",
          { id: "qualzuchten", label: "Qualzuchten", area: "zucht-rassen" },
        ],
      ]),
    );
    expect(doc.content).toContain("&lt;script&gt;");
    expect(doc.content).not.toContain("<script>");
    expect(doc.content).toContain("Letzter Satz.");
    expect(doc.content).toContain('data-alias="synbreed101x"');
    expect(doc.content).toContain('data-alias="synbreed149x"');
    expect(doc.episode.audioUrl).toBe("https://cdn.example/audio.mp3?v=2");
    expect(doc.episode.passages[0].topics[0].id).toBe("qualzuchten");
    expect(
      doc.episode.passages.find(({ start }) => start === 70)?.topics,
    ).toEqual([]);
    expect(doc.content).not.toContain("synbreed1x"); // episode-level portrait isn't passage evidence
  });

  it("recognizes a breed name split over transcript lines and the minute boundary", () => {
    const doc = episodeDocument(
      "mina-019",
      { ...index, topics: [] },
      "[0:00:00] Einleitung.\n[0:00:59] Die französische\n[0:01:01] Bulldogge schnarcht.\n[0:01:20] Neues Thema.",
      new Map(),
    );
    expect(doc.content).toContain(
      'data-alias="synbreed101x">französische Bulldogge',
    );
    expect(doc.episode.passages).toHaveLength(3);
    expect(doc.episode.passages[1].start).toBe(59);
    expect(doc.episode.passages[2].start).toBe(80);
  });
});
