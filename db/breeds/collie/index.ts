import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "collie",
  names: ["Collie"],
  wasGuessedCorrectlyInPodcast: true,
  variants: [
    {
      id: "rough",
      names: [
        "Langhaar",
        "Langhaariger Schottischer Schäferhund",
        "Rough Collie",
      ],
      fci: {
        group: 1,
        section: 1,
        standardNumber: 156,
      },
      furtherReading: [
        {
          name: "Wikipedia",
          url: "https://de.wikipedia.org/wiki/Langhaarcollie",
        },
        {
          name: "FCI",
          url: "https://www.fci.be/de/nomenclature/LANGHAARIGER-SCHOTTISCHER-SCHAFERHUND-156.html",
        },
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/collie-langhaar",
        },
      ],
    },
    {
      id: "smooth",
      names: [
        "Kurzhaar",
        "Kurzhaariger Schottischer Schäferhund",
        "Smooth Collie",
      ],
      fci: {
        group: 1,
        section: 1,
        standardNumber: 296,
      },
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
    },
  ],
  podcast: [
    {
      number: 216,
      episode: "Missing Dog Syndrome",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/216-missing-dog-syndrome-v6p8x3s3b42pg",
      timecode: 1846,
      airDate: "2025-05-09",
    },
  ],
  furtherReading: [],
};

export default breed;
