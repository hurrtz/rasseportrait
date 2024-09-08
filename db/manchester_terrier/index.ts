import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "manchester_terrier",
  names: ["Manchester Terrier"],
  fci: {
    group: 3,
    section: 1,
    standardNumber: 71,
  },
  podcast: [
    {
      number: 158,
      episode: "Rattenfänger",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/158-rattenfaenger-2gvydqa8svsq9",
      timecode: 2985,
      airDate: "2024-03-21",
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
