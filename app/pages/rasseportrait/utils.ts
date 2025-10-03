import type { Breed, Variant } from "types/breed";
import { AMOUNT_OF_BREEDS_TOTAL } from "./constants";

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
        public: [group[0].details.groupAs!],
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

type SortOrder = "asc" | "desc";

/**
 * Sorts breeds by air date of podcast
 * @param breeds - An array of breeds
 * @param sortOrder - The direction to sort the breeds in ('asc' or 'desc')
 * @returns An array of sorted breeds
 */
const sortBreedsByAirDate = ({
  breeds,
  sortOrder,
}: {
  breeds: Breed[];
  sortOrder: SortOrder;
}): Breed[] =>
  breeds.sort((a, b) => {
    const aAirDate = a.podcast.find(
      ({ meta: { internal } }) => internal === "portrait",
    )?.meta.airDate;

    const bAirDate = b.podcast.find(
      ({ meta: { internal } }) => internal === "portrait",
    )?.meta.airDate;

    const aDate = new Date(aAirDate ?? "").getTime();
    const bDate = new Date(bAirDate ?? "").getTime();

    if (sortOrder === "asc") {
      return aDate - bDate;
    }

    return bDate - aDate;
  });

/**
 * Sorts breeds by name (internal identifier)
 * @param breeds - An array of breeds
 * @param sortOrder - The direction to sort the breeds in ('asc' or 'desc')
 * @returns An array of sorted breeds
 */
const sortBreedsByName = ({
  breeds,
  sortOrder,
}: {
  breeds: Breed[];
  sortOrder: SortOrder;
}): Breed[] =>
  breeds.sort((a, b) => {
    const aName = a.details.internal;
    const bName = b.details.internal;

    if (aName === bName) {
      return 0;
    }

    if (sortOrder === "asc") {
      return aName.localeCompare(bName);
    }

    return bName.localeCompare(aName);
  });

/**
 * Sorts breeds by FCI standard number
 * Breeds without FCI numbers are moved to the bottom of the list
 * @param breeds - An array of breeds
 * @param sortOrder - The direction to sort the breeds in ('asc' or 'desc')
 * @returns An array of sorted breeds
 */
const sortBreedsByFCI = ({
  breeds,
  sortOrder,
}: {
  breeds: Breed[];
  sortOrder: SortOrder;
}): Breed[] =>
  breeds.sort((a, b) => {
    const aFCI =
      a.classification.fci?.standardNumber ??
      a.details.variants?.[0]?.fci?.standardNumber;
    const bFCI =
      b.classification.fci?.standardNumber ??
      b.details.variants?.[0]?.fci?.standardNumber;

    // anything that is not standard FCI gets moved to the bottom of the list
    if (aFCI === undefined || bFCI === undefined) {
      if (bFCI !== undefined) {
        return 1;
      }

      if (aFCI !== undefined) {
        return -1;
      }

      return 0;
    }

    if (sortOrder === "asc") {
      return aFCI - bFCI;
    }

    return bFCI - aFCI;
  });

type SortBy = "airDate" | "name" | "fci";

/**
 * Sorts breeds by the specified field and order
 * @param breeds - An array of breeds to sort
 * @param sortBy - The field to sort by ('airDate', 'name', or 'fci')
 * @param sortOrder - The direction to sort in ('asc' or 'desc')
 * @returns An array of sorted breeds
 */
export const sortBreeds = ({
  breeds,
  sortBy,
  sortOrder,
}: {
  breeds: Breed[];
  sortBy: SortBy;
  sortOrder: SortOrder;
}) => {
  switch (sortBy) {
    case "name":
      return sortBreedsByName({ breeds, sortOrder });

    case "fci":
      return sortBreedsByFCI({ breeds, sortOrder });

    case "airDate":
    default:
      return sortBreedsByAirDate({ breeds, sortOrder });
  }
};

/**
 * Calculates statistics about breed presentation in the podcast
 * @param breeds - An array of breeds to analyze
 * @returns An object containing various breed statistics including:
 *   - Number and percentage of breeds presented
 *   - Breeds outside FCI classification
 *   - Breeds not yet presented
 *   - Martin and Katharina's correct guesses and percentages
 */
export const getStatistics = (breeds: Breed[]) => {
  /**
   * Calculates percentage of amount relative to total
   * @param amount - The numerator value
   * @param total - The denominator value
   * @returns Percentage as a decimal number
   */
  const getPercentage = (amount: number, total: number) =>
    (amount / total) * 100;

  const breedsPresented = breeds.filter((breed) =>
    breed.podcast.some((podcast) => podcast.meta.internal === "portrait"),
  );
  const amountBreedsPresented = breedsPresented.length;
  const percentageBreedsPresented = getPercentage(
    amountBreedsPresented,
    AMOUNT_OF_BREEDS_TOTAL,
  ).toFixed(2);
  const breedsOutsideFCI = breeds.filter(
    (breed) => breed.classification.fci === undefined,
  );
  const breedsNotPresented = breeds.filter(
    (breed) =>
      !breed.podcast.some((podcast) => podcast.meta.internal === "portrait"),
  );
  const martinCorrectGuessesOutOfTotal = breedsPresented.filter((breed) =>
    breed.podcast.find(
      (podcast) =>
        podcast.meta.internal === "portrait" &&
        podcast.meta.guessedBy === "mr" &&
        podcast.meta.isGuessable,
    ),
  ).length;
  const martinCorrectGuesses = breedsPresented.filter((breed) =>
    breed.podcast.find(
      (podcast) =>
        podcast.meta.internal === "portrait" &&
        podcast.meta.guessedBy === "mr" &&
        podcast.meta.isGuessable &&
        podcast.meta.isGuessedCorrectly,
    ),
  ).length;
  const martinCorrectGuessesPercentage = getPercentage(
    martinCorrectGuesses,
    martinCorrectGuessesOutOfTotal,
  ).toFixed(2);
  const katharinaCorrectGuessesOutOfTotal = breedsPresented.filter((breed) =>
    breed.podcast.find(
      (podcast) =>
        podcast.meta.internal === "portrait" &&
        podcast.meta.guessedBy === "ka" &&
        podcast.meta.isGuessable,
    ),
  ).length;
  const katharinaCorrectGuesses = breedsPresented.filter((breed) =>
    breed.podcast.find(
      (podcast) =>
        podcast.meta.internal === "portrait" &&
        podcast.meta.guessedBy === "ka" &&
        podcast.meta.isGuessable &&
        podcast.meta.isGuessedCorrectly,
    ),
  ).length;
  const katharinaCorrectGuessesPercentage = getPercentage(
    katharinaCorrectGuesses,
    katharinaCorrectGuessesOutOfTotal,
  ).toFixed(2);

  return {
    amountBreedsPresented,
    percentageBreedsPresented,
    breedsOutsideFCI,
    breedsNotPresented,
    martinCorrectGuesses,
    martinCorrectGuessesOutOfTotal,
    martinCorrectGuessesPercentage,
    katharinaCorrectGuesses,
    katharinaCorrectGuessesOutOfTotal,
    katharinaCorrectGuessesPercentage,
  };
};
