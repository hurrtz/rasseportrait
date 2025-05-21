import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "large_muensterlaender",
  names: ["Großer Münsterländer"],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 7,
    section: 1,
    standardNumber: 118,
  },
  podcast: [
    {
      number: 134,
      episode: "Mischwesen & Cancelculture",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/134-mischwesen-cancelculture-v758khsqvx1l5",
      timecode: 4027,
      airDate: "2023-10-05",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Gro%C3%9Fer_M%C3%BCnsterl%C3%A4nder",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/GROSSER-MUNSTERLANDER-VORSTEHHUND-118.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/grosser-muensterlaender-vorstehhund",
    },
  ],
};

export default breed;
