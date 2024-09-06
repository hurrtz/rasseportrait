import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "komondor",
  names: ["Komondor"],
  fci: {
    group: 1,
    section: 1,
    standardNumber: 53,
  },
  podcast: [
    {
      number: 127,
      episode: "Podcast live II: Achterbahn der Feelings",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/127-podcast-live-ii-achterbahn-der-feelings-kk19bjk32yh1x",
      timecode: 985,
      airDateTimestamp: 1692234000000,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Komondor",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/KOMONDOR-53.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/komondor",
    },
  ],
};

export default breed;
