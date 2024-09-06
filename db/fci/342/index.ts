import type { Breed, FCI } from "../../../types/breed";

const fci: FCI = {
  group: 1,
  section: 1,
  standardNumber: 342,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Australian Shepherd", "Australischer Schäferhund"],
  fci,
  podcast: [
    {
      number: 182,
      episode: "Blümerle",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/182-bluemerle-wwapqiaojdbki",
      timecode: 2130,
      airDateTimestamp: 1725498000000,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Australian_Shepherd",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/AUSTRALISCHER-SCHAFERHUND-342.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/australian-shepherd",
    },
  ],
};

export default breed;
