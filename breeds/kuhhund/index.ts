import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "kuhhund",
  names: ["Kuhhund", "Westerwälder Kuhhund", "Siegerländer Kuhhund"],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: -1,
    section: -1,
    standardNumber: -1,
  },
  podcast: [
    {
      number: 197,
      episode: "Naturstumper",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/197-naturstumper-dsjc2lg3wwjlx",
      timecode: 1193,
      airDate: "2024-12-19",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Kuhhund",
    },
    {
      name: "GEH",
      url: "https://www.g-e-h.de/rassebeschreibungen/46-hunde/89-westerwaelder-kuhhund",
    },
  ],
};

export default breed;
