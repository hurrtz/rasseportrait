import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "beauceron",
  names: ["Beauceron", "Berger de Beauce", "Chien de Beauce", "Bas-Rouge"],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 1,
    section: 1,
    standardNumber: 44,
  },
  podcast: [
    {
      number: 120,
      episode: "Es ist zu warm",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/120-es-ist-zu-warm-02gkj0kij1nng",
      timecode: 2295,
      airDate: "2023-06-29",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Beauceron",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/BEAUCERON-44.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/berger-de-beauce",
    },
  ],
};

export default breed;
