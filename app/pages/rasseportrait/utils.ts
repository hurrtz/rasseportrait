import type { Breed, Variant } from "types/breed";

/**
 * Groups groupable breeds (e.g. Corgi) into an array of arrays of breeds, each representing a group of breeds
 * @param breeds - An array of breeds
 * @returns An array of arrays of breeds, each representing a group of breeds
 */
const getGroupedBreeds = (breeds: Breed[]): Breed[][] => {
  const groups = new Set(
    breeds
      .filter((breed) => breed.details.groupAs)
      .map((breed) => breed.details.groupAs),
  );

  const groupedBreeds: Breed[][] = [];

  groups.forEach((group) => {
    const matchingBreeds = breeds.filter(
      (breed) => breed.details.groupAs === group,
    );

    groupedBreeds.push(matchingBreeds);
  });

  return groupedBreeds;
};

/**
 * Merges groupable breeds (e.g. Corgi) into a single breed with variants
 * @param groupedBreeds - An array of arrays of breeds, each representing a group of breeds
 * @returns An array of merged breeds
 */
export const mergeGroupedBreeds = (breeds: Breed[]): Breed[] => {
  const mergedBreeds: Breed[] = [];

  const groupedBreeds = getGroupedBreeds(breeds);

  groupedBreeds.forEach((group) => {
    let mergedBreed: Breed = {
      id: "grouped",
      details: {
        internal: group[0].details.groupAs!,
        isGrouped: true,
        public: [""],
        variants: [],
      },
      classification: {
        fci: undefined,
      },
      podcast: group[0].podcast,
      furtherReading: [],
    };

    group.forEach((breed) => {
      mergedBreed.id = `${mergedBreed.id}_${breed.id}`;

      let variants: Variant[] = breed.details.variants ?? [
        {
          internal: breed.details.internal,
          public: breed.details.public[0],
          furtherReading: breed.furtherReading,
          fci: breed.classification.fci,
        },
      ];

      variants = variants.map((variant) => ({
        ...variant,
        fci: breed.classification.fci,
      }));

      mergedBreed.details.variants!.push(...variants);
    });

    mergedBreeds.push(mergedBreed);
  });

  return mergedBreeds;
};
