import type { Breed, EnrichedBreed, FCI } from "../types/breed";
import type { Settings } from "../types/settings";

export const getBreedImagePath = ({
  standardNumber,
  variant = "default",
  breedName,
  artStyle,
}: {
  standardNumber: FCI["standardNumber"];
  variant?: string;
  breedName?: string;
  artStyle?: "artsy" | "realistic";
}) =>
  standardNumber > 0
    ? `illustrations/fci/${standardNumber}/illustration/${artStyle}/${variant}.jpeg`
    : `illustrations/${breedName}/illustration/${artStyle}/${variant}.jpeg`;

/* takes the list of all breeds with their variants and makes it so
  that the variants, if existent, will be treated as its own breed */
export const flattenAndEnrichBreedVariants = ({
  breeds,
  artStyle,
}: {
  breeds: Breed[];
  artStyle: Settings["artStyle"];
}) => {
  // get all breeds with no variants or only one variant entry
  const flattenedBreedVariants = breeds.filter(({ variants }) => !variants);

  breeds.forEach((breed) => {
    if (breed.variants && breed.variants.length > 1) {
      breed.variants.forEach((variant) => {
        flattenedBreedVariants.push({
          id: breed.id,
          names: breed.names,
          variants: [variant],
          fci: breed.fci,
          podcast: breed.podcast,
          furtherReading: breed.furtherReading,
        });
      });
    }
  });

  // enrich the breeds with the image path
  return flattenedBreedVariants.map(
    (breed) =>
      ({
        ...breed,
        image: getBreedImagePath({
          standardNumber: breed.fci.standardNumber,
          variant: breed.variants ? breed.variants[0].names[0] : "default",
          breedName: breed.names[0],
          artStyle,
        }),
      }) as EnrichedBreed,
  );
};

export const getImageFromBreed = (breed: EnrichedBreed) => {
  if (breed.variants) {
    return breed.variants[0].image;
  }

  // if there's no variant then there's always an image
  return breed.image!;
};
