import type { Breed } from "~/../../types/breed";

export const mockBreed1: Breed = {
  id: 1,
  details: {
    internal: "golden_retriever",
    public: ["Golden Retriever"],
  },
  classification: {
    fci: {
      group: 8,
      section: 1,
      standardNumber: 111,
    },
  },
  podcast: [
    {
      number: 10,
      episode: "Test Episode",
      sources: [{ url: "https://example.com", type: "audio" }],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1200,
        airDate: "2022-01-15",
        isGuessable: true,
        isGuessedCorrectly: true,
        guessedBy: "mr",
      },
    },
  ],
  furtherReading: [],
};

export const mockBreed2: Breed = {
  id: 2,
  details: {
    internal: "beagle",
    public: ["Beagle"],
  },
  classification: {
    fci: {
      group: 6,
      section: 1,
      standardNumber: 161,
    },
  },
  podcast: [
    {
      number: 5,
      episode: "Another Episode",
      sources: [{ url: "https://example.com", type: "audio" }],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 900,
        airDate: "2021-12-10",
        isGuessable: true,
        isGuessedCorrectly: false,
        guessedBy: "ka",
      },
    },
  ],
  furtherReading: [],
};

export const mockBreed3: Breed = {
  id: 3,
  details: {
    internal: "australian_shepherd",
    public: ["Australian Shepherd"],
  },
  classification: {
    fci: {
      group: 1,
      section: 1,
      standardNumber: 342,
    },
  },
  podcast: [
    {
      number: 20,
      episode: "Latest Episode",
      sources: [{ url: "https://example.com", type: "audio" }],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1500,
        airDate: "2023-06-01",
        isGuessable: undefined,
        isGuessedCorrectly: undefined,
        guessedBy: undefined,
      },
    },
  ],
  furtherReading: [],
};

export const mockBreedWithoutFCI: Breed = {
  id: 4,
  details: {
    internal: "designer_dog",
    public: ["Designer Dog"],
  },
  classification: {
    fci: undefined,
  },
  podcast: [
    {
      number: 15,
      episode: "Special Episode",
      sources: [{ url: "https://example.com", type: "audio" }],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 600,
        airDate: "2022-03-20",
        isGuessable: undefined,
        isGuessedCorrectly: undefined,
        guessedBy: undefined,
      },
    },
  ],
  furtherReading: [],
};

export const mockGroupedBreed1: Breed = {
  id: 5,
  details: {
    internal: "pembroke_corgi",
    public: ["Pembroke Welsh Corgi"],
    groupAs: "Corgi",
  },
  classification: {
    fci: {
      group: 1,
      section: 1,
      standardNumber: 39,
    },
  },
  podcast: [
    {
      number: 25,
      episode: "Corgi Special",
      sources: [{ url: "https://example.com", type: "audio" }],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 1800,
        airDate: "2023-01-10",
        isGuessable: undefined,
        isGuessedCorrectly: undefined,
        guessedBy: undefined,
      },
    },
  ],
  furtherReading: [],
};

export const mockGroupedBreed2: Breed = {
  id: 6,
  details: {
    internal: "cardigan_corgi",
    public: ["Cardigan Welsh Corgi"],
    groupAs: "Corgi",
  },
  classification: {
    fci: {
      group: 1,
      section: 1,
      standardNumber: 38,
    },
  },
  podcast: [
    {
      number: 25,
      episode: "Corgi Special",
      sources: [{ url: "https://example.com", type: "audio" }],
      meta: {
        internal: "portrait",
        public: "Rasseportrait",
        timecode: 2100,
        airDate: "2023-01-10",
        isGuessable: undefined,
        isGuessedCorrectly: undefined,
        guessedBy: undefined,
      },
    },
  ],
  furtherReading: [],
};
