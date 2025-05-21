import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "german_jagdterrier",
  names: ["Deutscher Jagdterrier"],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 3,
    section: 1,
    standardNumber: 103,
  },
  podcast: [
    {
      number: 103,
      episode: "Feindliche Natur, Jagdverhalten & Hundehomöopathie",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/103-feindliche-natur-jagdverhalten-hundehomoeopathie-w2n7ys2hcqab2",
      timecode: 2280,
      airDate: "2023-03-02",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Deutscher_Jagdterrier",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/DEUTSCHER-JAGDTERRIER-103.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/deutscher-jagdterrier",
    },
  ],
};

export default breed;
