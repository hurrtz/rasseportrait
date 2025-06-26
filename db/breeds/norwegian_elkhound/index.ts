import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "norwegian_elkhound",
  names: ["Norwegischer Elchhund", "Norwegian Elkhound", "Dyrehund"],
  variants: [
    {
      id: "black",
      names: ["schwarz"],
      fci: {
        group: 5,
        section: 2,
        standardNumber: 268,
      },
      furtherReading: [
        {
          name: "Wikipedia",
          url: "https://de.wikipedia.org/wiki/Norwegischer_Elchhund_schwarz",
        },
        {
          name: "FCI",
          url: "https://www.fci.be/de/nomenclature/NORWEGISCHER-ELCHHUND-SCHWARZ-268.html",
        },
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/norwegischer-elchhund-schwarz",
        },
      ],
    },
    {
      id: "grey",
      names: ["grau"],
      fci: {
        group: 5,
        section: 2,
        standardNumber: 242,
      },
      furtherReading: [
        {
          name: "Wikipedia",
          url: "https://de.wikipedia.org/wiki/Norwegischer_Elchhund_grau",
        },
        {
          name: "FCI",
          url: "https://www.fci.be/de/nomenclature/NORWEGISCHER-ELCHHUND-GRAU-242.html",
        },
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/norwegischer-elchhund-grau",
        },
      ],
    },
  ],
  wasGuessedCorrectlyInPodcast: true,
  podcast: [
    {
      number: 223,
      episode: "Hirschkäfer fliegt",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/223-hirschkaefer-flieg-mtn0ofyb3vlsl",
      timecode: 2912,
      airDate: "2025-06-26",
    },
  ],
  furtherReading: [],
};

export default breed;
