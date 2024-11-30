import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "cane_corso",
  names: ["Cane Corso Italiano"],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 2,
    section: 2,
    standardNumber: 343,
  },
  podcast: [
    {
      number: 97,
      episode: "Blue Monday, warme Omas & Karnevalspferde",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/97-blue-monday-warme-omas-karnevalspferde-izivqxtjko9uh",
      timecode: 702,
      airDate: "2023-01-19",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Cane_Corso_Italiano",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/ITALIENISCHER-CORSO-HUND-343.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/cane-corso-italiano",
    },
  ],
};

export default breed;
