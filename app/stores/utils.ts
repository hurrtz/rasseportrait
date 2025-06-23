import type { Breed } from "../../types/breed";

export const getBreedVariantNames = (breeds: Breed[], id: Breed["id"]) => {
  const breed = breeds.find((breed) => breed.id === id);

  if (!breed) {
    return [];
  }

  const hasGroup = Boolean(breed.details.groupAs);
  const targetBreeds = hasGroup
    ? breeds.filter((b) => b.details.groupAs === breed.details.groupAs)
    : [breed];

  return targetBreeds.flatMap(({ id, details }) => {
    if (details.variants) {
      return details.variants.map(({ internal }) => ({
        id,
        variant: internal,
      }));
    }
    return [{ id, variant: "" }];
  });
};
