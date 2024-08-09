import type { Breed, FCI } from "../types/breed";

export const getBreedImagePath = ({
  group,
  section,
  standardNumber,
  variant = "default",
  breedName,
}: FCI & { variant?: string; breedName?: string }) =>
  standardNumber >= 0
    ? `illustrations/fci/${group}/${section}/${standardNumber}/${variant}.jpeg`
    : `illustrations/${breedName}/${variant}.jpeg`;

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
          id: breed.id,
          names: breed.names,
          variants: [variant],
          fci: breed.fci,
          image: breed.image,
          podcast: breed.podcast,
          furtherReading: breed.furtherReading,
        });
      });
    }
  });

  return flattenedBreedVariants;
};

export const getImageFromBreed = (breed: Breed) => {
  if (breed.variants) {
    return breed.variants[0].image;
  }

  // if there's no variant then there's always an image
  return breed.image!;
};
