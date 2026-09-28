/**
 * @jest-environment node
 */
import { makeBreed, makePodcast } from "~/test-utils";
import type { Breed } from "types/breed";
import {
  compileHundewissen,
  type CompileInput,
  type IndexEpisode,
  type IndexTopic,
  type TopicIndexFile,
} from "../compile";

const spotify = (id: string) => ({
  url: `https://open.spotify.com/episode/${id}`,
  type: "audio" as const,
  provider: "spotify" as const,
});
const rtl = (id: string) => ({
  url: `https://plus.rtl.de/podcast/${id}`,
  type: "audio" as const,
  provider: "rtl" as const,
});

const episode = (overrides: Partial<IndexEpisode>): IndexEpisode => ({
  feed: "rtl",
  number: 229,
  title: "Riesen, Hämorrhoiden & Essgeräusche",
  published: "2025-10-09",
  duration: 3600,
  audioUrl: "https://feed.example/229.mp3?v=1",
  breeds: [],
  portrait: { present: false, breed: "", start: "" },
  ...overrides,
});

const EPISODES: Record<string, IndexEpisode> = {
  "rtl-229": episode({
    breeds: [
      { name: "Deutsche Dogge", start: "0:30:40" },
      { name: "Sabueso Español (Spanischer Laufhund)", start: "0:05:00" },
      { name: "Wolpertinger", start: "0:06:00" },
    ],
    portrait: { present: true, breed: "Border Collie", start: "0:50:00" },
  }),
  // on the site as Folge 157
  "rtl-summer-a04": episode({
    number: "Summer Edition #4",
    title: "Otterjagd & Dackelkatzen",
    published: "2024-03-15",
    audioUrl: "https://feed.example/a04.mp3",
    breeds: [{ name: "Kaninchen-Dachshund", start: "0:10:00" }],
  }),
  // the site has another title for Folge 150
  "rtl-150": episode({
    number: 150,
    title: "Titel im Feed",
    published: "2023-12-01",
    audioUrl: "https://feed.example/150.mp3",
  }),
  // not on the site at all
  "mina-003": episode({
    feed: "mina",
    number: 3,
    title: "Nicht auf der Seite",
    published: "2026-03-12",
    audioUrl: "https://feed.example/mina-3.mp3",
    breeds: [{ name: "Pudel", start: "0:02:00" }],
  }),
};

const entry = (
  overrides: Partial<IndexTopic["entries"][number]>,
): IndexTopic["entries"][number] => ({
  label: "Riesenwuchs als Qualzucht",
  episode: "rtl-229",
  number: 229,
  title: "Riesen, Hämorrhoiden & Essgeräusche",
  start: "0:30:28",
  end: "0:32:24",
  weight: "main",
  kind: "discussion",
  summaries: ["Kritik am Rassestandard der Deutschen Dogge."],
  ...overrides,
});

const topic = (overrides: Partial<IndexTopic>): IndexTopic => {
  const entries = overrides.entries ?? [entry({})];
  return {
    id: "qualzuchten",
    label: "Qualzuchten",
    category: "Zucht & Rassen",
    description: "Zucht auf extreme Merkmale.",
    episodeCount: new Set(entries.map((e) => e.episode)).size,
    ...overrides,
    entries,
  };
};

const indexFile = (topics: IndexTopic[]): TopicIndexFile => ({
  generated: "2026-09-28",
  indexedEpisodes: 4,
  totalEpisodes: 260,
  episodes: EPISODES,
  topics,
});

const BREEDS: Breed[] = [
  makeBreed({
    id: 297,
    details: { internal: "border_collie", public: ["Border Collie"] },
    podcast: [
      makePodcast({
        number: 229,
        episode: "Riesen, Hämorrhoiden und Essgeräusche",
        sources: [spotify("e229"), rtl("e229")],
        meta: { airDate: "2025-10-09" } as never,
      }),
    ],
  }),
  makeBreed({
    id: 235,
    details: { internal: "deutsche_dogge", public: ["Deutsche Dogge"] },
    podcast: [
      makePodcast({
        number: 157,
        episode: "Otterjagd & Dackelkatzen",
        sources: [spotify("e157")],
        meta: { internal: "listener_question", airDate: "2024-03-14" } as never,
      }),
    ],
  }),
  makeBreed({
    id: 204,
    details: { internal: "sabueso_espanol", public: ["Sabueso Español"] },
    podcast: [
      makePodcast({
        number: 150,
        episode: "Titel auf der Seite",
        sources: [rtl("e150")],
        meta: { airDate: "2023-11-30" } as never,
      }),
    ],
  }),
  makeBreed({
    id: 148,
    details: {
      internal: "dachshund",
      public: ["Dachshund"],
      variants: [
        { internal: "kaninchen", public: "Kaninchen-Dachshund" },
        { internal: "zwerg", public: "Zwerg-Dachshund" },
      ],
    },
    podcast: [],
  }),
  makeBreed({
    id: 172,
    details: { internal: "pudel", public: ["Pudel"] },
    podcast: [],
  }),
];

