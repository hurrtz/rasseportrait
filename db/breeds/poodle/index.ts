import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "poodle",
  names: ["Pudel", "Caniche"],
  wasGuessedCorrectlyInPodcast: true,
  variants: [
    {
      names: ["Großpudel"],
      id: "standard",
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/grosspudel",
        },
      ],
    },
    {
      names: ["Kleinpudel"],
      id: "medium",
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/kleinpudel",
        },
      ],
    },
    {
      names: ["Zwergpudel"],
      id: "small",
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/chihuahua-kurzhaar",
        },
      ],
    },
    {
      names: ["Toy-Pudel"],
      id: "toy",
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/chihuahua-kurzhaar",
        },
      ],
    },
  ],
  fci: {
    group: 9,
    section: 2,
    standardNumber: 172,
  },
  podcast: [
    {
      number: 13,
      episode: "Leben und leben lassen",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/13-leben-und-leben-lassen-23n9dglym2zxx",
      timecode: 3510,
      airDate: "2021-06-01",
      context: "Erfahrungen mit der Rasse",
    },
    {
      number: 51,
      episode: "Wenn Nachrichten Angst machen",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/51-wenn-nachrichten-angst-machen-eay4li7j9ucbk",
      timecode: 1812,
      airDate: "2022-03-03",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Pudel",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/PUDEL-172.html",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/pudel",
    },
  ],
};

export default breed;
