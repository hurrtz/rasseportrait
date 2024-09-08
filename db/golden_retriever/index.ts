import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "golden_retriever",
  names: ["Golden Retriever"],
  fci: {
    group: 8,
    section: 1,
    standardNumber: 111,
  },
  podcast: [
    {
      number: 101,
      episode: "Jubiläumsfolge live aus dem Walfisch",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/101-jubilaeumsfolge-live-aus-dem-walfisch-du0ci4j36ofr2",
      timecode: 2983,
      airDate: "2023-02-16",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Golden_Retriever",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/GOLDEN-RETRIEVER-111.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/golden-retriever",
    },
  ],
};

export default breed;
