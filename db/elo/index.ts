import type { Breed, FCI } from "../../../types/breed";

const fci: FCI = {
  group: -1,
  section: -1,
  standardNumber: -1,
};

const breed: Breed = {
  id: "elo",
  names: ["Elo"],
  fci,
  podcast: [
    {
      number: 32,
      episode: "Elos, eckige Hühner & blutrünstige Nutrias",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/32-elos-eckige-huehner-blutruenstige-nutrias-cn96yspmq7wbu",
      timecode: 717,
      airDateTimestamp: 1634605200000,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Elo_(Hunderasse)",
    },
  ],
};

export default breed;