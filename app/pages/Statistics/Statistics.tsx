import React from "react";
import "./styles.css";
import {
  Group,
  Progress,
  Stack,
  Text,
  Card,
  NumberFormatter,
  Button,
} from "@mantine/core";
import { getStatistics } from "../rasseportrait/utils";
import {
  useAllBreeds,
  useBreedActions,
  useRawBreeds,
} from "../../stores/breeds";
import {
  AMOUNT_OF_BREEDS_TOTAL,
  AMOUNT_OF_BREEDS_APPROVED,
  AMOUNT_OF_BREEDS_PROVISIONAL,
} from "../rasseportrait/constants";
import type { Breed } from "types/breed";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "../../components/Modal";

const Statistics = () => {
  const rawBreeds = useRawBreeds();
  const allBreeds = useAllBreeds();

  const [isModalOpen, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const { setSelectedBreed } = useBreedActions();

  const {
    amountBreedsPresented,
    percentageBreedsPresented,
    breedsOutsideFCI,
    breedsNotPresented,
    martinCorrectGuesses,
    martinCorrectGuessesOutOfTotal,
    martinCorrectGuessesPercentage,
    katharinaCorrectGuesses,
    katharinaCorrectGuessesOutOfTotal,
    katharinaCorrectGuessesPercentage,
  } = getStatistics(rawBreeds);

  const handleBreedClick = (id: Breed["id"]) => {
    const selectedBreedData = allBreeds.find((breed) => breed.id === id);

    if (selectedBreedData) {
      setSelectedBreed(id);
      openModal();
    }
  };

  const onCloseModal = () => {
    closeModal();
    setSelectedBreed(undefined);
  };

  return (
    <>
      <Stack>
        <Card withBorder shadow="sm" padding="lg">
          <Stack>
            <Text fw={300} c="dark" style={{ fontVariant: "small-caps" }}>
              Fortschritt Vorstellung FCI-Rasseliste
            </Text>
          </Stack>

          <Stack pt="md">
            <Progress.Root size="xxl" h={24} w="100%">
              <Progress.Section
                value={Number(percentageBreedsPresented)}
                color="#EEA13B"
              >
                <Progress.Label fw={300}>
                  <NumberFormatter
                    value={percentageBreedsPresented}
                    suffix="%"
                    thousandSeparator="."
                    decimalSeparator=","
                  />
                </Progress.Label>
              </Progress.Section>
            </Progress.Root>
          </Stack>

          <Stack pt="xs" gap="5">
            <Text size="sm" fw={300} c="dimmed">
              Anzahl aller Rassen per FCI-Rasseliste:{" "}
              <Text component="span" fw={900}>
                {AMOUNT_OF_BREEDS_TOTAL}
              </Text>{" "}
              ({AMOUNT_OF_BREEDS_APPROVED} genehmigte Rassen +{" "}
              {AMOUNT_OF_BREEDS_PROVISIONAL} vorläufige Rassen)
            </Text>
            <Text size="sm" fw={300} c="dimmed">
              Anzahl der vorgestellten Rassen:{" "}
              <Text component="span" fw={900}>
                {amountBreedsPresented}
              </Text>
            </Text>
          </Stack>
        </Card>

        <Card withBorder shadow="sm">
          <Stack>
            <Text fw={300} c="dark" style={{ fontVariant: "small-caps" }}>
              Vorgestellte Rassen außerhalb der FCI-Rasseliste
            </Text>
          </Stack>

          <Group pt="xs" gap="5">
            {breedsOutsideFCI.map((breed) => (
              <Button
                key={breed.id}
                variant="light"
                size="xs"
                c="dimmed"
                fw={300}
                style={{ fontVariant: "small-caps" }}
                onClick={() => handleBreedClick(breed.id)}
              >
                {breed.details.public[0]}
              </Button>
            ))}
          </Group>
        </Card>

        <Card withBorder shadow="sm">
          <Stack>
            <Text fw={300} c="dark" style={{ fontVariant: "small-caps" }}>
              Erwähnte Rassen, die noch nicht offiziell vorgestellt wurden
            </Text>
          </Stack>

          <Group pt="xs" gap="5">
            {breedsNotPresented.map((breed) => (
              <Button
                key={breed.id}
                variant="light"
                size="xs"
                c="dimmed"
                fw={300}
                style={{ fontVariant: "small-caps" }}
                onClick={() => handleBreedClick(breed.id)}
              >
                {breed.details.public[0]}
              </Button>
            ))}
          </Group>
        </Card>

        <Card withBorder shadow="sm">
          <Stack>
            <Text fw={300} c="dark" style={{ fontVariant: "small-caps" }}>
              Erfolgsquote beim Erraten der Rassen
            </Text>
          </Stack>

          <Group wrap="nowrap">
            <Stack w="100%">
              <Stack pt="md">
                <Text
                  fw={600}
                  size="sm"
                  c="dark"
                  style={{ fontVariant: "small-caps" }}
                >
                  Martin
                </Text>
                <Progress.Root size="xxl" h={24} w="100%">
                  <Progress.Section
                    value={Number(martinCorrectGuessesPercentage)}
                    color="#EEA13B"
                  >
                    <Progress.Label fw={300}>
                      <NumberFormatter
                        value={martinCorrectGuessesPercentage}
                        suffix="%"
                        thousandSeparator="."
                        decimalSeparator=","
                      />
                    </Progress.Label>
                  </Progress.Section>
                </Progress.Root>
              </Stack>

              <Stack pt="0">
                <Text fw={300} c="dimmed" size="sm">
                  von{" "}
                  <Text component="span" fw={900}>
                    {martinCorrectGuessesOutOfTotal}
                  </Text>{" "}
                  erratbaren Rassen wurden{" "}
                  <Text component="span" fw={900}>
                    {martinCorrectGuesses}
                  </Text>{" "}
                  korrekt erraten (abzüglich{" "}
                  <Button
                    variant="light"
                    size="xs"
                    c="dimmed"
                    fw={300}
                    style={{ fontVariant: "small-caps" }}
                    onClick={() => handleBreedClick(336)}
                  >
                    Spanischer Wasserhund
                  </Button>
                  )
                </Text>
              </Stack>
            </Stack>

            <Stack w="100%">
              <Stack pt="md">
                <Text fw={600} c="dark" size="sm">
                  Katharina
                </Text>
                <Progress.Root size="xxl" h={24} w="100%">
                  <Progress.Section
                    value={Number(katharinaCorrectGuessesPercentage)}
                    color="#EEA13B"
                  >
                    <Progress.Label fw={300}>
                      <NumberFormatter
                        value={katharinaCorrectGuessesPercentage}
                        suffix="%"
                        thousandSeparator="."
                        decimalSeparator=","
                      />
                    </Progress.Label>
                  </Progress.Section>
                </Progress.Root>
              </Stack>

              <Stack pt="0">
                <Text fw={300} c="dimmed" size="sm">
                  von{" "}
                  <Text component="span" fw={900}>
                    {katharinaCorrectGuessesOutOfTotal}
                  </Text>{" "}
                  erratbaren Rasse wurde{" "}
                  <Text component="span" fw={900}>
                    {katharinaCorrectGuesses}
                  </Text>{" "}
                  korrekt erraten
                </Text>
              </Stack>
            </Stack>
          </Group>
        </Card>
      </Stack>

      <Modal isOpen={isModalOpen} close={onCloseModal} />
    </>
  );
};

export default Statistics;
