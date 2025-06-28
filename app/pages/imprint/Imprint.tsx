import { Container, Text, Title, Card } from "@mantine/core";

const Imprint = () => {
  return (
    <Container size="md">
      <Title order={1}>Impressum</Title>
      <Card withBorder p="lg" mt="lg">
        <Title order={2}>Zweck</Title>
        <Text mt="lg">
          Diese Website ist ein Fanprojekt zum Podcast{" "}
          <a href="https://plus.rtl.de/podcast/tierisch-menschlich-der-podcast-mit-hundeprofi-martin-ruetter-und-katharina-adick-m5iuweomug8fv">
            Tierisch Menschlich
          </a>{" "}
          von Martin Rütter und Katharina Adick. Es enthält eine nicht
          verbindliche kuratierte Liste aller Episoden, die ein Rasseportrait
          enthalten. Dieses Projekt ist in keiner Weise beauftragt von RTL oder
          einer der teilnehmenden oder der Produktion des Podcasts mitwirkenden
          Personen.
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
