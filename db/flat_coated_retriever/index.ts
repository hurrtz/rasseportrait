import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "flat_coated_retriever",
  names: [
    "Flat Coated Retriever",
    "Retriever à poil plat",
    "Cobrador de pelo liso",
  ],
  fci: {
    group: 8,
    section: 1,
    standardNumber: 121,
  },
  podcast: [
    {
      number: 68,
      episode: "Einhoder, König der Kindsköpfe & verkohlte Hundepfoten",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/68-einhoder-koenig-der-kindskoepfe-verkohlte-hundepfoten-xyr6ciyqxhzcf",
      timecode: 2296,
      airDateTimestamp: 1656550800000,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Flat_Coated_Retriever",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/FLAT-COATED-RETRIEVER-121.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/flat-coated-retriever",
    },
  ],
};

export default breed;
