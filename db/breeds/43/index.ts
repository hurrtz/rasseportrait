import type { Breed } from "../../../types/breed";

export default {
  id: 43,
  details: {
    internal: "basenji",
    public: ["Basenji", "Kongo-Terrier"],
  },
  classification: {
    fci: {
      group: 5,
      section: 6,
      standardNumber: 43,
    },
  },
  podcast: [
    {
      number: 59,
      episode: "Religionskriege bei Facebook, vegane Hunde und kleine Ritter",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/58-religionskriege-bei-facebook-vegane-hunde-und-kleine-ritter-u6g77nktkpqi2",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1157,
        airDate: "2022-04-21",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Basenji",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/BASENJI-43.html",
    },
    {
      name: "VDH",
      url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/basenji",
    },
  ],
} as Breed;
