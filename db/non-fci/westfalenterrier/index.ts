import type { Breed, FCI } from "../../../types/breed";

const fci: FCI = {
  group: -1,
  section: -1,
  standardNumber: -1,
};

const breed: Breed = {
  id: "westfalenterrier",
  names: ["Westfalenterrier"],
  fci,
  podcast: [
    {
      number: "Exklusiv #2",
      episode: "Live-Podcast Delbrück: Therapie-Schafe & Schnaps-Hasen",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/live-podcast-delbrueck-therapie-schafe-schnaps-hasen-l8amf2kemppre",
      timecode: 4151,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Westfalenterrier",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/westfalenterrier-nationale-rasse",
    },
  ],
};

export default breed;
