import type { Breed, FCI } from "../../../types/breed";

const fci: FCI = {
  group: 5,
  section: 2,
  standardNumber: 48,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: [
    "Karelischer Bärenhund",
    "Karjalankarhukoira",
    "Björnhund",
    "Hund der Zyrianer",
  ],
  fci,
  podcast: [
    {
      number: 132,
      episode: "Funkstille, Fliegen & Hochstaplersyndrom",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/132-funkstille-fliegen-hochstaplersyndrom-vw7v85dyj5wp9",
      timecode: 2264,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Karelischer_B%C3%A4renhund",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/KARELISCHER-BARENHUND-48.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/karelischer-baerenhund",
    },
  ],
};

export default breed;
