import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "entlebucher_mountain_dog",
  names: ["Entlebucher Sennenhund"],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 2,
    section: 3,
    standardNumber: 47,
  },
  podcast: [
    {
      number: 147,
      episode: "Braunes Rauschen & veganes Futter",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/147-braunes-rauschen-veganes-futter-rq1a38523a8db",
      timecode: 2865,
      airDate: "2024-01-04",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Entlebucher_Sennenhund",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/ENTLEBUCHER-SENNENHUND-47.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/entlebucher-sennenhund",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/entlebucher-sennenhund",
    },
  ],
};

export default breed;
