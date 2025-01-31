import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "german_spaniel",
  names: ["Deutscher Wachtelhund", "Deutscher Wachtel", "Deutscher Spaniel"],
  wasGuessedCorrectlyInPodcast: "not_applicable",
  isOfficiallyPresented: false,
  fci: {
    group: 8,
    section: 2,
    standardNumber: 104,
  },
  podcast: [
    {
      number: 134,
      episode: "Mischwesen & Cancelculture",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/134-mischwesen-cancelculture-v758khsqvx1l5",
      timecode: 4100,
      airDate: "2023-10-05",
      context: "Persönliche Anekote",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Deutscher_Wachtelhund",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/DEUTSCHER-WACHTELHUND-104.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/deutscher-wachtelhund",
    },
  ],
};

export default breed;
