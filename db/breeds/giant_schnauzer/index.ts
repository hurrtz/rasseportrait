import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "giant_schnauzer",
  names: ["Riesenschnauzer"],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 2,
    section: 1,
    standardNumber: 181,
  },
  podcast: [
    {
      number: 57,
      episode: "Welpenhändler, Zerrspiele & Spartipps Teil 2",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/57-welpenhaendler-zerrspiele-spartipps-teil-2-it4nn687n9bsg",
      timecode: 1369,
      airDate: "2022-04-14",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Schnauzer",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/RIESENSCHNAUZER-181.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/riesenschnauzer",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/riesenschnauzer",
    },
  ],
};

export default breed;
