import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "chihuahua",
  names: ["Chihuahua", "Techichi", "Chihuahueño"],
  wasGuessedCorrectlyInPodcast: "not_applicable",
  fci: {
    group: 9,
    section: 6,
    standardNumber: 218,
  },
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
      airDate: "2022-02-10",
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
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/chihuahua",
    },
  ],
};

export default breed;
