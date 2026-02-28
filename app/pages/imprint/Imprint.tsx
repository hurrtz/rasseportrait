import { Container, Text, Title, Card } from "@mantine/core";

const Imprint = () => {
  return (
    <Container size="md">
      <Title order={1}>Impressum</Title>
      <Card withBorder p="lg" mt="lg">
        <Title order={2}>Zweck</Title>
        <Text mt="lg">
          Diese Website ist ein Fanprojekt zum Podcast{" "}
          <strong>Tierisch Menschlich</strong> von Martin Rütter und Katharina
          Adick. Es enthält eine nicht verbindliche kuratierte Liste aller
          Episoden, die ein Rasseportrait enthalten.
        </Text>
        <Text mt="sm">
          Der Podcast wurde bis zum 11. Dezember 2025 über{" "}
          <a href="https://plus.rtl.de" target="_blank">
            RTL+
          </a>{" "}
          veröffentlicht. Seit Februar 2026 wird er von{" "}
          <a href="https://www.mina-entertainment.de" target="_blank">
            Mina Entertainment
          </a>{" "}
          (Martin Rütter) produziert und über{" "}
          <a href="https://open.spotify.com" target="_blank">
            Spotify
          </a>{" "}
          bereitgestellt.
        </Text>
        <Text mt="sm">
          Dieses Projekt ist in keiner Weise beauftragt von oder affiliiert mit
          RTL, Mina Entertainment, Spotify oder einer der am Podcast
          teilnehmenden oder mitwirkenden Personen.
        </Text>
        <Text>
          Bei Problemen, Änderungswünschen oder sonstigem Feedback wenden Sie
          sich gern an die unten stehende Kontaktmöglichkeit.
        </Text>
      </Card>
      <Card withBorder p="lg" mt="lg">
        <Title order={2}>Kontakt</Title>
        <Text mt="lg">
          <strong>Name:</strong> Tobias Winkler
          <br />
          <strong>E-Mail:</strong>{" "}
          <a href="mailto:rasseportrait@tobiaswinkler.berlin">
            rasseportrait@tobiaswinkler.berlin
          </a>
          <br />
          <strong>LinkedIn:</strong>{" "}
          <a
            href="https://www.linkedin.com/in/tobias-winkler-87a08210b/"
            target="_blank"
          >
            tobias-winkler-87a08210b
          </a>
          <br />
          <strong>GitHub:</strong>{" "}
          <a href="https://github.com/hurrtz" target="_blank">
            hurrtz
          </a>
        </Text>
      </Card>
    </Container>
  );
};

export default Imprint;
