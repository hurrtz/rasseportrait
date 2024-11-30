import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "labrador_retriever",
  names: ["Labrador Retriever"],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 8,
    section: 1,
    standardNumber: 122,
  },
  podcast: [
    {
      number: 94,
      episode: "Menschen, Biber, Emotionen",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/94-menschen-biber-emotionen-qm9qeqv1xrlas",
      timecode: 5465,
      airDate: "2022-12-29",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Labrador_Retriever",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/LABRADOR-RETRIEVER-122.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/labrador-retriever",
    },
  ],
};

export default breed;
