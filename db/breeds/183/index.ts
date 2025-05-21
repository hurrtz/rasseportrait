import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "miniature_schnauzer",
  names: ["Zwergschnauzer"],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 2,
    section: 1,
    standardNumber: 183,
  },
  podcast: [
    {
      number: 169,
      episode: "Wichtige Updates",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/169-wichtige-updates-jbd8afdfpby1s",
      timecode: 2290,
      airDate: "2024-06-06",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Schnauzer",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/ZWERGSCHNAUZER-183.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/zwergschnauzer",
    },
  ],
};

export default breed;
