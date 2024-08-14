import type { Breed, FCI } from "../../../types/breed";

const fci: FCI = {
  group: 5,
  section: 5,
  standardNumber: 344,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: [
    "Amerikanischer Akita",
    "Great Japanese Dog",
    "Großer Japanischer Hund",
  ],
  fci,
  podcast: [
    {
      number: "Summer Edition #7",
      episode: "Hobby Horsing for Olympia!",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/neue-folge",
      timecode: 1075,
      airDateTimestamp: 1723078800000,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Amerikanischer_Akita",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/AMERIKANISCHER-AKITA-344.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/amerikanischer-akita",
    },
  ],
};

export default breed;
