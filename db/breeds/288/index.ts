import type { Breed } from "../../../types/breed";

export default {
  id: 288,
  details: {
    internal: "chinese_crested_dog",
    public: ["Chinesischer Schopfhund"],
    variants: [
      {
        internal: "hairless",
        public: "Haarlos",
        furtherReading: [
          {
            name: "VDH",
            url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/chinese-crested-dog-hairless",
          },
        ],
      },
      {
        internal: "powderpuff",
        public: "Powderpuff",
        furtherReading: [
          {
            name: "VDH",
            url: "https://welpen.vdh.de/hunderassen/rasselexikon/ergebnis/chinese-crested-dog-powderpuff",
          },
        ],
      },
    ],
  },
  classification: {
    fci: {
      group: 9,
      section: 4,
      standardNumber: 288,
    },
  },
  podcast: [
    {
      number: 123,
      episode: "Oh, wie schön ist Panama",
      sources: [
        {
          url: "https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv/123-oh-wie-schoen-ist-panama-92aq873dx2z0n",
          type: "audio",
        },
      ],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1907,
        airDate: "2023-07-20",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [
    {
      name: "Wikipedia",
      url: "https://de.wikipedia.org/wiki/Chinesischer_Schopfhund",
    },
    {
      name: "FCI",
      url: "https://www.fci.be/de/nomenclature/CHINESISCHER-SCHOPFHUND-288.html",
    },
  ],
} satisfies Breed;
