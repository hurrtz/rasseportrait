import React from "react";
import {
  Card,
  Image,
  Group,
  Text,
  Space,
  AspectRatio,
  Divider,
  Highlight,
  Center,
} from "@mantine/core";

export const BreedNotFound = ({ needle }: { needle: string }) => {
  const { Section } = Card;

  return (
    <Center>
      <AspectRatio ratio={16 / 9}>
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          w="100%"
          maw={600}
          style={{ aspectRatio: "initial" }}
        >
          <Section>
            <Image
              src="illustrations/general_purpose/not_found.jpeg"
              alt="Breed not found"
              h={320}
            />
          </Section>

          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>Mich gibt es nicht. Noch nicht.</Text>
          </Group>

          <Text size="sm" c="dimmed">
            Traurige Hundeaugen blicken dich an!
          </Text>

          <Space h={8} />

          <Text size="sm" c="dimmed">
            Zu deiner Sucheingabe{" "}
            <Highlight highlight={needle} component="span" color="pink">
              {needle}
            </Highlight>{" "}
            gibt es nichts zu finden. Das macht mich genauso traurig wie die
            kleine Peppa. Aber es ist leider nicht zu ändern. Aber wer weiß, das
            kann sich mit der nächsten Folge schon geändert haben.
          </Text>

          <Space h={8} />

          <Text size="sm">
            Bitte ändere deine Suche, oder lösche alles, damit du wieder alle
            Rassen siehst.
          </Text>

          <Divider my={16} />

          <Text size="sm" c="dimmed">
            Pro Tipp: Diese Sucheingabe noch mehr zu erweitern, wird nicht
            helfen 😉
          </Text>
        </Card>
      </AspectRatio>
    </Center>
  );
};
