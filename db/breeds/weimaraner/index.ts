import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "weimaraner",
  names: ["Weimaraner"],
  wasGuessedCorrectlyInPodcast: true,
  variants: [
    {
      names: ["Kurzhaar"],
      id: "short",
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/weimaraner-kurzhaar",
        },
      ],
    },
    {
      names: ["Langhaar"],
      id: "long",
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/weimaraner-langhaar",
        },
      ],
    },
  ],
  fci: {
    group: 7,
    section: 1,
    standardNumber: 99,
  },
  podcast: [
    {
      number: 52,
      episode: "Richtig Helfen, fliegende Kotbeutel & der Weimaraner",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/52-richtig-helfen-fliegende-kotbeutel-der-weimaraner-m5dz64ld7wmvh",
      timecode: 2427,
      airDate: "2022-03-10",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Weimaraner",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/WEIMARANER-99.html",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/weimaraner",
    },
  ],
};

export default breed;
