import React from "react";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import type { Breed } from "../../../types/breed";

interface Props {
  id: Breed["id"];
  name: string;
  fci: Breed["classification"]["fci"];
  onClick: () => void;
}

const BreedCard = ({ id, name, fci, onClick }: Props) => {
  const { Section } = Card;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder onClick={onClick}>
      <Section>
        <Image
          src={`illustrations/breeds/${id}/illustration_thumbnail.jpeg`}
          height="100%"
          alt={name}
        />
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
