import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "dachshund",
  names: ["Dackel", "Teckel", "Dachshund"],
  wasGuessedCorrectlyInPodcast: "not_applicable",
  variants: [
    {
      names: ["Kurzhaar"],
      id: "short",
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/teckel-kurzhaar",
        },
      ],
    },
  ],
  fci: {
    group: 4,
    section: 1,
    standardNumber: 148,
  },
  podcast: [
    {
      number: 56,
      episode: "Martin wird aufgemischt, krumme Dackelbeine & Spartipps Teil 1",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/56-martin-wird-aufgemischt-krumme-dackelbeine-spartipps-teil-1-6g11t4rkl512j",
      timecode: 1570,
      airDate: "2022-04-07",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Dackel",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/DACHSHUND-148.html",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/dackel-/-teckel",
    },
  ],
};

export default breed;
