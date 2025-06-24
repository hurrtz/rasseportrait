import React, { useMemo } from "react";
import { Card, Image, Text, Group } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { clsx } from "clsx";
import type { Breed } from "../../../types/breed";
import { useBreed, useBreedVariantNames } from "../../stores/breeds";
import "@mantine/carousel/styles.css";
import "./styles.css";

interface Props {
  id: Breed["id"];
  name: string;
  fci: Breed["classification"]["fci"];
  onClick: () => void;
}

const Images = ({ images }: { images: string[] }) => {
  if (images.length === 1) {
    return (
      <Image src={images[0]} height="100%" key={images[0]} className="image" />
    );
  }

  return (
    <Carousel
      slideSize={{ base: "100%" }}
      slideGap="md"
      controlsOffset="sm"
      controlSize={26}
      withControls
      withIndicators
      emblaOptions={{
        loop: true,
        dragFree: false,
        align: "center",
      }}
    >
      {images.map((image, index) => (
        <Image src={image} key={`${image}-${index}`} className="image slide" />
      ))}
    </Carousel>
  );
};

const BreedCard = ({ id, name, fci, onClick }: Props) => {
  const { Section } = Card;
  const { details } = useBreed(id)!;
  const variantNames = useBreedVariantNames(id);
  const isGrouped = details.isGrouped;

  const images = useMemo(() => {
    if (isGrouped) {
      return details.variants!.map((variant) => {
        return `illustrations/breeds/${variant.fci!.standardNumber}/illustration_${variant.internal}_thumbnail.jpeg`;
      });
    }

    return (
      variantNames?.map(
        ({ id, variant }) =>
          `illustrations/breeds/${id}/illustration${variant ? `_${variant}` : ""}_thumbnail.jpeg`,
      ) ?? []
    );
  }, [variantNames]);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder onClick={onClick}>
      <Section
        className={clsx({ singleImageCardSection: variantNames.length == 1 })}
      >
        <Images images={images} />
      </Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>
          {name} - {fci?.standardNumber}
        </Text>
      </Group>
    </Card>
  );
};

export default BreedCard;
