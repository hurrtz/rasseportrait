import type { Breed, FCI } from "../../../types/breed";

const fci: FCI = {
  group: 3,
  section: 1,
  standardNumber: 139,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Irish Terrier"],
  fci,
  podcast: [
    {
      number: 106,
      episode: "Bibi & Tina, Horoskope und ein absurdes Rasse-Ranking",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/106-bibi-tina-horoskope-und-ein-absurdes-rasse-ranking-vzrl6k8ajwg7p",
      timecode: 1890,
      airDateTimestamp: 1679533200000,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Irish_Terrier",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/IRISCHER-TERRIER-139.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/irish-terrier",
    },
  ],
};

export default breed;