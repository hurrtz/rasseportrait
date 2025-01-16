import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "markiesje",
  names: ["Markiesje"],
  wasGuessedCorrectlyInPodcast: false,
  fci: {
    group: -1,
    section: -1,
    standardNumber: -1,
  },
  podcast: [
    {
      number: 201,
      episode: "Hunde, Hysterie und Heuriger",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/201-hunde-hysterie-und-heuriger-t3vap4q0lxtuo",
      timecode: 1824,
      airDate: "2025-01-16",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Markiesje",
    },
    {
      name: "Markiesjesvereniging",
      url: "https://www.markiesjesvereniging.nl/het-markiesje/rasstandaard.html",
    },
  ],
};

export default breed;
