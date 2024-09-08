import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "german_shepherd",
  names: ["Deutscher Schäferhund"],
  variants: [
    {
      names: ["Stockhaar"],
      id: "short",
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/deutscher-schaeferhund-stockhaar",
        },
      ],
    },
    {
      names: ["Langstockhaar"],
      id: "long",
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/deutscher-schaeferhund-langstockhaar",
        },
      ],
    },
  ],
  fci: {
    group: 1,
    section: 1,
    standardNumber: 166,
  },
  podcast: [
    {
      number: 55,
      episode:
        "Hundetraining aus der Sprühflasche, Maulkorb & der Deutsche Schäferhund",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/55-hundetraining-aus-der-spruehflasche-maulkorb-der-deutsche-schaeferhund-v2o7yjc6mh4we",
      timecode: 1222,
      airDate: "2022-03-31",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Deutscher_Sch%C3%A4ferhund",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/DEUTSCHER-SCHAEFERHUND-166.html",
    },
  ],
};

export default breed;
