import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "japanese_spitz",
  names: ["Japan-Spitz", "日本スピッツ", "Nihon Supittsu", "Japanischer Spitz"],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 5,
    section: 5,
    standardNumber: 262,
  },
  podcast: [
    {
      number: 168,
      episode: "R.I.P. Kuno",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/168-rip-kuno-wq8x5w4z45ctt",
      timecode: 2072,
      airDate: "2024-05-31",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Japan-Spitz",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/JAPAN-SPITZ-262.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/japan-spitz",
    },
  ],
};

export default breed;
