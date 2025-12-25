import { useMemo } from "react";
import { useBreed, useBreedVariantNames } from "~/stores/breeds";

interface UseImagePathsProps {
  id: string | number;
  isDetailView: boolean;
}

export const useImagePaths = ({
  id,
  isDetailView,
}: UseImagePathsProps) => {
  const breed = useBreed(id);
  const variantNames = useBreedVariantNames(id);

  // Safety check if breed is not found
  if (!breed) {
    console.warn(`Breed not found for ID: ${id}`);
    return {
      images: [],
      isGrouped: false,
      isDetailView,
    };
  }

  const { details } = breed;
  const isGrouped = details.isGrouped;

  const PATH = "illustrations";
  const CATEGORY = "breeds";
  const ASSET_TYPE = "illustration";
  const EXTENSION = "jpeg";
  const THUMBNAIL = isDetailView ? "" : "_thumbnail";

  const images = useMemo(() => {
    if (isGrouped) {
      return details.variants!.map(
        (variant) =>
          `${PATH}/${CATEGORY}/${variant.fci!.standardNumber}/${ASSET_TYPE}_${variant.internal}${THUMBNAIL}.${EXTENSION}`,
      );
    }

    return (
      variantNames?.map(
        ({ id, variant }) =>
          `${PATH}/${CATEGORY}/${id}/${ASSET_TYPE}${variant ? `_${variant}` : ""}${THUMBNAIL}.${EXTENSION}`,
      ) ?? []
    );
  }, [variantNames, isGrouped, details, ASSET_TYPE, THUMBNAIL, EXTENSION]);

  return {
    images,
    isGrouped,
    isDetailView,
  };
};
