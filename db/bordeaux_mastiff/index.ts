import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "bordeaux_mastiff",
  names: ["Bordeauxdogge", "Dogue de Bordeaux"],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 2,
    section: 2,
    standardNumber: 116,
  },
  podcast: [
    {
      number: 114,
      episode: "Einfach machen",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/114-einfach-machen-t8x681865vs1g",
      timecode: 3228,
      airDate: "2023-05-18",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Dogue_de_Bordeaux",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/BORDEAUXDOGGE-116.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/bordeauxdogge",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/bordeaux-dogge",
    },
  ],
};

export default breed;
