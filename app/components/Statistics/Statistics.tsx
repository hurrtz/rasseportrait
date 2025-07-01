import React from "react";
import "./styles.css";
import {
  Accordion,
  Divider,
  Group,
  Progress,
  Stack,
  Text,
} from "@mantine/core";
import { IconHandFingerRight } from "@tabler/icons-react";
import { getStatistics } from "../../pages/rasseportrait/utils";
import {
  useAllBreeds,
  useBreeds,
  useRawBreeds,
  useSearch,
} from "../../stores/breeds";
import { useAmplitude } from "../../hooks/useAmplitude";
import { AMOUNT_OF_BREEDS_TOTAL } from "../../pages/rasseportrait/constants";

const Statistics = () => {
  const rawBreeds = useRawBreeds();
  const { track } = useAmplitude();
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

  const allBreeds = useAllBreeds();
  const breeds = useBreeds();
  const { needle } = useSearch();

  const items = [
    <Accordion.Item key="statistics" value="on">
      <Accordion.Control
        onClick={() =>
          track("Statistics Accordion Clicked", {
            totalBreeds: allBreeds.length,
            visibleBreeds: breeds.length,
            searchActive: !!needle,
          })
        }
      >
        Statistiken
      </Accordion.Control>
      <Accordion.Panel>
        <Stack>
          <Group wrap="nowrap">
            <IconHandFingerRight
              width={24}
              height={24}
              style={{ flex: "0 0 auto" }}
            />
            <Stack w="100%">
              <Text>Fortschritt Vorstellung FCI-Rasseliste</Text>
              <Progress.Root size="xl">
                <Progress.Section
                  value={Number(percentageBreedsPresented)}
                  color="#EEA13B"
                >
                  <Progress.Label>
                    {percentageBreedsPresented}% ({amountBreedsPresented}/
                    {AMOUNT_OF_BREEDS_TOTAL})
                  </Progress.Label>
                </Progress.Section>
              </Progress.Root>
            </Stack>
          </Group>
          <Divider />
          <Group wrap="nowrap" grow={false}>
            <IconHandFingerRight
              width={24}
              height={24}
              style={{ flex: "0 0 auto" }}
            />
            <Stack>
              <Text>Vorgestellte Rassen außerhalb der FCI-Rasseliste</Text>
              <div>
                {breedsOutsideFCI
                  .map((breed) => breed.details.public[0])
                  .join(", ")}
              </div>
            </Stack>
          </Group>
          <Divider />
          <Group wrap="nowrap" grow={false}>
            <IconHandFingerRight
              width={24}
              height={24}
              style={{ flex: "0 0 auto" }}
            />
            <Stack>
              <Text>
                Erwähnte Rassen, die noch nicht offiziell vorgestellt wurden
              </Text>
              <div>
                {breedsNotPresented
                  .map((breed) => breed.details.public[0])
                  .join(", ")}
              </div>
            </Stack>
          </Group>
          <Divider />
          <Group wrap="nowrap" grow={false}>
            <IconHandFingerRight
              width={24}
              height={24}
              style={{ flex: "0 0 auto" }}
            />
            <Stack>
              <Text>Erfolgsquote von Martin beim Erraten der Rassen</Text>
              <div>
                {martinCorrectGuessesPercentage}% ({martinCorrectGuesses}/
                {martinCorrectGuessesOutOfTotal})
              </div>
            </Stack>
          </Group>
          <Divider />
          <Group wrap="nowrap" grow={false}>
            <IconHandFingerRight
              width={24}
              height={24}
              style={{ flex: "0 0 auto" }}
            />
            <Stack>
              <Text>Erfolgsquote von Katharina beim Erraten der Rassen</Text>
              <div>
                {katharinaCorrectGuessesPercentage}% ({katharinaCorrectGuesses}/
                {katharinaCorrectGuessesOutOfTotal})
              </div>
            </Stack>
          </Group>
        </Stack>
      </Accordion.Panel>
    </Accordion.Item>,
  ];

  return (
    <Accordion variant="contained" radius="md">
      {items}
    </Accordion>
  );
};

export default Statistics;
