import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "bedlington_terrier",
  names: ["Bedlington Terrier", "Rothbury Terrier"],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 3,
    section: 1,
    standardNumber: 9,
  },
  podcast: [
    {
      number: 188,
      episode: "Selbstreflexion & Pudelhaube",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/188-selbstreflexion-pudelhaube-1co8nbj85o8tw",
      timecode: 1944,
      airDate: "2024-10-17",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Bedlington_Terrier",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/BEDLINGTON-TERRIER-9.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/bedlington-terrier",
    },
  ],
};

export default breed;
