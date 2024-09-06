import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "swedish_cattle_dog",
  names: [
    "Västgötaspets",
    "Westgotenspitz",
    "Schwedischer Schäferspitz",
    "Swedish Cattle Dog",
    "Schwedischer Vallhund",
  ],
  fci: {
    group: 5,
    section: 3,
    standardNumber: 14,
  },
  podcast: [
    {
      number: 83,
      episode: "Kriegsschrecken, Kommunikationsmöhren & falsche Schildkröten",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/83-kriegsschrecken-kommunikationsmoehren-falsche-schildkroeten-t7s7tgilkx2ql",
      timecode: 3562,
      airDateTimestamp: 1665622800000,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/V%C3%A4stg%C3%B6taspets",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/SCHWEDISCHER-WALLHUND-14.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/vaestgoetaspets",
    },
  ],
};

export default breed;
