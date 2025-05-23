import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "lagotto_romagnolo",
  names: [
    "Lagotto Romagnolo",
    "Wasserhund der Romagna",
    "Italienischer Trüffelhund",
  ],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 8,
    section: 3,
    standardNumber: 298,
  },
  podcast: [
    {
      number: 138,
      episode: "Fichtenflitzer, Riesenregenwurm & Kot-Tapete",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/138-fichtenflitzer-riesenregenwurm-kot-tapete-lcq6dk9w7df3w",
      timecode: 818,
      airDate: "2023-11-02",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Lagotto_Romagnolo",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/WASSERHUND-DER-ROMAGNA-298.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/lagotto-romagnolo",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/lagotto-romagnolo",
    },
  ],
};

export default breed;
