import type { Breed, FCI } from "../../../types/breed";
import { getBreedImagePath } from "../../../src/utils";

const fci: FCI = {
  group: 9,
  section: 2,
  standardNumber: 172,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Pudel", "Caniche"],
  variants: [
    {
      names: ["Großpudel"],
      image: getBreedImagePath({ ...fci, variant: "standard" }),
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/grosspudel",
        },
      ],
    },
    {
      names: ["Kleinpudel"],
      image: getBreedImagePath({ ...fci, variant: "medium" }),
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/kleinpudel",
        },
      ],
    },
    {
      names: ["Zwergpudel"],
      image: getBreedImagePath({ ...fci, variant: "small" }),
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/chihuahua-kurzhaar",
        },
      ],
    },
    {
      names: ["Toy-Pudel"],
      image: getBreedImagePath({ ...fci, variant: "toy" }),
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/chihuahua-kurzhaar",
        },
      ],
    },
  ],
  fci,
  podcast: [
    {
      number: 13,
      episode: "Leben und leben lassen",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/13-leben-und-leben-lassen-23n9dglym2zxx",
      timecode: 3557,
    },
    {
      number: 51,
      episode: "Wenn Nachrichten Angst machen",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/51-wenn-nachrichten-angst-machen-eay4li7j9ucbk",
      timecode: 1812,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Pudel",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/PUDEL-172.html",
    },
  ],
};

export default breed;
