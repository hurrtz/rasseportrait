import type { Breed } from "../../../types/breed";

const breed: Breed = {
  id: "spanish_water_dog",
  names: [
    "Spanischer Wasserhund",
    "Perro de Agua Español",
    "perro Turco",
    "Türkenhund",
    "Turco Andaluz",
    "Andalusischer Türke",
  ],
  wasGuessedCorrectlyInPodcast: "not_applicable",
  fci: {
    group: 8,
    section: 3,
    standardNumber: 336,
  },
  podcast: [
    {
      number: 85,
      episode: "Suppenattacke, Rudelbegegnung & 1 eiliger Aufruf!!",
      url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/85-suppenattacke-rudelbegegnung-1-eiliger-aufruf-zyhm5ofxax4e1",
      timecode: 4006,
      airDate: "2022-10-27",
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Perro_de_Agua_Espa%C3%B1ol",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/SPANISCHER-WASSERHUND-336.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/perro-de-agua-espanol",
    },
  ],
};

export default breed;
