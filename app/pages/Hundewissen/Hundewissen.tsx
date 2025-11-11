import { Container, Text, Title, Card, Stack } from "@mantine/core";

const Hundewissen = () => {
  return (
    <Container size="md">
      <Title order={1}>Hundewissen</Title>
      <Card withBorder p="lg" mt="lg">
        <Stack gap="md">
          <Text>
            Hier entsteht bald eine Sammlung von Wissenswertem rund um Hunde.
          </Text>
          <Text c="dimmed" size="sm">
            Diese Seite wird zukünftig interessante Fakten, Tipps und
            Informationen über Hunde, ihre Haltung, Erziehung und vieles mehr
            enthalten.
          </Text>
        </Stack>
      </Card>
    </Container>
  );
};

export default Hundewissen;
