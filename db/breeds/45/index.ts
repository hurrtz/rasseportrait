import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "bernese_mountain_dog",
  names: [
    "Berner Sennenhund",
    "Dürrbächler",
    "Bouvier bernois",
    "Bernese Mountain Dog",
    "Perro Boyero de montaña Bernés",
  ],
  wasGuessedCorrectlyInPodcast: true,
  fci: {
    group: 2,
    section: 3,
    standardNumber: 45,
  },
  podcast: [
    {
      number: 69,
      episode: "Hunde bei Wärme im Auto, Freiwilligendienst & leckere Häppchen",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/69-hunde-bei-waerme-im-auto-freiwilligendienst-leckere-haeppchen-f6rev34kklaku",
      timecode: 2276,
      airDate: "2022-07-07",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Berner_Sennenhund",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/BERNER-SENNENHUND-45.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/berner-sennenhund",
    },
    {
      name: "Martin Rütter",
      url: "https://www.martinruetter.com/rassekunde/berner-sennenhund",
    },
  ],
};

export default breed;