const compile = (topics: IndexTopic[], extra: Partial<CompileInput> = {}) =>
  compileHundewissen({
    index: indexFile(topics),
    rawBreeds: BREEDS,
    warn: () => {},
    ...extra,
  });

const onlyTopic = (overrides: Partial<IndexTopic>) =>
  compile([topic(overrides)]).topics[0];

describe("episode matching", () => {
  it("finds the site's episode by title and takes its number and date", () => {
    const { episodes } = onlyTopic({
      entries: [entry({ episode: "rtl-summer-a04", number: "Summer Edition #4" })],
    });

    expect(episodes[0]).toMatchObject({
      id: "rtl-summer-a04",
      number: 157,
      title: "Otterjagd & Dackelkatzen",
      airDate: "2024-03-14",
    });
  });

  it("ignores case, punctuation and the ampersand when comparing titles", () => {
    const { episodes } = onlyTopic({});

    expect(episodes[0]).toMatchObject({ number: 229, airDate: "2025-10-09" });
  });

  it("falls back to the number for episodes of the RTL feed", () => {
    const { episodes } = onlyTopic({
      entries: [entry({ episode: "rtl-150", number: 150 })],
    });

    expect(episodes[0]).toMatchObject({ number: 150, airDate: "2023-11-30" });
  });

  it("keeps the feed's number and date for episodes the site lacks, with a warning", () => {
    const warn = jest.fn();
    const { topics } = compile(
      [topic({ entries: [entry({ episode: "mina-003", number: 3 })] })],
      { warn },
    );

    expect(topics[0].episodes[0]).toMatchObject({
      number: 3,
      title: "Nicht auf der Seite",
      airDate: "2026-03-12",
    });
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("mina-003"));
  });
});

describe("listen links", () => {
  const listenFor = (episodeId: string) =>
    onlyTopic({
      entries: [entry({ episode: episodeId, start: "0:30:28", end: "0:32:24" })],
    }).episodes[0].entries[0].listen;

  it("jumps to the start on Spotify", () => {
    expect(listenFor("rtl-229")).toEqual({
      url: "https://open.spotify.com/episode/e229?t=1828",
      provider: "spotify",
    });
  });

  it("links RTL+ without a timecode when there is no Spotify source", () => {
    expect(listenFor("rtl-150")).toEqual({
      url: "https://plus.rtl.de/podcast/e150",
      provider: "rtl",
    });
  });

  it("plays the feed's audio from the start as a last resort", () => {
    expect(listenFor("mina-003")).toEqual({
      url: "https://feed.example/mina-3.mp3#t=1828",
      provider: "audio",
    });
  });
});

describe("entries", () => {
  it("formats timecodes and rounds durations to whole minutes, at least one", () => {
    const compiled = onlyTopic({
      entries: [
        entry({ start: "0:30:28", end: "0:32:24" }),
        entry({ start: "1:02:08", end: "1:02:20", weight: "side" }),
      ],
    });

    expect(
      compiled.episodes[0].entries.map(({ start, end, startSeconds, minutes }) => ({
        start,
        end,
        startSeconds,
        minutes,
      })),
    ).toEqual([
      { start: "30:28", end: "32:24", startSeconds: 1828, minutes: 2 },
      { start: "1:02:08", end: "1:02:20", startSeconds: 3728, minutes: 1 },
    ]);
    expect(compiled).toMatchObject({ entryCount: 2, totalMinutes: 2 });
  });

  it("groups entries by episode, newest episode first, entries by start", () => {
    const { episodes } = onlyTopic({
      entries: [
        entry({ episode: "rtl-150", start: "0:20:00", end: "0:21:00" }),
        entry({ start: "0:40:00", end: "0:41:00", label: "Später" }),
        entry({ start: "0:10:00", end: "0:11:00", label: "Früher" }),
      ],
    });

    expect(episodes.map(({ id }) => id)).toEqual(["rtl-229", "rtl-150"]);
    expect(episodes[0].entries.map(({ label }) => label)).toEqual([
      "Früher",
      "Später",
    ]);
  });
});

