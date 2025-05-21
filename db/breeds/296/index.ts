import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "collie",
  names: ["Collie"],
  wasGuessedCorrectlyInPodcast: true,
  variants: [
    {
      id: "smooth",
      names: [
        "Kurzhaar",
        "Kurzhaariger Schottischer Schäferhund",
        "Smooth Collie",
      ],
    },
  ],
  fci: {
    group: 1,
    section: 1,
    standardNumber: 296,
  },
  podcast: [
    {
      number: 216,
      episode: "Missing Dog Syndrome",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/216-missing-dog-syndrome-v6p8x3s3b42pg",
      timecode: 1846,
      airDate: "2025-05-09",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Kurzhaarcollie",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/KURZHAARIGER-SCHOTTISCHER-SCHAFERHUND-296.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/collie-kurzhaar",
    },
  ],
};

export default breed;
