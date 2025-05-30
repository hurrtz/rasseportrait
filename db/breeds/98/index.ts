import type { Breed } from "../../../types/breed";

export default {
  id: 98,
  details: {
    internal: "german_wirehaired_pointer",
    public: ["Deutsch Drahthaar"],
  },
  classification: {
    fci: {
      group: 7,
      section: 1,
      standardNumber: 98,
    },
  },
  podcast: [
    {
      number: "Exklusiv #6",
      episode: "Live-Podcast Euskirchen",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/live-podcast-euskirchen-xnzts3crxhjd5",
          type: "audio",
        },
        {
          url: "https://plus.rtl.de/video-tv/shows/tierisch-menschlich-der-video-podcast-1001612/staffel-2-1007832/episode-6-live-podcast-euskirchen-1013243",
          type: "video",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2438,
        airDate: "2024-11-13",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Deutsch_Drahthaar",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/DEUTSCH-DRAHTHAAR-98.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/deutsch-drahthaar",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/deutsch-drahthaar",
    },
  ],
} as Breed;
