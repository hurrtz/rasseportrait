import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "rhodesian_ridgeback",
  names: ["Rhodesian Ridgeback"],
  wasGuessedCorrectlyInPodcast: "not_applicable",
  fci: {
    group: 6,
    section: 3,
    standardNumber: 146,
  },
  podcast: [
    {
      number: 44,
      episode:
        "Geteiltes Sorgerecht für Tiere, falsches Mäusegulasch & Zwangspause für Polizeihunde",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/44-geteiltes-sorgerecht-fuer-tiere-falsches-maeusegulasch-zwangspause-fuer-polizeihunde-ioj5kmbkn4v7c",
      timecode: 3136,
      airDate: "2022-01-13",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Rhodesian_Ridgeback",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/RHODESIAN-RIDGEBACK-146.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/rhodesian-ridgeback",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/rhodesian-ridgeback-1",
    },
  ],
};

export default breed;
