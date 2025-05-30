import type { Breed } from "../../../types/breed";

export default {
  id: 257,
  details: {
    internal: "shiba",
    public: ["Shiba", "Shiba Inu"],
  },
  classification: {
    fci: {
      group: 2,
      section: 2,
      standardNumber: 257,
    },
  },
  podcast: [
    {
      number: "Exklusiv #4",
      episode: "Live-Podcast Würselen: Wildkatzen",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/live-podcast-wuerselen-wildkatzen-fp3kwv8cghuui",
          type: "audio",
        },
        {
          url: "https://plus.rtl.de/video-tv/shows/tierisch-menschlich-der-video-podcast-1001612/staffel-2-1007832/episode-4-live-podcast-wuerselen-wildkatzen-1013241",
          type: "video",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 5840,
        airDate: "2024-10-09",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Shiba",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/SHIBA-257.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/shiba",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/shiba",
    },
  ],
} satisfies Breed;
