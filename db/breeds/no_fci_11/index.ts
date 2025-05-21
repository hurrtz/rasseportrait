import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "patterdale_terrier",
  names: ["Patterdale Terrier"],
  wasGuessedCorrectlyInPodcast: false,
  fci: {
    group: -1,
    section: -1,
    standardNumber: -1,
  },
  non_fci: 11,
  podcast: [
    {
      number: 203,
      episode: "Hölzerne Körper",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/203-hoelzerne-koerper-nrmedtvqkcq0d",
      timecode: 1303,
      airDate: "2025-01-30",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Patterdale_Terrier",
    },
    {
      name: "UKC",
      url: "https://www.ukcdogs.com/patterdale-terrier",
    },
    {
      name: "Patterdale Terrier Club of America",
      url: "https://patterdaleterrierclubofamerica.com/",
    },
  ],
};

export default breed;
