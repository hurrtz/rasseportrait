import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "australian_kelpie",
  names: [
    "Australian Kelpie",
    "Kelpie",
    "Australischer Schäferhund",
    "Australian Sheepdog",
    "Barb",
  ],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 1,
    section: 1,
    standardNumber: 293,
  },
  podcast: [
    {
      number: 122,
      episode: "Kurioser Unfall, Katzenbegegnungen & Fledermausbomben",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/122-kurioser-unfall-katzenbegegnungen-fledermausbomben-vdy2nybu1xoqm",
      timecode: 2632,
      airDate: "2023-07-13",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Australian_Kelpie",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/AUSTRALIAN-KELPIE-293.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/australian-kelpie",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/australian-kelpie",
    },
  ],
};

export default breed;
