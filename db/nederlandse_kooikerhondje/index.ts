import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "nederlandse_kooikerhondje",
  names: ["Nederlandse Kooikerhondje"],
  wasGuessedCorrectlyInPodcast: false,
  fci: {
    group: 8,
    section: 2,
    standardNumber: 314,
  },
  podcast: [
    {
      number: 73,
      episode: "Ferien, Strohmann-Argumente & eine rätselhafte Hunderasse",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/73-ferien-strohmann-argumente-eine-raetselhafte-hunderasse-1x9e06d6pxpnr",
      timecode: 2269,
      airDate: "2022-08-04",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Nederlandse_Kooikerhondje",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/NEDERLANDSE-KOOIKERHONDJE-314.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/nederlandse-kooikerhondje",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/nederlandse-kooikerhondje",
    },
  ],
};

export default breed;
