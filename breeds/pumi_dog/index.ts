import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "pumi_dog",
  names: ["Pumi"],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 1,
    section: 1,
    standardNumber: 56,
  },
  podcast: [
    {
      number: 128,
      episode: "Beamende Zecken, Kalsarikännit & Hundeduft",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/128-beamende-zecken-kalsarikaennit-hundeduft-6vu1gxku02uiq",
      timecode: 1803,
      airDate: "2023-08-24",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Pumi_(Hunderasse)",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/PUMI-56.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/pumi",
    },
  ],
};

export default breed;
