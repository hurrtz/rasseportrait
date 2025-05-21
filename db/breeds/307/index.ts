import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "azawakh",
  names: ["Azawakh", "Idi", "Osca", "Tuareg-Windhund"],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 10,
    section: 3,
    standardNumber: 307,
  },
  podcast: [
    {
      number: 183,
      episode: "Schiebeflöte",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/183-schiebefloete-z8ui95rb5t0rv",
      timecode: 1125,
      airDate: "2024-09-12",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Azawakh",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/AZAWAKH-307.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/azawakh",
    },
  ],
};

export default breed;
