import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "berger_picard",
  names: ["Berger de Picardie", "Berger Picard"],
  fci: {
    group: 1,
    section: 1,
    standardNumber: 176,
  },
  podcast: [
    {
      number: 171,
      episode: "Abschied in die Sommerpause",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/171-abschied-in-die-sommerpause-sst637kxiu8ty",
      timecode: 2251,
      airDateTimestamp: 1655686800000,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Berger_de_Picardie",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/PICARDIE-SCHAFERHUND-176.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/berger-de-picardie",
    },
  ],
};

export default breed;
