import React from "react";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import { type Breed } from "../../../types/breed";

const BreedCard = ({ id, names, fci }: Pick<Breed, "id" | "names" | "fci">) => {
  const { Section } = Card;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Section>
        <Image
          src={`illustrations/breeds/${id}/illustration_thumbnail.jpeg`}
          height={160}
          alt={names[0]}
        />
      </Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{names[0]}</Text>
      </Group>
    </Card>
  );
};

export default BreedCard;
