import type { Breed, FCI } from "../../../types/breed";

const fci: FCI = {
  group: 3,
  section: 1,
  standardNumber: 40,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Irish Soft Coated Wheaten Terrier"],
  fci,
  podcast: [
    {
      number: 159,
      episode: "Fischklingel, Osterfeuer & Weizenfarbe",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/159-fischklingel-osterfeuer-weizenfarbe-o1tpe1gkh4pyu",
      timecode: 2012,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Irish_Soft_Coated_Wheaten_Terrier",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/IRISCHER-SOFT-COATED-WHEATEN-TERRIER-40.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/irish-soft-coated-wheaten-terrier",
    },
  ],
};

export default breed;
