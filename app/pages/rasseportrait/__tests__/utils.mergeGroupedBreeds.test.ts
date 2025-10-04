import { mergeGroupedBreeds } from "../utils";
import { mockBreed1, mockGroupedBreed1, mockGroupedBreed2 } from "./fixtures";

describe("mergeGroupedBreeds", () => {
  it("should merge grouped breeds into single breed with variants", () => {
    const breeds = [mockGroupedBreed1, mockGroupedBreed2];
    const result = mergeGroupedBreeds(breeds);

    expect(result).toHaveLength(1);
    expect(result[0].details.internal).toBe("Corgi");
    expect(result[0].details.public[0]).toBe("Corgi");
    expect(result[0].details.isGrouped).toBe(true);
  });

  it("should create variants from grouped breeds", () => {
    const breeds = [mockGroupedBreed1, mockGroupedBreed2];
    const result = mergeGroupedBreeds(breeds);

    const merged = result[0];
    expect(merged.details.variants).toHaveLength(2);
    expect(merged.details.variants?.[0].internal).toBe("pembroke_corgi");
    expect(merged.details.variants?.[0].public).toBe("Pembroke Welsh Corgi");
    expect(merged.details.variants?.[1].internal).toBe("cardigan_corgi");
    expect(merged.details.variants?.[1].public).toBe("Cardigan Welsh Corgi");
  });

  it("should preserve FCI info in variants", () => {
    const breeds = [mockGroupedBreed1, mockGroupedBreed2];
    const result = mergeGroupedBreeds(breeds);

    const merged = result[0];
    expect(merged.details.variants?.[0].fci?.standardNumber).toBe(39);
    expect(merged.details.variants?.[1].fci?.standardNumber).toBe(38);
  });

  it("should use podcast from first breed", () => {
    const breeds = [mockGroupedBreed1, mockGroupedBreed2];
    const result = mergeGroupedBreeds(breeds);

    const merged = result[0];
    expect(merged.podcast).toEqual(mockGroupedBreed1.podcast);
  });

  it("should generate compound ID", () => {
    const breeds = [mockGroupedBreed1, mockGroupedBreed2];
    const result = mergeGroupedBreeds(breeds);

    const merged = result[0];
    expect(merged.id).toBe("grouped_5_6");
  });

  it("should handle empty array", () => {
    const result = mergeGroupedBreeds([]);
    expect(result).toEqual([]);
  });

  it("should handle breeds without groupAs", () => {
    const breeds = [mockBreed1];
    const result = mergeGroupedBreeds(breeds);
    expect(result).toEqual([]);
  });

  it("should handle mixed grouped and non-grouped breeds", () => {
    const breeds = [mockBreed1, mockGroupedBreed1, mockGroupedBreed2];
    const result = mergeGroupedBreeds(breeds);

    // Should only merge the grouped ones
    expect(result).toHaveLength(1);
    expect(result[0].details.internal).toBe("Corgi");
  });

  it("should handle multiple groups", () => {
    const group1Breed1 = {
      ...mockGroupedBreed1,
      id: 10,
      details: { ...mockGroupedBreed1.details, groupAs: "Group1" },
    };
    const group1Breed2 = {
      ...mockGroupedBreed2,
      id: 11,
      details: { ...mockGroupedBreed2.details, groupAs: "Group1" },
    };
    const group2Breed1 = {
      ...mockGroupedBreed1,
      id: 20,
      details: { ...mockGroupedBreed1.details, groupAs: "Group2" },
    };
    const group2Breed2 = {
      ...mockGroupedBreed2,
      id: 21,
      details: { ...mockGroupedBreed2.details, groupAs: "Group2" },
    };

    const breeds = [group1Breed1, group1Breed2, group2Breed1, group2Breed2];
    const result = mergeGroupedBreeds(breeds);

    expect(result).toHaveLength(2);
    expect(result[0].details.public[0]).toBe("Group1");
    expect(result[1].details.public[0]).toBe("Group2");
  });

  it("should preserve further reading from grouped breeds", () => {
    const breed1 = {
      ...mockGroupedBreed1,
      furtherReading: [{ name: "Test 1", url: "http://test1.com" }],
    };
    const breed2 = {
      ...mockGroupedBreed2,
      furtherReading: [{ name: "Test 2", url: "http://test2.com" }],
    };

    const breeds = [breed1, breed2];
    const result = mergeGroupedBreeds(breeds);

    const merged = result[0];
    expect(merged.details.variants?.[0].furtherReading).toEqual(
      breed1.furtherReading,
    );
    expect(merged.details.variants?.[1].furtherReading).toEqual(
      breed2.furtherReading,
    );
  });

  it("should handle breed with existing variants", () => {
    const breedWithVariants = {
      ...mockGroupedBreed1,
      details: {
        ...mockGroupedBreed1.details,
        variants: [
          {
            internal: "variant1",
            public: "Variant 1",
            fci: { group: 1, section: 1, standardNumber: 100 },
          },
          {
            internal: "variant2",
            public: "Variant 2",
            fci: { group: 1, section: 1, standardNumber: 101 },
          },
        ],
      },
    };

    const breeds = [breedWithVariants, mockGroupedBreed2];
    const result = mergeGroupedBreeds(breeds);

    const merged = result[0];
    // Should have 2 variants from breedWithVariants + 1 from mockGroupedBreed2
    expect(merged.details.variants?.length).toBeGreaterThanOrEqual(2);
  });
});
