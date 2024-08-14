import type { Breed, FCI } from "../../../types/breed";

const fci: FCI = {
  group: 3,
  section: 1,
  standardNumber: 339,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Parson Russell Terrier"],
  fci,
  podcast: [
    {
      number: 125,
      episode: "Kampf der Urzeitkrebse",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/125-kampf-der-urzeitkrebse-i8h9g7dvtu49g",
      timecode: 2081,
      airDateTimestamp: 1691024400000,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Parson_Russell_Terrier",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/PARSON-RUSSELL-TERRIER-339.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/parson-russell-terrier",
    },
  ],
};

export default breed;
