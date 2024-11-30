import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "german_spitz",
  names: ["Deutscher Spitz"],
  wasGuessedCorrectlyInPodcast: "not_applicable",
  variants: [
    {
      names: ["Pomeranian", "Zwergspitz"],
      id: "pomeranian",
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/zwergspitz",
        },
      ],
    },
    {
      names: ["Kleinspitz"],
      id: "miniature",
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/kleinspitz",
        },
      ],
    },
    {
      names: ["Mittelspitz"],
      id: "medium",
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/mittelspitz",
        },
      ],
    },
    {
      names: ["Großspitz"],
      id: "large",
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/grossspitz",
        },
      ],
    },
    {
      names: ["Wolfsspitz", "Keeshond"],
      id: "keeshound",
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/wolfsspitz",
        },
      ],
    },
  ],
  fci: {
    group: 5,
    section: 4,
    standardNumber: 97,
  },
  podcast: [
    {
      number: 49,
      episode: "Der Spitz, Zwingerhaltung & Puddingmatten",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/49-der-spitz-zwingerhaltung-puddingmatten-7hsefpcuadjr7",
      timecode: 924,
      airDate: "2022-02-17",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Deutsche_Spitze",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/DEUTSCHER-SPITZ-97.html",
    },
  ],
};

export default breed;
