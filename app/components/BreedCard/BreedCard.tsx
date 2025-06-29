import React, { useState, useCallback } from "react";
import { Card, Text, Group, Divider } from "@mantine/core";
import { clsx } from "clsx";
import type { Breed } from "../../../types/breed";
import { useBreed, useBreedVariantNames } from "../../stores/breeds";
import "@mantine/carousel/styles.css";
import { BreedImages } from "../BreedImages";
import "./styles.css";

interface Props {
  id: Breed["id"];
  name: string;
  onClick: () => void;
}

const BreedCard = ({ id, name, onClick }: Props) => {
  const { Section } = Card;
  const { details } = useBreed(id)!;
  const variantNames = useBreedVariantNames(id);
  const [activeSlide, setActiveSlide] = useState(0);

  const handleSlideChange = useCallback((index: number) => {
    setActiveSlide(index);
  }, []);

  return (
    <Card shadow="xl" padding="xl" radius="md" className="card">
      <Section
        className={clsx("card-section", {
          "single-image-card-section": variantNames.length == 1,
        })}
      >
        <BreedImages
          id={id}
          onClick={onClick}
          handleSlideChange={handleSlideChange}
        />
      </Section>

      <Group justify="space-between" className="breed-card-name">
        <Text truncate="end" className="breed-card-name-text">
          {name.replace(/ß/g, "ss")}
        </Text>
        {details.variants?.length && (
          <>
            <Divider className="breed-card-name-divider" />
            <Text truncate="end" size="sm">
              {details.variants?.[activeSlide]?.public.replace(/ß/g, "ss")}
            </Text>
          </>
        )}
      </Group>
    </Card>
  );
};

export default BreedCard;
