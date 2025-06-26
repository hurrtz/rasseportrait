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

type SortDirection = "asc" | "desc";

/*
  Sorts breeds by air date of podcast
  @param breeds - An array of breeds
  @param sortDirection - The direction to sort the breeds in
  @returns An array of sorted breeds
*/
const sortBreedsByAirDate = ({
  breeds,
  sortDirection = "asc",
}: {
  breeds: Breed[];
  sortDirection?: SortDirection;
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

    if (sortDirection === "asc") {
      return aDate - bDate;
    }

    return bDate - aDate;
  });

/*
  Sorts breeds by name
  @param breeds - An array of breeds
  @param sortDirection - The direction to sort the breeds in
  @returns An array of sorted breeds
*/
const sortBreedsByName = ({
  breeds,
  sortDirection = "asc",
}: {
  breeds: Breed[];
  sortDirection?: SortDirection;
}): Breed[] =>
  breeds.sort((a, b) => {
    const aName = a.details.internal;
    const bName = b.details.internal;

    if (aName === bName) {
      return 0;
    }

    if (sortDirection === "asc") {
      return aName.localeCompare(bName);
    }

    return bName.localeCompare(aName);
  });

/*
  Sorts breeds by FCI number
  @param breeds - An array of breeds
  @param sortDirection - The direction to sort the breeds in
  @returns An array of sorted breeds
*/
const sortBreedsByFCI = ({
  breeds,
  sortDirection = "asc",
}: {
  breeds: Breed[];
  sortDirection?: SortDirection;
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

    if (sortDirection === "asc") {
      return aFCI - bFCI;
    }

    return bFCI - aFCI;
  });

type SortBy = "airDate" | "name" | "fci";

export const sortBreeds = ({
  breeds,
  sortBy,
  sortDirection = "asc",
}: {
  breeds: Breed[];
  sortBy: SortBy;
  sortDirection?: SortDirection;
}) => {
  switch (sortBy) {
    case "name":
      return sortBreedsByName({ breeds, sortDirection });
    case "fci":
      return sortBreedsByFCI({ breeds, sortDirection });
    default:
    case "airDate":
      return sortBreedsByAirDate({ breeds, sortDirection });
  }
};