describe("featured entry", () => {
  const featuredLabel = (entries: IndexTopic["entries"]) => {
    const compiled = onlyTopic({ entries });
    const { episode, entry: index } = compiled.featured;
    return compiled.episodes[episode].entries[index].label;
  };

  it("is the longest main entry", () => {
    expect(
      featuredLabel([
        entry({ label: "Kurz", start: "0:10:00", end: "0:12:00" }),
        entry({ label: "Lang", start: "0:20:00", end: "0:25:00" }),
        entry({
          label: "Länger, aber Randbemerkung",
          weight: "side",
          start: "0:30:00",
          end: "0:40:00",
        }),
      ]),
    ).toBe("Lang");
  });

  it("prefers the newer episode when two main entries are equally long", () => {
    expect(
      featuredLabel([
        entry({ label: "Alt", episode: "rtl-150", start: "0:10:00", end: "0:12:00" }),
        entry({ label: "Neu", start: "0:10:00", end: "0:12:00" }),
      ]),
    ).toBe("Neu");
  });

  it("is the longest entry when none is a main topic", () => {
    expect(
      featuredLabel([
        entry({ label: "Kurz", weight: "side", start: "0:10:00", end: "0:11:00" }),
        entry({ label: "Lang", weight: "side", start: "0:20:00", end: "0:23:00" }),
      ]),
    ).toBe("Lang");
  });
});

describe("breeds", () => {
  it("lists portraits, then breeds mentioned inside an entry, then other mentions", () => {
    const { breeds } = onlyTopic({
      entries: [
        entry({ start: "0:30:28", end: "0:32:24" }),
        entry({ episode: "rtl-summer-a04", start: "0:40:00", end: "0:41:00" }),
      ],
    });

    expect(breeds).toEqual([
      expect.objectContaining({
        slug: "border-collie",
        name: "Border Collie",
        relation: "portrait",
        episode: "rtl-229",
        number: 229,
      }),
      // mentioned at 30:40, inside the entry 30:28–32:24
      expect.objectContaining({ slug: "deutsche-dogge", relation: "mentioned" }),
      // parentheses stripped
      expect.objectContaining({ slug: "sabueso-espanol", relation: "mentioned" }),
      // a variant's name leads to its breed; the site's number is used
      expect.objectContaining({
        slug: "dachshund",
        relation: "mentioned",
        episode: "rtl-summer-a04",
        number: 157,
      }),
    ]);
    expect(breeds[0].thumbnail).toBe(
      "/rasseportrait/illustrations/breeds/297/illustration_thumbnail.jpeg",
    );
  });

  it("keeps at most four and drops names without a breed page", () => {
    const { breeds } = onlyTopic({
      entries: [
        entry({}),
        entry({ episode: "rtl-summer-a04" }),
        entry({ episode: "mina-003" }),
      ],
    });

    // five candidates: Border Collie, Deutsche Dogge, Pudel, Sabueso, Dachshund
    expect(breeds).toHaveLength(4);
    expect(breeds.map(({ name }) => name)).not.toContain("Wolpertinger");
  });
});

describe("related topics", () => {
  it("ranks topics by shared episodes, then the same area, then episode count", () => {
    const main = topic({
      id: "qualzuchten",
      entries: [
        entry({}),
        entry({ episode: "rtl-150" }),
        entry({ episode: "rtl-summer-a04" }),
      ],
    });
    const twoShared = topic({
      id: "zwei-gemeinsam",
      label: "Zwei gemeinsam",
      category: "Ernährung",
      entries: [entry({}), entry({ episode: "rtl-150" })],
    });
    const sameArea = topic({
      id: "gleicher-bereich",
      label: "Gleicher Bereich",
      entries: [entry({})],
    });
    const bigger = topic({
      id: "groesser",
      label: "Größer",
      category: "Ernährung",
      entries: [entry({ episode: "rtl-150" }), entry({ episode: "mina-003" })],
    });
    const smaller = topic({
      id: "kleiner",
      label: "Kleiner",
      category: "Ernährung",
      entries: [entry({ episode: "rtl-summer-a04" })],
    });
    const unrelated = topic({
      id: "fremd",
      label: "Fremd",
      entries: [entry({ episode: "mina-003" })],
    });
    const alsoRelated = topic({
      id: "fuenfter",
      label: "Fünfter",
      category: "Ernährung",
      entries: [entry({ episode: "rtl-summer-a04" })],
    });

    const { topics } = compile([
      main,
      smaller,
      bigger,
      unrelated,
      sameArea,
      twoShared,
      alsoRelated,
    ]);

    expect(topics.find(({ id }) => id === "qualzuchten")?.related).toEqual([
      "zwei-gemeinsam",
      "gleicher-bereich",
      "groesser",
      "fuenfter",
    ]);
  });
});

