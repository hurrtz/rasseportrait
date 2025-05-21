import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "podenco",
  names: ["Podenco"],
  wasGuessedCorrectlyInPodcast: true,
  variants: [
    {
      id: "ibicenco",
      names: [
        "Podenco Ibicenco",
        "Ca Eivissec",
        "Mallorqui",
        "Xarnelo",
        "Mayorquais",
        "Charnegue",
        "Charnegui",
        "Balearen-Hund",
      ],
    },
  ],
  fci: {
    group: 5,
    section: 7,
    standardNumber: 89,
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
      url: "https://de.wikipedia.org/wiki/Podenco_Ibicenco",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/IBIZA-PODENCO-89.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/podenco-ibicenco",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/podenco",
    },
  ],
};

export default breed;
