import type {
  HundewissenArea,
  HundewissenEntry,
  HundewissenEpisode,
  HundewissenIndex,
  HundewissenTopic,
  HundewissenTopicSummary,
} from "types/hundewissen";
import useHundewissenStore, {
  resetHundewissenStore,
  type TopicState,
} from "~/stores/hundewissen";

export const area = (
  slug: string,
  name: string,
  topicCount: number,
  icon = "IconDna2",
): HundewissenArea => ({ slug, name, icon, topicCount });

export const summary = (
  id: string,
  label: string,
  areaSlug: string,
  episodeCount = 1,
  entryCount = episodeCount,
): HundewissenTopicSummary => ({
  id,
  label,
  area: areaSlug,
  episodeCount,
  entryCount,
});

export const makeIndex = (
  overrides: Partial<HundewissenIndex> = {},
): HundewissenIndex => ({
  generated: "2026-09-28",
  indexedEpisodes: 8,
  totalEpisodes: 260,
  areas: [
    area("zucht-rassen", "Zucht & Rassen", 3),
    area("gesundheit-medizin", "Gesundheit & Medizin", 1, "IconStethoscope"),
  ],
  topics: [
    summary("qualzuchten", "Qualzuchten", "zucht-rassen", 4, 6),
    summary("rasseerhalt", "Rasseerhalt", "zucht-rassen", 2),
    summary("zuchtverbaende", "Zuchtverbände", "zucht-rassen"),
    summary("gelenke", "Gelenkprobleme", "gesundheit-medizin"),
  ],
  ...overrides,
});

export const entry = (
  overrides: Partial<HundewissenEntry> = {},
): HundewissenEntry => ({
  label: "Riesenwuchs als Qualzucht",
  start: "30:28",
  end: "32:24",
  startSeconds: 1828,
  endSeconds: 1944,
  minutes: 2,
  weight: "main",
  kind: "discussion",
  summaries: ["Kritik am Rassestandard der Deutschen Dogge."],
  listen: {
    url: "https://open.spotify.com/episode/e229?t=1828",
    provider: "spotify",
  },
  ...overrides,
});

export const episode = (
  overrides: Partial<HundewissenEpisode> = {},
): HundewissenEpisode => ({
  id: "rtl-229",
  number: 229,
  title: "Riesen, Hämorrhoiden & Essgeräusche",
  airDate: "2025-10-01",
  entries: [entry()],
  ...overrides,
});

/** Qualzuchten as in the mockup: four episodes, six entries */
export const makeTopic = (
  overrides: Partial<HundewissenTopic> = {},
): HundewissenTopic => ({
  id: "qualzuchten",
  label: "Qualzuchten",
  area: "zucht-rassen",
  description: "Zucht auf extreme Merkmale, die die Gesundheit schädigt.",
  episodeCount: 4,
  entryCount: 6,
  totalMinutes: 12,
  featured: { episode: 0, entry: 0 },
  episodes: [
    episode({
      entries: [
        entry(),
        entry({
          label: "Genetische Enge in der Zucht",
          start: "39:52",
          end: "40:37",
          startSeconds: 2392,
          endSeconds: 2437,
          minutes: 1,
          weight: "side",
          kind: "news",
          summaries: ["Hinweis auf eine TV-Folge zu Qualzucht."],
          listen: {
            url: "https://open.spotify.com/episode/e229?t=2392",
            provider: "spotify",
          },
        }),
      ],
    }),
    episode({
      id: "rtl-228",
      number: 228,
      title: "Verona, Veggie-Futter & Vorsorge",
      airDate: "2025-09-25",
      entries: [
        entry({
          label: "Qualzucht-Kritik an Züchtern",
          start: "46:45",
          end: "47:29",
          startSeconds: 2805,
          endSeconds: 2849,
          minutes: 1,
          weight: "side",
          summaries: ["Beiläufige Kritik an Züchtern."],
          listen: { url: "https://plus.rtl.de/podcast/e228", provider: "rtl" },
        }),
      ],
    }),
    episode({
      id: "rtl-226",
      number: 226,
      title: "Der große Leberwursttest",
      airDate: "2025-09-11",
      entries: [
        entry({
          label: "Qualzucht Mops",
          start: "26:17",
          end: "26:40",
          startSeconds: 1577,
          endSeconds: 1600,
          minutes: 1,
          weight: "side",
          summaries: ["Rütter spricht Menschen mit Kaufwunsch für einen Mops an."],
        }),
        entry({
          label: "Gesundheitsprobleme von Riesenrassen",
          start: "47:10",
          end: "49:29",
          startSeconds: 2830,
          endSeconds: 2969,
          minutes: 2,
          summaries: ["Neufundländer leiden unter ihrem Gewicht."],
        }),
      ],
    }),
    episode({
      id: "rtl-summer-a04",
      number: 157,
      title: "Otterjagd & Dackelkatzen",
      airDate: "2024-03-14",
      entries: [
        entry({
          label: "Österreichs Qualzuchtverbot",
          start: "9:03",
          end: "14:27",
          startSeconds: 543,
          endSeconds: 867,
          minutes: 5,
          kind: "news",
          summaries: ["Österreich verbietet Zucht mit Qualzuchtmerkmalen."],
          listen: {
            url: "https://feed.example/a04.mp3#t=543",
            provider: "audio",
          },
        }),
      ],
    }),
  ],
  breeds: [
    {
      slug: "great-dane",
      name: "Deutsche Dogge",
      thumbnail: "/rasseportrait/illustrations/breeds/235/illustration_thumbnail.jpeg",
      relation: "portrait",
      episode: "rtl-229",
      number: 229,
    },
    {
      slug: "irish-wolfhound",
      name: "Irischer Wolfshund",
      thumbnail: "/rasseportrait/illustrations/breeds/160/illustration_thumbnail.jpeg",
      relation: "mentioned",
      episode: "rtl-229",
      number: 229,
    },
  ],
  related: ["rasseerhalt", "gelenke"],
  ...overrides,
});

/** Puts the index (and topic files) into the store as if they had loaded */
export const seedHundewissen = (
  index: HundewissenIndex = makeIndex(),
  topics: HundewissenTopic[] = [],
) => {
  resetHundewissenStore();
  useHundewissenStore.setState({
    index,
    status: "ready",
    topics: Object.fromEntries(
      topics.map((topic): [string, TopicState] => [
        topic.id,
        { status: "ready", topic },
      ]),
    ),
  });
};
