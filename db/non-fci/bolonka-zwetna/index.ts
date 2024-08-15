import type { Breed, FCI } from "../../../types/breed";

const fci: FCI = {
  group: -1,
  section: -1,
  standardNumber: -1,
};

const breed: Breed = {
  id: "bolonka-zwetna",
  names: ["Bolonka Zwetna", "Tsvetnaya Bolonka"],
  fci,
  podcast: [
    {
      number: "Summer Edition #8",
      episode: "Die schlauesten Tiere der Welt",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/neue-folge",
      timecode: 1030,
      airDateTimestamp: 1723683600000,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Bolonka_Zwetna",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/bolonka-zwetna-nationale-rasse",
    },
  ],
};

export default breed;
