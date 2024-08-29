import type { Breed, FCI } from "../../../types/breed";

const fci: FCI = {
  group: 6,
  section: 1,
  standardNumber: 62,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Steirische Rauhhaarbracke", "Peintinger-Bracke"],
  fci,
  podcast: [
    {
      number: "Summer Edition #9",
      episode: "Katzengefühle",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/summer-edition-9-katzengefuehle-57gluk24bflht",
      timecode: 2044,
      airDateTimestamp: 1724288400000,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Steirische_Rauhhaarbracke",
    },
    {
      name: "FCI",
      url: "https://fci.be/de/nomenclature/STEIRISCHE-RAUHHAARBRACKE-62.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/steirische-rauhhaarbracke",
    },
  ],
};

export default breed;
