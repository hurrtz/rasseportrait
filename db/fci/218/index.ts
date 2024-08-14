import type { Breed, FCI } from "../../../types/breed";

const fci: FCI = {
  group: 9,
  section: 6,
  standardNumber: 218,
};

const { standardNumber: id } = fci;

const breed: Breed = {
  id,
  names: ["Chihuahua", "Techichi", "Chihuahueño"],
  fci,
  variants: [
    {
      names: ["kurzhaarig"],
      id: "short",
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/chihuahua-kurzhaar",
        },
      ],
    },
    {
      names: ["langhaarig"],
      id: "long",
      furtherReading: [
        {
          name: "VDH",
          url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/chihuahua-langhaar",
        },
      ],
    },
  ],
  podcast: [
    {
      number: 48,
      episode: "Zuchtverbote, Eutrophierung & Helmpflicht für Chihuahuas",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/48-zuchtverbote-eutrophierung-helmpflicht-fuer-chihuahuas-532onwpr31v22",
      timecode: 2362,
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Chihuahua_(Hunderasse)",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/CHIHUAHUA-218.html",
    },
  ],
};

export default breed;
