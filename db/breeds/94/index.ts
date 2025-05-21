import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "podenco",
  names: ["Podenco"],
  wasGuessedCorrectlyInPodcast: true,
  variants: [
    {
      id: "portugese",
      names: ["Podengo Português", "Portugiesischer Podengo", "Warren Hound"],
    },
  ],
  fci: {
    group: 5,
    section: 7,
    standardNumber: 94,
  },
  podcast: [
    {
      number: 59,
      episode: "Glow down, Hund & Baby, Lösseler Waldgeist",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/59-glow-down-hund-baby-loesseler-waldgeist-qthfcbunlahuh",
      timecode: 3885,
      airDate: "2022-04-28",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Podengo_Portugu%C3%AAs",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/PORTUGIESISCHER-PODENGO-94.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/podengo-portugues",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/podenco",
    },
  ],
};

export default breed;
