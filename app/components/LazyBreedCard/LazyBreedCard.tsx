import React, { memo } from "react";
import type { Breed } from "types/breed";
import { PortraitCard } from "../PortraitCard";
import BreedCardSkeleton from "../BreedCardSkeleton";
import { useLazyBreedCard } from "../../hooks/useBreedVisibility";

interface Props {
  breed: Breed;
}

/**
 * Renders a skeleton until the card comes near the viewport, then the
 * PortraitCard. Cards stay rendered once seen, even when a search hides and
 * shows them again.
 */
const LazyBreedCard = ({ breed }: Props) => {
  const { ref, shouldRenderCard } = useLazyBreedCard(breed.id);

  return (
    <div ref={ref}>
      {shouldRenderCard ? (
        <PortraitCard breed={breed} />
      ) : (
        <BreedCardSkeleton />
      )}
    </div>
  );
};

export default memo(LazyBreedCard);
