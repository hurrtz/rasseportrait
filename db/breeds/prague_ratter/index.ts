import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "prague_ratter",
  names: ["Prager Rattler", "Pražský krysařík"],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 9,
    section: 9,
    standardNumber: 363,
  },
  podcast: [
    {
      number: 115,
      episode: "Apple Store, Mottenbefall & Wasserrute",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/115-apple-store-mottenbefall-wasserrute-1mxwlzwkra8ev",
      timecode: 2610,
      airDate: "2023-05-25",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Prager_Rattler",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/PRAGER-RATTLER-363.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/prager-rattler",
    },
  ],
};

export default breed;
