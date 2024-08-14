import type { Breed, FCI } from "../../../types/breed";

const fci: FCI = {
  group: -1,
  section: -1,
  standardNumber: -1,
};

const breed: Breed = {
  id: "silken-windsprite",
  names: ["Silken Windsprite", "Longhaired Whippet", "Langhaar Whippet"],
  fci,
  podcast: [
    {
      number: 165,
      episode: "Biber & Bark Date",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/165-biber-bark-date-qfe8t7gfo7siq",
      timecode: 2178,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Silken_Windsprite",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/silken-windsprite-nationale-rasse",
    },
  ],
};

export default breed;
