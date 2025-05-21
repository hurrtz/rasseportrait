import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "stabyhoun",
  names: ["Stabyhoun", "Stabijhoun", "Stabÿhoun", "Friesischer Vorstehhund"],
  wasGuessedCorrectlyInPodcast: false,
  fci: {
    group: 7,
    section: 1,
    standardNumber: 222,
  },
  podcast: [
    {
      number: 199,
      episode: "Prosit Neujahr!",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/199-prosit-neujahr-98cdxhj3nfpmb",
      timecode: 1978,
      airDate: "2025-01-02",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Stabyhoun",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/FRIESISCHER-VORSTEHHUND-222.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/stabijhoun",
    },
  ],
};

export default breed;
