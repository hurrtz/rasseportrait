import type { Breed, FCI } from "../../../types/breed";

const fci: FCI = {
  group: 9,
  section: 10,
  standardNumber: 192,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Kromfohrländer"],
  variants: [
    {
      names: ["Rauhhaar"],
      id: "wire",
    },
    {
      names: ["Glatthaar"],
      id: "smooth",
    },
  ],
  fci,
  podcast: [
    {
      number: 93,
      episode: "Ebay, Aquadom & Frohe Weihnachten",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/93-ebay-aquadom-frohe-weihnachten-vunq6bh8makya",
      timecode: 1733,
      airDateTimestamp: 1671670800000,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Kromfohrl%C3%A4nder",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/KROMFOHRLANDER-192.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/kromfohrlaender",
    },
  ],
};

export default breed;