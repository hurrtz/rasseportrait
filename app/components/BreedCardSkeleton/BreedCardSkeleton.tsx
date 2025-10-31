import React from "react";
import { Card, Skeleton, Group } from "@mantine/core";
import "./styles.css";

/**
 * Skeleton placeholder for BreedCard component
 * Matches the exact dimensions and styling of actual BreedCard
 * to prevent layout shifts during lazy loading
 */
const BreedCardSkeleton = () => {
  const { Section } = Card;

  return (
    <Card shadow="xl" padding="xl" radius="md" className="breed-card-skeleton">
      <Section className="card-section-skeleton">
        {/* Image skeleton with 1:1 aspect ratio to match breed images */}
        <Skeleton className="image-skeleton" radius="md" />
      </Section>

      {/* Name/text skeleton positioned absolutely like real breed name */}
      <Group justify="space-between" className="breed-card-name-skeleton">
        <Skeleton height={20} width="70%" radius="md" />
      </Group>
    </Card>
  );
};

export default BreedCardSkeleton;
