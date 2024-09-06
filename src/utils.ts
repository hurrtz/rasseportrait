import type { Breed, EnrichedBreed, FCI } from "../types/breed";
import type { Settings } from "../types/settings";

export const getBreedImagePath = ({
  id,
  variant = "default",
  artStyle,
}: {
  id: Breed["id"];
  variant?: string;
  artStyle?: "artsy" | "realistic";
}) => `illustrations/${id}/illustration/${artStyle}/${variant}.jpeg`;

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
}: {
  breeds: Breed[];
  artStyle: Settings["artStyle"];
}) =>
  breeds.map(
    (breed) =>
      ({
        ...breed,
        image: getBreedImagePath({
          id: breed.id,
          variant: breed.variants ? breed.variants[0].id : "default",
          artStyle,
        }),
      }) as EnrichedBreed,
  );

export const getWindowLocationSearch = (
  payload: {
    name: string;
    value?: string;
  }[],
) => {
  const search = new URLSearchParams(window.location.search);

  payload.forEach(({ name, value }) => {
    if (value) {
      search.set(name, value);
    }

    if (!value) {
      search.delete(name);
    }
  });

  return search.toString();
};
