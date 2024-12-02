import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "akita",
  names: ["Akita", "Akita-Inu", "Japanischer Akita", "Akita Ken", "秋田犬"],
  wasGuessedCorrectlyInPodcast: "not_applicable",
  fci: {
    group: 5,
    section: 5,
    standardNumber: 255,
  },
  isOfficiallyPresented: false,
  podcast: [
    {
      number: "Summer Edition #7",
      episode: "Hobby Horsing for Olympia!",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/summer-edition-7-hobby-horsing-for-olympia-7pbpazh2zvi72",
      timecode: 1075,
      airDate: "2024-08-08",
      context: "Vergleich mit American Akita",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Akita_(Hunderasse)",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/AKITA-255.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/akita",
    },
  ],
};

export default breed;
