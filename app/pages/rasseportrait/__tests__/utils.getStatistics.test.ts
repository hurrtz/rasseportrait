import type { Breed } from "../../../../types/breed";
import { getStatistics } from "../utils";
import { AMOUNT_OF_BREEDS_TOTAL } from "../constants";

describe("getStatistics", () => {
  const createBreed = (
    id: number,
    options: {
      hasPortrait?: boolean;
      airDate?: string;
      hasFCI?: boolean;
      guessedBy?: "mr" | "ka";
      isGuessable?: boolean;
      isGuessedCorrectly?: boolean;
    } = {},
  ): Breed => ({
    id,
    details: {
      internal: `breed-${id}`,
      public: [`Breed ${id}`],
    },
    classification: {
      fci: options.hasFCI
        ? {
            group: 1,
            section: 1,
            standardNumber: 100 + id,
          }
        : undefined,
    },
    podcast: options.hasPortrait
      ? [
          {
            number: id,
            episode: `Episode ${id}`,
            sources: [],
            meta: {
              internal: "portrait",
              public: `Portrait ${id}`,
              timecode: 0,
              airDate: options.airDate || "2023-01-01",
              isGuessable: options.isGuessable,
              isGuessedCorrectly: options.isGuessedCorrectly,
              guessedBy: options.guessedBy,
            },
          },
        ]
      : [],
    furtherReading: [],
  });

  describe("Basic Statistics", () => {
    it("should count breeds with portraits correctly", () => {
      const breeds: Breed[] = [
        createBreed(1, { hasPortrait: true }),
        createBreed(2, { hasPortrait: true }),
        createBreed(3, { hasPortrait: false }),
      ];

      const result = getStatistics(breeds);

      expect(result.amountBreedsPresented).toBe(2);
    });

    it("should calculate percentage of breeds presented", () => {
      const breeds: Breed[] = [
        createBreed(1, { hasPortrait: true }),
        createBreed(2, { hasPortrait: false }),
      ];

      const result = getStatistics(breeds);

      const expected = ((1 / AMOUNT_OF_BREEDS_TOTAL) * 100).toFixed(2);
      expect(result.percentageBreedsPresented).toBe(expected);
    });

    it("should identify breeds outside FCI", () => {
      const breeds: Breed[] = [
        createBreed(1, { hasPortrait: true, hasFCI: true }),
        createBreed(2, { hasPortrait: true, hasFCI: false }),
        createBreed(3, { hasPortrait: false, hasFCI: false }),
      ];

      const result = getStatistics(breeds);

      expect(result.breedsOutsideFCI).toHaveLength(2);
      expect(result.breedsOutsideFCI[0].id).toBe(2);
      expect(result.breedsOutsideFCI[1].id).toBe(3);
    });

    it("should identify breeds not presented", () => {
      const breeds: Breed[] = [
        createBreed(1, { hasPortrait: true }),
        createBreed(2, { hasPortrait: false }),
        createBreed(3, { hasPortrait: false }),
      ];

      const result = getStatistics(breeds);

      expect(result.breedsNotPresented).toHaveLength(2);
      expect(result.breedsNotPresented[0].id).toBe(2);
      expect(result.breedsNotPresented[1].id).toBe(3);
    });
  });

  describe("Martin's Guesses", () => {
    it("should count Martin's correct guesses", () => {
      const breeds: Breed[] = [
        createBreed(1, {
          hasPortrait: true,
          guessedBy: "mr",
          isGuessable: true,
          isGuessedCorrectly: true,
        }),
        createBreed(2, {
          hasPortrait: true,
          guessedBy: "mr",
          isGuessable: true,
          isGuessedCorrectly: false,
        }),
        createBreed(3, {
          hasPortrait: true,
          guessedBy: "mr",
          isGuessable: true,
          isGuessedCorrectly: true,
        }),
      ];

      const result = getStatistics(breeds);

      expect(result.martinCorrectGuesses).toBe(2);
    });

    it("should count total guessable breeds for Martin", () => {
      const breeds: Breed[] = [
        createBreed(1, {
          hasPortrait: true,
          guessedBy: "mr",
          isGuessable: true,
          isGuessedCorrectly: true,
        }),
        createBreed(2, {
          hasPortrait: true,
          guessedBy: "mr",
          isGuessable: true,
          isGuessedCorrectly: false,
        }),
        createBreed(3, {
          hasPortrait: true,
          guessedBy: "ka",
          isGuessable: true,
          isGuessedCorrectly: true,
        }),
      ];

      const result = getStatistics(breeds);

      expect(result.martinCorrectGuessesOutOfTotal).toBe(2);
    });

    it("should calculate Martin's correct guess percentage", () => {
      const breeds: Breed[] = [
        createBreed(1, {
          hasPortrait: true,
          guessedBy: "mr",
          isGuessable: true,
          isGuessedCorrectly: true,
        }),
        createBreed(2, {
          hasPortrait: true,
          guessedBy: "mr",
          isGuessable: true,
          isGuessedCorrectly: false,
        }),
      ];

      const result = getStatistics(breeds);

      // 1 correct out of 2 total = 50%
      expect(result.martinCorrectGuessesPercentage).toBe("50.00");
    });

    it("should not count non-guessable breeds for Martin", () => {
      const breeds: Breed[] = [
        createBreed(1, {
          hasPortrait: true,
          guessedBy: "mr",
          isGuessable: false,
          isGuessedCorrectly: true,
        }),
        createBreed(2, {
          hasPortrait: true,
          guessedBy: "mr",
          isGuessable: true,
          isGuessedCorrectly: true,
        }),
      ];

      const result = getStatistics(breeds);

      expect(result.martinCorrectGuessesOutOfTotal).toBe(1);
      expect(result.martinCorrectGuesses).toBe(1);
    });
  });

  describe("Katharina's Guesses", () => {
    it("should count Katharina's correct guesses", () => {
      const breeds: Breed[] = [
        createBreed(1, {
          hasPortrait: true,
          guessedBy: "ka",
          isGuessable: true,
          isGuessedCorrectly: true,
        }),
        createBreed(2, {
          hasPortrait: true,
          guessedBy: "ka",
          isGuessable: true,
          isGuessedCorrectly: false,
        }),
        createBreed(3, {
          hasPortrait: true,
          guessedBy: "ka",
          isGuessable: true,
          isGuessedCorrectly: true,
        }),
      ];

      const result = getStatistics(breeds);

      expect(result.katharinaCorrectGuesses).toBe(2);
    });

    it("should count total guessable breeds for Katharina", () => {
      const breeds: Breed[] = [
        createBreed(1, {
          hasPortrait: true,
          guessedBy: "ka",
          isGuessable: true,
          isGuessedCorrectly: true,
        }),
        createBreed(2, {
          hasPortrait: true,
          guessedBy: "ka",
          isGuessable: true,
          isGuessedCorrectly: false,
        }),
        createBreed(3, {
          hasPortrait: true,
          guessedBy: "mr",
          isGuessable: true,
          isGuessedCorrectly: true,
        }),
      ];

      const result = getStatistics(breeds);

      expect(result.katharinaCorrectGuessesOutOfTotal).toBe(2);
    });

    it("should calculate Katharina's correct guess percentage", () => {
      const breeds: Breed[] = [
        createBreed(1, {
          hasPortrait: true,
          guessedBy: "ka",
          isGuessable: true,
          isGuessedCorrectly: true,
        }),
        createBreed(2, {
          hasPortrait: true,
          guessedBy: "ka",
          isGuessable: true,
          isGuessedCorrectly: true,
        }),
        createBreed(3, {
          hasPortrait: true,
          guessedBy: "ka",
          isGuessable: true,
          isGuessedCorrectly: false,
        }),
        createBreed(4, {
          hasPortrait: true,
          guessedBy: "ka",
          isGuessable: true,
          isGuessedCorrectly: false,
        }),
      ];

      const result = getStatistics(breeds);

      // 2 correct out of 4 total = 50%
      expect(result.katharinaCorrectGuessesPercentage).toBe("50.00");
    });

    it("should not count non-guessable breeds for Katharina", () => {
      const breeds: Breed[] = [
        createBreed(1, {
          hasPortrait: true,
          guessedBy: "ka",
          isGuessable: false,
          isGuessedCorrectly: true,
        }),
        createBreed(2, {
          hasPortrait: true,
          guessedBy: "ka",
          isGuessable: true,
          isGuessedCorrectly: true,
        }),
      ];

      const result = getStatistics(breeds);

      expect(result.katharinaCorrectGuessesOutOfTotal).toBe(1);
      expect(result.katharinaCorrectGuesses).toBe(1);
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty breed list", () => {
      const result = getStatistics([]);

      expect(result.amountBreedsPresented).toBe(0);
      expect(result.percentageBreedsPresented).toBe("0.00");
      expect(result.breedsOutsideFCI).toHaveLength(0);
      expect(result.breedsNotPresented).toHaveLength(0);
      expect(result.martinCorrectGuesses).toBe(0);
      expect(result.martinCorrectGuessesOutOfTotal).toBe(0);
      expect(result.katharinaCorrectGuesses).toBe(0);
      expect(result.katharinaCorrectGuessesOutOfTotal).toBe(0);
    });

    it("should handle all breeds presented", () => {
      const breeds: Breed[] = [
        createBreed(1, { hasPortrait: true }),
        createBreed(2, { hasPortrait: true }),
      ];

      const result = getStatistics(breeds);

      expect(result.breedsNotPresented).toHaveLength(0);
      expect(result.amountBreedsPresented).toBe(2);
    });

    it("should handle no guessable breeds", () => {
      const breeds: Breed[] = [
        createBreed(1, { hasPortrait: true, isGuessable: false }),
        createBreed(2, { hasPortrait: true, isGuessable: false }),
      ];

      const result = getStatistics(breeds);

      expect(result.martinCorrectGuessesOutOfTotal).toBe(0);
      expect(result.katharinaCorrectGuessesOutOfTotal).toBe(0);
    });

    it("should handle mixed guessers correctly", () => {
      const breeds: Breed[] = [
        createBreed(1, {
          hasPortrait: true,
          guessedBy: "mr",
          isGuessable: true,
          isGuessedCorrectly: true,
        }),
        createBreed(2, {
          hasPortrait: true,
          guessedBy: "ka",
          isGuessable: true,
          isGuessedCorrectly: true,
        }),
        createBreed(3, {
          hasPortrait: true,
          guessedBy: "mr",
          isGuessable: true,
          isGuessedCorrectly: false,
        }),
      ];

      const result = getStatistics(breeds);

      expect(result.martinCorrectGuesses).toBe(1);
      expect(result.martinCorrectGuessesOutOfTotal).toBe(2);
      expect(result.katharinaCorrectGuesses).toBe(1);
      expect(result.katharinaCorrectGuessesOutOfTotal).toBe(1);
    });

    it("should handle 100% correct guesses", () => {
      const breeds: Breed[] = [
        createBreed(1, {
          hasPortrait: true,
          guessedBy: "mr",
          isGuessable: true,
          isGuessedCorrectly: true,
        }),
        createBreed(2, {
          hasPortrait: true,
          guessedBy: "ka",
          isGuessable: true,
          isGuessedCorrectly: true,
        }),
      ];

      const result = getStatistics(breeds);

      expect(result.martinCorrectGuessesPercentage).toBe("100.00");
      expect(result.katharinaCorrectGuessesPercentage).toBe("100.00");
    });

    it("should handle 0% correct guesses", () => {
      const breeds: Breed[] = [
        createBreed(1, {
          hasPortrait: true,
          guessedBy: "mr",
          isGuessable: true,
          isGuessedCorrectly: false,
        }),
        createBreed(2, {
          hasPortrait: true,
          guessedBy: "ka",
          isGuessable: true,
          isGuessedCorrectly: false,
        }),
      ];

      const result = getStatistics(breeds);

      expect(result.martinCorrectGuessesPercentage).toBe("0.00");
      expect(result.katharinaCorrectGuessesPercentage).toBe("0.00");
    });
  });
});
