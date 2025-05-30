import type { Breed } from "../../../types/breed";

export default {
  id: 263,
  details: {
    internal: "chesapeake_bay_retriever",
    public: ["Chesapeake Bay Retriever", "Retriever de la baie de Chesapeake"],
  },
  classification: {
    fci: {
      group: 8,
      section: 1,
      standardNumber: 263,
    },
  },
  podcast: [
    {
      number: "Exklusiv #1",
      episode:
        "Live-Podcast Arnsberg: Katzen-Content, Special-Effects und Tierschutz",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/live-podcast-arnsberg-katzen-content-special-effects-und-tierschutz-wl2e731548ug8",
          type: "audio",
        },
        {
          url: "https://plus.rtl.de/video-tv/shows/tierisch-menschlich-der-video-podcast-1001612/staffel-2-1007832/episode-1-live-podcast-arnsberg-katzen-content-special-effects-und-tierschutz-1007833",
          type: "video",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 4179,
        airDate: "2024-06-13",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Chesapeake_Bay_Retriever",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/CHESAPEAKE-BAY-RETRIEVER-263.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/chesapeake-bay-retriever",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/chesapeake-bay-retriever",
    },
  ],
} satisfies Breed;
