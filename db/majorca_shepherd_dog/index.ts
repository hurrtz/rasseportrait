import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "majorca_shepherd_dog",
  names: [
    "Ca de Bestiar",
    "Perro de pastor mallorquín",
    "Mallorca-Schäferhund",
  ],
  variants: [
    {
      names: ["Kurzhaar"],
      id: "short",
    },
    {
      names: ["Langhaar"],
      id: "long",
    },
  ],
  fci: {
    group: 1,
    section: 1,
    standardNumber: 321,
  },
  podcast: [
    {
      number: 166,
      episode: "Zwingerclub",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/166-zwingerclub-2ok8zkm2k969d",
      timecode: 2947,
      airDateTimestamp: 1715821200000,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Ca_de_Bestiar",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/MALLORCA-SCHAFERHUND-321.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/perro-de-pastor-mallorquin",
    },
  ],
};

export default breed;
