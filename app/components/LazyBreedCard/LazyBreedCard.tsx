import React, { memo } from 'react';
import type { Breed } from '../../../types/breed';
import BreedCard from '../BreedCard/BreedCard';
import BreedCardSkeleton from '../BreedCardSkeleton';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { logger } from '~/utils/logger';

interface LazyBreedCardProps {
  id: Breed['id'];
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
 */
const LazyBreedCard = memo(({ id, name, onClick }: LazyBreedCardProps) => {
  // Use intersection observer with 100px margin for early loading
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0,
    rootMargin: '100px', // Start loading 100px before viewport
    freezeOnceVisible: true, // Keep card rendered once visible
  });

  // Log performance metrics in development
  if (process.env.NODE_ENV === 'development' && isVisible) {
    logger.info(`LazyBreedCard: Card ${id} (${name}) is now visible`);
  }

  return (
    <div ref={ref}>
      {isVisible ? (
        <BreedCard
          id={id}
          name={name}
          onClick={onClick}
        />
      ) : (
        <BreedCardSkeleton />
      )}
    </div>
  );
});

LazyBreedCard.displayName = 'LazyBreedCard';

export default LazyBreedCard;