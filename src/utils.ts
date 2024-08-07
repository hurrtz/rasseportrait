import type { Breed, FCI } from "../types/breed";

const FALLBACK_IMAGES_COUNT = 20;

export const getBreedImagePath = ({
  group,
  section,
  standardNumber,
  variant = "default",
  breedName,
}: FCI & { variant?: string; breedName?: string }) => [
  standardNumber >= 0
    ? `illustrations/fci/${group}/${section}/${standardNumber}/${variant}.jpeg`
    : `illustrations/${breedName}/${variant}.jpeg`,
  `illustrations/fallbackImages/${Math.floor(Math.random() * FALLBACK_IMAGES_COUNT) + 1}.jpeg`,
];

/* takes the list of all breeds with their variants and makes it so
  that the variants, if existent, will be treated as its own breed */
export const flattenBreedVariants = (breeds: Breed[]) => {
  // get all breeds with no variants or only one variant entry
  const flattenedBreedVariants = breeds.filter(
    ({ variants }) => !variants || (variants && variants.length <= 1),
  );

  breeds.forEach((breed) => {
    if (breed.variants && breed.variants.length > 1) {
      breed.variants.forEach((variant) => {
        flattenedBreedVariants.push({
          names: breed.names,
          variants: [variant],
          fci: breed.fci,
          podcast: breed.podcast,
          furtherReading: breed.furtherReading,
        });
      });
    }
  });

  return flattenedBreedVariants;
};
