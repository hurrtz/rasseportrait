import React, { memo } from 'react';
import type { Breed } from '../../../types/breed';
import BreedCard from '../BreedCard/BreedCard';
import BreedCardSkeleton from '../BreedCardSkeleton';
import { useLazyBreedCard } from '../../hooks/useBreedVisibility';
import { logger } from '~/utils/logger';

interface LazyBreedCardProps {
  id: Breed["id"];
  name: string;
  onClick: () => void;
}

/**
 * Lazy-loading wrapper for BreedCard component
 * Renders skeleton placeholder until card is near viewport,
 * then renders actual BreedCard with images.
 *
 * Uses IntersectionObserver to detect visibility with 100px margin
 * to start loading before card enters viewport for smoother UX.
 * 
 * Maintains global visibility state so cards remain loaded even
 * after search filtering/clearing operations.
 */
const LazyBreedCard = memo(({ id, name, onClick }: LazyBreedCardProps) => {
  // Use global visibility tracking with intersection observer
  const { ref, shouldRenderCard } = useLazyBreedCard(id);

  // Log performance metrics in development
  if (process.env.NODE_ENV === "development" && shouldRenderCard) {
    logger.info(`LazyBreedCard: Card ${id} (${name}) is now visible`);
  }

  return (
    <div ref={ref}>
      {shouldRenderCard ? (
        <BreedCard id={id} name={name} onClick={onClick} />
      ) : (
        <BreedCardSkeleton />
      )}
    </div>
  );
});

LazyBreedCard.displayName = "LazyBreedCard";

export default LazyBreedCard;
