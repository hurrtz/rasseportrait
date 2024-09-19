import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "miniature_pinscher",
  names: [
    "Zwergpinscher",
    "Rehpinscher",
    "Miniature Pinscher",
    "Minpin",
    "Minidoberman",
    "Rehrattler",
  ],
  fci: {
    group: 2,
    section: 1,
    standardNumber: 185,
  },
  podcast: [
    {
      number: 184,
      episode: "Wo ist Wilma?",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/184-wo-ist-wilma-7hen4hjz2wbam",
      timecode: 3300,
      airDate: "2024-09-19",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Zwergpinscher",
    },
    {
      name: "FCI",
      url: "https://fci.be/de/nomenclature/ZWERGPINSCHER-185.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/zwergpinscher",
    },
  ],
};

export default breed;
