import type { Breed } from "../../types/breed";

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
      fci: {
        group: 5,
        section: 7,
        standardNumber: 89,
      },
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
      ],
    },
    {
      id: "portugese",
      names: ["Podengo Português", "Portugiesischer Podengo", "Warren Hound"],
      fci: {
        group: 5,
        section: 7,
        standardNumber: 94,
      },
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
      ],
    },
    {
      id: "canario",
      names: ["Podenco Canario", "Kanarischer Podenco"],
      fci: {
        group: 5,
        section: 7,
        standardNumber: 329,
      },
      furtherReading: [
        {
          name: "Wikipedia",
          url: "https://de.wikipedia.org/wiki/Podenco_Canario",
        },
        {
          name: "FCI",
          url: "https://www.fci.be/de/nomenclature/KANARISCHER-PODENCO-329.html",
        },
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/podenco-canario",
        },
      ],
    },
  ],
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
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/podenco",
    },
  ],
};

export default breed;
