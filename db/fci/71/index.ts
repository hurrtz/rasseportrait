import type { Breed, FCI } from "../../../types/breed";

const fci: FCI = {
  group: 3,
  section: 1,
  standardNumber: 71,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Manchester Terrier"],
  fci,
  podcast: [
    {
      number: 158,
      episode: "Rattenfänger",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/158-rattenfaenger-2gvydqa8svsq9",
      timecode: 2985,
      airDateTimestamp: 1710982800000,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://en.wikipedia.org/wiki/Manchester_Terrier",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/MANCHESTER-TERRIER-71.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/manchester-terrier",
    },
  ],
};

export default breed;
