import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "griffon_nivernais",
  names: ["Griffon Nivernais"],
  fci: {
    group: 6,
    section: 1,
    standardNumber: 17,
  },
  podcast: [
    {
      number: 150,
      episode: "Eine Laune der Natur",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/150-eine-laune-der-natur-urjn3ugdyex4s",
      timecode: 2507,
      airDate: "2024-01-25",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Griffon_Nivernais",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/GRIFFON-NIVERNAIS-17.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/griffon-nivernais",
    },
  ],
};

export default breed;
