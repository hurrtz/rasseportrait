import type { Breed } from "../../types/breed";

/**
 * Retrieves all variant names for a given breed, including grouped breeds
 *
 * For grouped breeds (e.g., Corgi), this returns variants from all breeds in the group.
 * For single breeds, it returns their variants if they have any, or a single entry if not.
 *
 * @param breeds - The complete array of breeds to search through
 * @param id - The unique identifier of the breed
 * @returns An array of objects containing breed id and variant internal name.
 *          Returns empty array if breed is not found.
 * @example
 * // For a grouped breed like Corgi
 * getBreedVariantNames(breeds, 'corgi-38')
 * // Returns: [{ id: 'corgi-38', variant: 'cardigan' }, { id: 'corgi-39', variant: 'pembroke' }]
 *
 * @example
 * // For a single breed without variants
 * getBreedVariantNames(breeds, 'golden-retriever')
 * // Returns: [{ id: 'golden-retriever', variant: '' }]
 */
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
