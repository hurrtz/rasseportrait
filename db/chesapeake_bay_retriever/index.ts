import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "chesapeake_bay_retriever",
  names: ["Chesapeake Bay Retriever", "Retriever de la baie de Chesapeake"],
  fci: {
    group: 8,
    section: 1,
    standardNumber: 263,
  },
  podcast: [
    {
      number: "Exklusiv #1",
      episode:
        "Live-Podcast Arnsberg: Katzen-Content, Special-Effects und Tierschutz",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/live-podcast-arnsberg-katzen-content-special-effects-und-tierschutz-wl2e731548ug8",
      timecode: 4179,
      airDate: "2024-06-13",
    },
    {
      number: "Exklusiv #1",
      episode:
        "Live-Podcast Arnsberg: Katzen-Content, Special-Effects und Tierschutz",
      url: "https://plus.rtl.de/video-tv/shows/tierisch-menschlich-der-video-podcast-1001612/staffel-2-1007832/episode-1-live-podcast-arnsberg-katzen-content-special-effects-und-tierschutz-1007833",
      timecode: 4133,
      type: "video",
      airDate: "2024-06-13",
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
  ],
};

export default breed;
