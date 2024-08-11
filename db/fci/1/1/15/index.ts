import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 1,
  section: 1,
  standardNumber: 15,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Belgischer Schäferhund"],
  variants: [
    {
      names: ["Groenendael"],
      image: getBreedImagePath({ ...fci, variant: "groenendael" }),
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/groenendael",
        },
      ],
    },
    {
      names: ["Laekenois"],
      image: getBreedImagePath({ ...fci, variant: "laekenois" }),
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/laekenois",
        },
      ],
    },
    {
      names: ["Malinois", "Mechelaar"],
      image: getBreedImagePath({ ...fci, variant: "malinois" }),
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/malinois",
        },
      ],
    },
    {
      names: ["Tervueren"],
      image: getBreedImagePath({ ...fci, variant: "tervueren" }),
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/tervueren",
        },
      ],
    },
  ],
  fci,
  podcast: [
    {
      number: 62,
      episode: "Tierschutzhundeverordnung, Strohhalmtest & Zwingerhaltung",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/62-tierschutzhundeverordnung-strohhalmtest-zwingerhaltung-vbf1lpiq5foqn",
      timecode: 3729,
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
