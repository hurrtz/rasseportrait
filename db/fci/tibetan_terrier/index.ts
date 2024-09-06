import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "tibetan_terrier",
  names: ["Tibet-Terrier", "Tibetan Terrier", "Tsang Apso"],
  fci: {
    group: 9,
    section: 5,
    standardNumber: 209,
  },
  podcast: [
    {
      number: 61,
      episode: "Ein Helm für Chihuahuas, Kack-Typen & Mähroboter",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/61-ein-helm-fuer-chihuahuas-kack-typen-maehroboter-jd7qib7z8uurv",
      timecode: 2589,
      airDateTimestamp: 1652317200000,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Tibet-Terrier",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/TIBET-TERRIER-209.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/tibet-terrier",
    },
  ],
};

export default breed;
