import type { Breed, EnrichedBreed } from "../types/breed";
import type { Topic, EnrichedTopic } from "../types/topic";

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
          fci: variant.fci || breed.fci,
          podcast: breed.podcast,
          furtherReading: breed.furtherReading,
          wasGuessedCorrectlyInPodcast: breed.wasGuessedCorrectlyInPodcast,
        });
      });
    }
  });

  return flattenedBreedVariants;
};

export const enrichWithIllustrations = ({
  elements,
  type,
}: {
  elements: Breed[] | Topic[];
  type: "breeds" | "topics";
}) =>
  elements.map((element) => {
    let out: EnrichedBreed | EnrichedTopic = {
      ...element,
      image: `illustrations/${type}/${element.id}/illustration.jpeg`,
      podcast: element.podcast.map((podcast) => ({
        ...podcast,
        airDate: new Date(podcast.airDate),
      })),
    };

    if (type === "breeds") {
      const variants = (element as Breed).variants;
      out.image = `illustrations/${type}/${element.id}/illustration${variants ? `_${variants[0].id}` : ""}.jpeg`;
    }

    return out;
  });

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
