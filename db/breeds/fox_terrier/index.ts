import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "fox_terrier",
  names: ["Foxterrier"],
  wasGuessedCorrectlyInPodcast: "not_applicable",
  variants: [
    {
      id: "smooth",
      names: ["Glatthaar"],
      fci: {
        group: 3,
        section: 1,
        standardNumber: 12,
      },
      furtherReading: [
        {
          name: "FCI",
          url: "https://www.fci.be/de/nomenclature/FOX-TERRIER-GLATTHAAR-12.html",
        },
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/fox-terrier-glatthaar",
        },
      ],
    },
    {
      id: "wire",
      names: ["Rauhhaar"],
      fci: {
        group: 3,
        section: 1,
        standardNumber: 169,
      },
      furtherReading: [
        {
          name: "FCI",
          url: "https://www.fci.be/de/nomenclature/FOX-TERRIER-DRAHTHAAR-169.html",
        },
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/fox-terrier-drahthaar",
        },
      ],
    },
  ],
  podcast: [
    {
      number: "Summer Edition #3",
      episode: "Martins Solo-Folge",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/summer-edition-3-martins-solo-folge-tfmv41s6tzg65",
      timecode: 948,
      airDate: "2024-07-11",
      context: "Anteasern des Rasseportraits in «Grausame Natur»",
    },
    {
      number: "Summer Edition #5",
      episode: "Grausame Natur",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/summer-edition-5-grausame-natur-2cmtu8gbfflgx",
      timecode: 277,
      airDate: "2024-07-25",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Foxterrier",
    },
  ],
};

export default breed;
