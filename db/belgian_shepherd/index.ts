import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "belgian_shepherd",
  names: ["Belgischer Schäferhund"],
  variants: [
    {
      names: ["Groenendael"],
      id: "groenendael",
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/groenendael",
        },
      ],
    },
    {
      names: ["Laekenois"],
      id: "laekenois",
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/laekenois",
        },
      ],
    },
    {
      names: ["Malinois", "Mechelaar"],
      id: "malinois",
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/malinois",
        },
      ],
    },
    {
      names: ["Tervueren"],
      id: "tervueren",
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/tervueren",
        },
      ],
    },
  ],
  fci: {
    group: 1,
    section: 1,
    standardNumber: 15,
  },
  podcast: [
    {
      number: 62,
      episode: "Tierschutzhundeverordnung, Strohhalmtest & Zwingerhaltung",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/62-tierschutzhundeverordnung-strohhalmtest-zwingerhaltung-vbf1lpiq5foqn",
      timecode: 3729,
      airDateTimestamp: 1652922000000,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Belgischer_Sch%C3%A4ferhund",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/BELGISCHER-SCHAFERHUND-15.html",
    },
  ],
};

export default breed;
