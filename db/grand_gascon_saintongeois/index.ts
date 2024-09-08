import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "grand_gascon_saintongeois",
  names: ["Grand Gascon Saintongeois"],
  fci: {
    group: 6,
    section: 1,
    standardNumber: 21,
  },
  podcast: [
    {
      number: 129,
      episode: "Einfach mal sitzen",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/129-einfach-mal-sitzen-dbc2cl161xydt",
      timecode: 1132,
      airDate: "2023-08-31",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Grand_Gascon_Saintongeois",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/GASCON-SAINTONGEOIS-21.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/gascon-saintongeois",
    },
  ],
};

export default breed;
