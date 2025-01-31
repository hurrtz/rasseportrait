import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "dandie_dinmont_terrier",
  names: ["Dandie Dinmont Terrier"],
  wasGuessedCorrectlyInPodcast: false,
  fci: {
    group: 3,
    section: 2,
    standardNumber: 168,
  },
  podcast: [
    {
      number: 139,
      episode: "Co-Ownership & Knochen knacken",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/139-co-ownership-knochen-knacken-3ht5yygef4ypm",
      timecode: 2214,
      airDate: "2023-11-09",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Dandie_Dinmont_Terrier",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/DANDIE-DINMONT-TERRIER-168.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/dandie-dinmont-terrier",
    },
  ],
};

export default breed;
