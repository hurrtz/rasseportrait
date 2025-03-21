import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "elo",
  names: ["Elo"],
  wasGuessedCorrectlyInPodcast: "not_applicable",
  fci: {
    group: -1,
    section: -1,
    standardNumber: -1,
  },
  podcast: [
    {
      number: 32,
      episode: "Elos, eckige Hühner & blutrünstige Nutrias",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/32-elos-eckige-huehner-blutruenstige-nutrias-cn96yspmq7wbu",
      timecode: 676,
      airDate: "2021-10-19",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Elo_(Hunderasse)",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/elo",
    },
  ],
};

export default breed;
