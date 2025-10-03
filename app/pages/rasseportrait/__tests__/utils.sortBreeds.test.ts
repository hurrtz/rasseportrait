import { sortBreeds } from "../utils";
import {
  mockBreed1,
  mockBreed2,
  mockBreed3,
  mockBreedWithoutFCI,
} from "./fixtures";

describe("sortBreeds", () => {
  const testBreeds = [mockBreed1, mockBreed2, mockBreed3, mockBreedWithoutFCI];

  describe("sorting by name", () => {
    it("should sort breeds by name in ascending order", () => {
      const result = sortBreeds({
        breeds: [...testBreeds],
        sortBy: "name",
        sortOrder: "asc",
      });

      expect(result[0].details.internal).toBe("australian_shepherd");
      expect(result[1].details.internal).toBe("beagle");
      expect(result[2].details.internal).toBe("designer_dog");
      expect(result[3].details.internal).toBe("golden_retriever");
    });

    it("should sort breeds by name in descending order", () => {
      const result = sortBreeds({
        breeds: [...testBreeds],
        sortBy: "name",
        sortOrder: "desc",
      });

      expect(result[0].details.internal).toBe("golden_retriever");
      expect(result[1].details.internal).toBe("designer_dog");
      expect(result[2].details.internal).toBe("beagle");
      expect(result[3].details.internal).toBe("australian_shepherd");
    });

    it("should handle breeds with same name", () => {
      const duplicateBreed = { ...mockBreed1, id: 999 };
      const breedsWithDuplicate = [...testBreeds, duplicateBreed];

      const result = sortBreeds({
        breeds: breedsWithDuplicate,
        sortBy: "name",
        sortOrder: "asc",
      });

      // Both golden retrievers should be present
      const goldenRetrievers = result.filter(
        (b) => b.details.internal === "golden_retriever",
      );
      expect(goldenRetrievers).toHaveLength(2);
    });
  });

  describe("sorting by FCI number", () => {
    it("should sort breeds by FCI number in ascending order", () => {
      const result = sortBreeds({
        breeds: [...testBreeds],
        sortBy: "fci",
        sortOrder: "asc",
      });

      expect(result[0].classification.fci?.standardNumber).toBe(111);
      expect(result[1].classification.fci?.standardNumber).toBe(161);
      expect(result[2].classification.fci?.standardNumber).toBe(342);
      expect(result[3].classification.fci).toBeUndefined();
    });

    it("should sort breeds by FCI number in descending order", () => {
      const result = sortBreeds({
        breeds: [...testBreeds],
        sortBy: "fci",
        sortOrder: "desc",
      });

      expect(result[0].classification.fci?.standardNumber).toBe(342);
      expect(result[1].classification.fci?.standardNumber).toBe(161);
      expect(result[2].classification.fci?.standardNumber).toBe(111);
      expect(result[3].classification.fci).toBeUndefined();
    });

    it("should place breeds without FCI at the end", () => {
      const result = sortBreeds({
        breeds: [...testBreeds],
        sortBy: "fci",
        sortOrder: "asc",
      });

      const lastBreed = result[result.length - 1];
      expect(lastBreed.classification.fci).toBeUndefined();
      expect(lastBreed.id).toBe(4); // mockBreedWithoutFCI
    });

    it("should handle multiple breeds without FCI", () => {
      const anotherWithoutFCI = {
        ...mockBreedWithoutFCI,
        id: 5,
        details: {
          ...mockBreedWithoutFCI.details,
          internal: "another_designer",
        },
      };

      const result = sortBreeds({
        breeds: [mockBreed1, mockBreedWithoutFCI, anotherWithoutFCI],
        sortBy: "fci",
        sortOrder: "asc",
      });

      // Breed with FCI should be first
      expect(result[0].classification.fci?.standardNumber).toBe(111);
      // Both without FCI should be at the end (order between them is preserved)
      expect(result[1].classification.fci).toBeUndefined();
      expect(result[2].classification.fci).toBeUndefined();
    });

    it("should use variant FCI when main FCI is undefined", () => {
      const breedWithVariantFCI = {
        ...mockBreed1,
        id: 6,
        classification: { fci: undefined },
        details: {
          ...mockBreed1.details,
          internal: "breed_with_variant_fci",
          variants: [
            {
              internal: "variant",
              public: "Variant",
              fci: {
                group: 5,
                section: 1,
                standardNumber: 250,
              },
            },
          ],
        },
      };

      const result = sortBreeds({
        breeds: [mockBreed1, breedWithVariantFCI, mockBreed3],
        sortBy: "fci",
        sortOrder: "asc",
      });

      // Should be sorted by FCI including variant FCI
      expect(result[0].classification.fci?.standardNumber).toBe(111);
      expect(result[1].details.variants?.[0]?.fci?.standardNumber).toBe(250);
      expect(result[2].classification.fci?.standardNumber).toBe(342);
    });

    it("should handle breed with FCI compared to breed without any FCI", () => {
      const result = sortBreeds({
        breeds: [mockBreedWithoutFCI, mockBreed1],
        sortBy: "fci",
        sortOrder: "asc",
      });

      // Breed with FCI should come first
      expect(result[0].classification.fci?.standardNumber).toBe(111);
      // Breed without FCI should be last
      expect(result[1].classification.fci).toBeUndefined();
    });
  });

  describe("sorting by air date", () => {
    it("should sort breeds by air date in ascending order (oldest first)", () => {
      const result = sortBreeds({
        breeds: [...testBreeds],
        sortBy: "airDate",
        sortOrder: "asc",
      });

      expect(result[0].podcast[0].meta.airDate).toBe("2021-12-10"); // beagle
      expect(result[1].podcast[0].meta.airDate).toBe("2022-01-15"); // golden
      expect(result[2].podcast[0].meta.airDate).toBe("2022-03-20"); // designer
      expect(result[3].podcast[0].meta.airDate).toBe("2023-06-01"); // australian
    });

    it("should sort breeds by air date in descending order (newest first)", () => {
      const result = sortBreeds({
        breeds: [...testBreeds],
        sortBy: "airDate",
        sortOrder: "desc",
      });

      expect(result[0].podcast[0].meta.airDate).toBe("2023-06-01"); // australian
      expect(result[1].podcast[0].meta.airDate).toBe("2022-03-20"); // designer
      expect(result[2].podcast[0].meta.airDate).toBe("2022-01-15"); // golden
      expect(result[3].podcast[0].meta.airDate).toBe("2021-12-10"); // beagle
    });
  });

  describe("edge cases", () => {
    it("should handle empty array", () => {
      const result = sortBreeds({
        breeds: [],
        sortBy: "name",
        sortOrder: "asc",
      });

      expect(result).toEqual([]);
    });

    it("should handle single breed", () => {
      const result = sortBreeds({
        breeds: [mockBreed1],
        sortBy: "name",
        sortOrder: "asc",
      });

      expect(result).toHaveLength(1);
      expect(result[0]).toBe(mockBreed1);
    });

    it("should handle array sort mutation correctly", () => {
      const original = [...testBreeds];
      const originalIds = original.map((b) => b.id);

      const result = sortBreeds({
        breeds: original,
        sortBy: "name",
        sortOrder: "asc",
      });

      // Result should be sorted
      expect(result[0].details.internal).toBe("australian_shepherd");
      // Original array gets sorted in place by Array.prototype.sort
      // This is expected behavior since we use .sort() directly
      expect(result).toBe(original);
    });
  });
});
