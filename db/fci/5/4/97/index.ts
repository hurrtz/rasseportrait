import type { Breed, FCI } from "../../../../../types/breed";
import { getBreedImagePath } from "../../../../../src/utils";

const fci: FCI = {
  group: 5,
  section: 4,
  standardNumber: 97,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Deutscher Spitz"],
  variants: [
    {
      names: ["Pomeranian", "Zwergspitz"],
      image: getBreedImagePath({ ...fci, variant: "pomeranian" }),
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/zwergspitz",
        },
      ],
    },
    {
      names: ["Kleinspitz"],
      image: getBreedImagePath({ ...fci, variant: "miniature" }),
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/kleinspitz",
        },
      ],
    },
    {
      names: ["Mittelspitz"],
      image: getBreedImagePath({ ...fci, variant: "medium" }),
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/mittelspitz",
        },
      ],
    },
    {
      names: ["Großspitz"],
      image: getBreedImagePath({ ...fci, variant: "large" }),
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/grossspitz",
        },
      ],
    },
    {
      names: ["Wolfsspitz", "Keeshond"],
      image: getBreedImagePath({ ...fci, variant: "keeshound" }),
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/wolfsspitz",
        },
      ],
    },
  ],
  fci,
  podcast: [
    {
      number: 49,
      episode: "Der Spitz, Zwingerhaltung & Puddingmatten",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/49-der-spitz-zwingerhaltung-puddingmatten-7hsefpcuadjr7",
      timecode: 924,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Deutsche_Spitze",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/DEUTSCHER-SPITZ-97.html",
    },
  ],
};

export default breed;
