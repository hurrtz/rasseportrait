import type { Breed } from "../../../types/breed";
import { getBreedVariantNames } from "../utils";

describe("getBreedVariantNames", () => {
  const mockBreeds: Breed[] = [
    {
      id: 1,
      details: {
        internal: "breed-without-variants",
        public: ["Breed Without Variants"],
      },
      classification: {
        fci: {
          group: 1,
          section: 1,
          standardNumber: 101,
        },
      },
      podcast: [],
      furtherReading: [],
    },
    {
      id: 2,
      details: {
        internal: "breed-with-variants",
        public: ["Breed With Variants"],
        variants: [
          {
            internal: "variant-a",
            public: "Variant A",
          },
          {
            internal: "variant-b",
            public: "Variant B",
          },
        ],
      },
      classification: {
        fci: {
          group: 2,
          section: 1,
          standardNumber: 201,
        },
      },
      podcast: [],
      furtherReading: [],
    },
    {
      id: 3,
      details: {
        internal: "grouped-breed-1",
        public: ["Grouped Breed 1"],
        groupAs: "test-group",
        variants: [
          {
            internal: "grouped-variant-a",
            public: "Grouped Variant A",
          },
        ],
      },
      classification: {
        fci: {
          group: 3,
          section: 1,
          standardNumber: 301,
        },
      },
      podcast: [],
      furtherReading: [],
    },
    {
      id: 4,
      details: {
        internal: "grouped-breed-2",
        public: ["Grouped Breed 2"],
        groupAs: "test-group",
        variants: [
          {
            internal: "grouped-variant-b",
            public: "Grouped Variant B",
          },
        ],
      },
      classification: {
        fci: {
          group: 3,
          section: 1,
          standardNumber: 302,
        },
      },
      podcast: [],
      furtherReading: [],
    },
  ];

  describe("Breed not found", () => {
    it("should return empty array when breed id is not found", () => {
      const result = getBreedVariantNames(mockBreeds, 999);

      expect(result).toEqual([]);
    });

    it("should return empty array when breed list is empty", () => {
      const result = getBreedVariantNames([], 1);

      expect(result).toEqual([]);
    });
  });

  describe("Breed without variants", () => {
    it("should return single entry with empty variant for breed without variants", () => {
      const result = getBreedVariantNames(mockBreeds, 1);

      expect(result).toEqual([
        {
          id: 1,
          variant: "",
        },
      ]);
    });
  });

  describe("Breed with variants", () => {
    it("should return all variants for breed with variants", () => {
      const result = getBreedVariantNames(mockBreeds, 2);

      expect(result).toEqual([
        {
          id: 2,
          variant: "variant-a",
        },
        {
          id: 2,
          variant: "variant-b",
        },
      ]);
    });

    it("should use internal variant names", () => {
      const result = getBreedVariantNames(mockBreeds, 2);

      expect(result[0].variant).toBe("variant-a");
      expect(result[1].variant).toBe("variant-b");
    });
  });

  describe("Grouped breeds", () => {
    it("should return variants from all breeds in the group", () => {
      const result = getBreedVariantNames(mockBreeds, 3);

      expect(result).toEqual([
        {
          id: 3,
          variant: "grouped-variant-a",
        },
        {
          id: 4,
          variant: "grouped-variant-b",
        },
      ]);
    });

    it("should return same result when querying either breed in group", () => {
      const result1 = getBreedVariantNames(mockBreeds, 3);
      const result2 = getBreedVariantNames(mockBreeds, 4);

      expect(result1).toEqual(result2);
    });

    it("should handle group with multiple variants per breed", () => {
      const breedsWithMultipleVariants: Breed[] = [
        {
          id: 5,
          details: {
            internal: "multi-variant-1",
            public: ["Multi Variant 1"],
            groupAs: "multi-group",
            variants: [
              {
                internal: "variant-1a",
                public: "Variant 1A",
              },
              {
                internal: "variant-1b",
                public: "Variant 1B",
              },
            ],
          },
          classification: { fci: undefined },
          podcast: [],
          furtherReading: [],
        },
        {
          id: 6,
          details: {
            internal: "multi-variant-2",
            public: ["Multi Variant 2"],
            groupAs: "multi-group",
            variants: [
              {
                internal: "variant-2a",
                public: "Variant 2A",
              },
            ],
          },
          classification: { fci: undefined },
          podcast: [],
          furtherReading: [],
        },
      ];

      const result = getBreedVariantNames(breedsWithMultipleVariants, 5);

      expect(result).toEqual([
        { id: 5, variant: "variant-1a" },
        { id: 5, variant: "variant-1b" },
        { id: 6, variant: "variant-2a" },
      ]);
    });
  });

  describe("Edge cases", () => {
    it("should handle breed with empty variants array", () => {
      const breedsWithEmptyVariants: Breed[] = [
        {
          id: 7,
          details: {
            internal: "empty-variants",
            public: ["Empty Variants"],
            variants: [],
          },
          classification: { fci: undefined },
          podcast: [],
          furtherReading: [],
        },
      ];

      const result = getBreedVariantNames(breedsWithEmptyVariants, 7);

      // Empty variants array results in no variant entries
      expect(result).toEqual([]);
    });

    it("should handle grouped breed without variants", () => {
      const groupedWithoutVariants: Breed[] = [
        {
          id: 8,
          details: {
            internal: "grouped-no-variants-1",
            public: ["Grouped No Variants 1"],
            groupAs: "no-variants-group",
          },
          classification: { fci: undefined },
          podcast: [],
          furtherReading: [],
        },
        {
          id: 9,
          details: {
            internal: "grouped-no-variants-2",
            public: ["Grouped No Variants 2"],
            groupAs: "no-variants-group",
          },
          classification: { fci: undefined },
          podcast: [],
          furtherReading: [],
        },
      ];

      const result = getBreedVariantNames(groupedWithoutVariants, 8);

      expect(result).toEqual([
        { id: 8, variant: "" },
        { id: 9, variant: "" },
      ]);
    });

    it("should handle single breed in group", () => {
      const singleInGroup: Breed[] = [
        {
          id: 10,
          details: {
            internal: "single-in-group",
            public: ["Single In Group"],
            groupAs: "lonely-group",
            variants: [
              {
                internal: "lonely-variant",
                public: "Lonely Variant",
              },
            ],
          },
          classification: { fci: undefined },
          podcast: [],
          furtherReading: [],
        },
      ];

      const result = getBreedVariantNames(singleInGroup, 10);

      expect(result).toEqual([{ id: 10, variant: "lonely-variant" }]);
    });
  });
});
