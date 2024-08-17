import type { Breed, EnrichedBreed, FCI } from "../types/breed";
import type { Settings } from "../types/settings";

export const getBreedImagePath = ({
  id,
  standardNumber,
  variant = "default",
  artStyle,
  hasVariants,
  isVariantsCollapsed,
}: {
  id: Breed["id"];
  standardNumber: FCI["standardNumber"];
  variant?: string;
  artStyle?: "artsy" | "realistic";
  hasVariants: boolean;
  isVariantsCollapsed?: boolean;
}) => {
  let imageName = variant;

  if (isVariantsCollapsed && hasVariants && artStyle === "realistic") {
    imageName = "general";
  }

  if (standardNumber > 0) {
    return `illustrations/fci/${standardNumber}/illustration/${artStyle}/${imageName}.jpeg`;
  }

  return `illustrations/non-fci/${id}/illustration/${artStyle}/${imageName}.jpeg`;
};

/* takes the list of all breeds with their variants and makes it so
  that the variants, if existent, will be treated as its own breed */
export const flattenBreedVariants = ({ breeds }: { breeds: Breed[] }) => {
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

  return flattenedBreedVariants;
};

export const enrichBreedsWithIllustrations = ({
  breeds,
  artStyle,
  isVariantsCollapsed,
}: {
  breeds: Breed[];
  artStyle: Settings["artStyle"];
  isVariantsCollapsed?: boolean;
}) =>
  breeds.map(
    (breed) =>
      ({
        ...breed,
        image: getBreedImagePath({
          id: breed.id,
          standardNumber: breed.fci.standardNumber,
          variant: breed.variants ? breed.variants[0].id : "default",
          artStyle,
          hasVariants:
            breed.variants && breed.variants.length > 1 ? true : false,
          isVariantsCollapsed,
        }),
      }) as EnrichedBreed,
  );
