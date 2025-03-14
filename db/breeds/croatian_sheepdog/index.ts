import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "croatian_sheepdog",
  names: ["Hrvatski ovčar", "Kroatischer Schäferhund"],
  wasGuessedCorrectlyInPodcast: false,
  fci: {
    group: 1,
    section: 1,
    standardNumber: 277,
  },
  podcast: [
    {
      number: 208,
      episode: "Wie die Lemminge",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/208-wie-die-lemminge-y0ypqy92z48z2",
      timecode: 679,
      airDate: "2025-03-09",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Hrvatski_ov%C4%8Dar",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/KROATISCHER-SCHAFERHUND-277.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/hrvatski-ovcar",
    },
  ],
};

export default breed;