describe("index", () => {
  it("counts areas and topics and sorts both by size", () => {
    const { index } = compile([
      topic({ id: "a", label: "A", category: "Ernährung" }),
      topic({
        id: "b",
        label: "B",
        category: "Ernährung",
        entries: [entry({}), entry({ episode: "rtl-150" })],
      }),
      topic({ id: "c", label: "C", category: "Zucht & Rassen" }),
      topic({ id: "d", label: "D", category: "Verhalten & Kommunikation" }),
    ]);

    expect(index).toMatchObject({
      generated: "2026-09-28",
      indexedEpisodes: 4,
      totalEpisodes: 260,
    });
    expect(index.areas.map(({ slug, topicCount }) => [slug, topicCount])).toEqual([
      ["ernaehrung", 2],
      // ties keep the order of the area table
      ["verhalten-kommunikation", 1],
      ["zucht-rassen", 1],
    ]);
    expect(index.areas[0]).toMatchObject({
      name: "Ernährung",
      icon: "IconBowlSpoon",
    });
    expect(index.topics).toEqual([
      { id: "b", label: "B", area: "ernaehrung", episodeCount: 2, entryCount: 2 },
      { id: "a", label: "A", area: "ernaehrung", episodeCount: 1, entryCount: 1 },
      { id: "c", label: "C", area: "zucht-rassen", episodeCount: 1, entryCount: 1 },
      {
        id: "d",
        label: "D",
        area: "verhalten-kommunikation",
        episodeCount: 1,
        entryCount: 1,
      },
    ]);
  });

  it("sets an area picture only when its file exists", () => {
    const { index } = compile(
      [
        topic({ id: "a", category: "Ernährung" }),
        topic({ id: "b", category: "Zucht & Rassen" }),
      ],
      { hasAreaImage: (slug) => slug === "ernaehrung" },
    );

    expect(index.areas.find(({ slug }) => slug === "ernaehrung")?.image).toEqual({
      src: "/rasseportrait/illustrations/hundewissen/ernaehrung/illustration.jpeg",
      thumbnail:
        "/rasseportrait/illustrations/hundewissen/ernaehrung/illustration_thumbnail.jpeg",
      alt: "",
    });
    expect(index.areas.find(({ slug }) => slug === "zucht-rassen")?.image).toBeUndefined();
  });

  it("skips topics of an unknown area with a warning", () => {
    const warn = jest.fn();
    const { index, topics } = compile(
      [topic({ id: "a" }), topic({ id: "b", category: "Kochen" })],
      { warn },
    );

    expect(topics.map(({ id }) => id)).toEqual(["a"]);
    expect(index.topics.map(({ id }) => id)).toEqual(["a"]);
    expect(warn).toHaveBeenCalledWith(expect.stringContaining("Kochen"));
  });
});

describe("editorial overlay", () => {
  it("adds the text of a knowledge file with the topic's id", () => {
    const { topics } = compile([topic({}), topic({ id: "andere", label: "Andere" })], {
      editorial: [
        {
          id: "qualzuchten",
          title: { internal: "qualzuchten", public: "Qualzuchten" },
          status: "draft",
          content: "Qualzucht bezeichnet …",
        },
      ],
    });

    expect(topics.find(({ id }) => id === "qualzuchten")?.editorial).toEqual({
      content: "Qualzucht bezeichnet …",
      status: "draft",
    });
    expect(topics.find(({ id }) => id === "andere")).not.toHaveProperty("editorial");
  });
});

describe("validation", () => {
  it("fails on duplicate topic ids", () => {
    expect(() => compile([topic({}), topic({})])).toThrow(/duplicate.*qualzuchten/i);
  });

  it("fails on an entry that ends before it starts", () => {
    expect(() =>
      compile([topic({ entries: [entry({ start: "0:30:00", end: "0:29:00" })] })]),
    ).toThrow(/qualzuchten.*0:29:00/);
  });

  it("fails on a topic without entries", () => {
    expect(() => compile([topic({ entries: [] })])).toThrow(/qualzuchten.*no entries/i);
  });

  it("fails on a topic id that is not URL-safe", () => {
    expect(() => compile([topic({ id: "Qual zucht" })])).toThrow(/Qual zucht/);
  });

  it("fails on an entry of an episode the index does not list", () => {
    expect(() => compile([topic({ entries: [entry({ episode: "rtl-999" })] })])).toThrow(
      /rtl-999/,
    );
  });
});
