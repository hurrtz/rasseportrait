import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "irish_wolfhound",
  names: ["Irischer Wolfshund", "Irish Wolfhound"],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 10,
    section: 2,
    standardNumber: 160,
  },
  podcast: [
    {
      number: 75,
      episode: "Faultiere, Hitzschlag & Leben nach dem Tod",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/75-faultiere-hitzschlag-leben-nach-dem-tod-rqnqcr03z9fmo",
      timecode: 2544,
      airDate: "2022-08-18",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Irischer_Wolfshund",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/IRISCHER-WOLFSHUND-160.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/irish-wolfhound",
    },
  ],
};

export default breed;
