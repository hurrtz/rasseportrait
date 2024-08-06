import type { Breed, FCI } from "../types/breed";

export const getBreedImagePath = ({
  group,
  section,
  standardNumber,
  variant = "default",
}: FCI & { variant?: string }) =>
  `illustrations/fci/${group}/${section}/${standardNumber}/${variant}.jpeg`;

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
