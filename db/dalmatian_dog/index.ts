import type { Breed } from "../../types/breed";

const breed: Breed = {
  id: "dalmatian_dog",
  names: ["Dalmatiner"],
  wasGuessedCorrectlyInPodcast: "not_applicable",
  fci: {
    group: 6,
    section: 3,
    standardNumber: 153,
  },
  podcast: [
    {
      number: 12,
      episode: "Die ganze Wahrheit",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/12-die-ganze-wahrheit-kc3oyphk7j1ra",
      timecode: 890,
      airDate: "2021-05-25",
      context: "Erfahrungen mit der Rasse",
    },
    {
      number: 105,
      episode: "Geiselnahme, skurrile Wildtiere & 1,5 Grad wärmer",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/105-geiselnahme-skurrile-wildtiere-1-5-grad-waermer-9qzro9uynb4pc",
      timecode: 3565,
      airDate: "2023-03-16",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Dalmatiner",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/DALMATINER-153.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/dalmatiner",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/dalmatiner-1",
    },
  ],
};

export default breed;
