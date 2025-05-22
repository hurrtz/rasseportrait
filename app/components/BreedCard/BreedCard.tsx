import React from "react";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import { type Breed } from "../../../types/breed";

interface Props extends Pick<Breed, "id" | "names" | "fci"> {
  imageId?: string;
  onClick: () => void;
}

const BreedCard = ({ id, names, fci, imageId, onClick }: Props) => {
  const { Section } = Card;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder onClick={onClick}>
      <Section>
        <Image
          src={`illustrations/breeds/${imageId}/illustration_thumbnail.jpeg`}
          height="100%"
          alt={names[0]}
        />
      </Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>
          {names[0]} - {fci?.standardNumber}
        </Text>
      </Group>
    </Card>
  );
};

export default BreedCard;
