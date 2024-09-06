import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "viszla",
  names: ["Viszla", "Ungarischer Vorstehhund"],
  variants: [
    {
      id: "short",
      names: ["Kurzhaarig"],
      fci: {
        group: 7,
        section: 1,
        standardNumber: 57,
      },
      furtherReading: [
        {
          name: "Wikipedia",
          url: "https://de.wikipedia.org/wiki/Kurzhaariger_Ungarischer_Vorstehhund",
        },
        {
          name: "FCI",
          url: "https://www.fci.be/de/nomenclature/KURZHAARIGER-UNGARISCHER-VORSTEHHUND-VIZSLA-57.html",
        },
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/magyar-vizsla-kurzhaar",
        },
      ],
    },
    {
      id: "wire",
      names: ["Drahthaarig"],
      fci: {
        group: 7,
        section: 1,
        standardNumber: 239,
      },
      furtherReading: [
        {
          name: "Wikipedia",
          url: "https://de.wikipedia.org/wiki/Drahthaariger_Ungarischer_Vorstehhund",
        },
        {
          name: "FCI",
          url: "https://www.fci.be/de/nomenclature/DRAHTHAARIGER-UNGARISCHER-VORSTEHHUND-239.html",
        },
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/magyar-vizsla-drahthaar",
        },
      ],
    },
  ],
  podcast: [
    {
      number: 53,
      episode: "Richtig Helfen, fliegende Kotbeutel & der Weimaraner",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/53-der-viszla-ein-weltrekord-gefahr-durch-magendrehung-u0o9xqbtbwfk3",
      timecode: 2414,
      airDateTimestamp: 1647478800000,
    },
  ],
  furtherReading: [],
};

export default breed;
