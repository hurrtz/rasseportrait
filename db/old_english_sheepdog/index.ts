import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "old_english_sheepdog",
  names: ["Bobtail", "Old English Sheepdog", "Altenglischer Schäferhund"],
  fci: {
    group: 1,
    section: 1,
    standardNumber: 16,
  },
  podcast: [
    {
      number: 112,
      episode: "Brüten & Setzen!",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/112-brueten-setzen-c0h1emp4yng4h",
      timecode: 2309,
      airDateTimestamp: 1683162000000,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Bobtail",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/ALTENGLISCHER-SCHAFERHUND-16.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/bobtail-old-english-sheepdog",
    },
  ],
};

export default breed;
