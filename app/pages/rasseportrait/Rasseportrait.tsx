import React, { useEffect, useMemo } from "react";
import {
  SimpleGrid,
  Stack,
  Accordion,
  Text,
  Divider,
  Progress,
  Group,
} from "@mantine/core";
import { BreedCard } from "../../components/BreedCard";
import {
  useAllBreeds,
  useBreedActions,
  useBreeds,
  useRawBreeds,
  useSearch,
  useSelectedBreedId,
} from "../../stores/breeds";
import breedsDB from "../../../db/breeds";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "../../components/Modal";
import { BreedSearch } from "../../components/BreedSearch";
import type { Breed } from "types/breed";
import { mergeGroupedBreeds, getStatistics } from "./utils";
import Fuse from "fuse.js";
import { IconHandFingerRight } from "@tabler/icons-react";
import {
  AMOUNT_OF_BREEDS_APPROVED,
  AMOUNT_OF_BREEDS_PROVISIONAL,
  AMOUNT_OF_BREEDS_REMOVED,
  AMOUNT_OF_BREEDS_TOTAL,
} from "./constants";

const fuseOptions = {
  keys: [
    "classification.fci.standardNumber",
    "details.variants[0].fci.standardNumber",
    "details.internal",
    "details.public",
    "variants[0].internal",
    "variants[0].public",
  ],
  shouldSort: true,
  ignoreLocation: true,
  threshold: 0.1,
};

const Rasseportrait = () => {
  const breeds = useBreeds();
  const allBreeds = useAllBreeds();
  const rawBreeds = useRawBreeds();
  const { needle } = useSearch();
  const selectedBreedId = useSelectedBreedId();
  const { setRawBreeds, setBreeds, setSelectedBreed, setSearch } =
    useBreedActions();
  const [isModalOpen, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const fuse = useMemo(() => new Fuse(allBreeds, fuseOptions), [allBreeds]);
  const { Item, Panel, Control } = Accordion;
  const { Root, Section, Label } = Progress;

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

  const onSelectBreed = (id: Breed["id"]) => {
    setSelectedBreed(id);
  };

  const onCloseModal = () => {
    setSelectedBreed(undefined);
    closeModal();
  };

  useEffect(() => {
    if (selectedBreedId) {
      openModal();
    }
  }, [selectedBreedId, openModal]);

  useEffect(() => {
    if (!rawBreeds.length) {
      // all breeds straight from the database as is
      const breeds = Object.values(breedsDB) as Breed[];

      setRawBreeds(breeds);

      // all breeds that are solitary, i.e. not grouped (e.g. Poodle)
      const singleBreeds = breeds.filter((breed) => !breed.details.groupAs);

      // all breeds that are grouped (e.g. Corgi), each group merged into a single breed with variants
      const mergedBreeds = mergeGroupedBreeds(breeds);

      const allBreeds = [...singleBreeds, ...mergedBreeds];

      setBreeds(allBreeds);
    }
  }, [rawBreeds.length]);

  useEffect(() => {
    if (!needle) {
      setSearch({ results: null });
    } else {
      const results = fuse.search(needle).map(({ item: { id } }) => id);

      setSearch({ results });
    }
  }, [needle, setSearch, fuse]);

  const breedCards = breeds.map(({ id, details: { public: names } }) => (
    <BreedCard
      key={id}
      id={id}
      name={names[0]}
      onClick={() => onSelectBreed(id)}
    />
  ));

  const items = [
    <Item key="statistics" value="on">
      <Control>Statistiken</Control>
      <Panel>
        <Stack>
          <Group wrap="nowrap">
            <IconHandFingerRight
              width={24}
              height={24}
              style={{ flex: "0 0 auto" }}
            />
            <Stack w="100%">
              <Text>Fortschritt Vorstellung FCI-Rasseliste</Text>
              <Root size="xl">
                <Section
                  value={Number(percentageBreedsPresented)}
                  color="orange"
                  striped
                >
                  <Label>
                    {percentageBreedsPresented}% ({amountBreedsPresented}/
                    {AMOUNT_OF_BREEDS_TOTAL})
                  </Label>
                </Section>
              </Root>
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
      </Panel>
    </Item>,
  ];

  return (
    <>
      <Stack>
        <BreedSearch />

        <Accordion variant="contained" radius="md">
          {items}
        </Accordion>

        <SimpleGrid
          cols={{ base: 1, sm: 3, lg: 4, xl: 5 }}
          spacing={{ base: 8 }}
          verticalSpacing={{ base: 8 }}
        >
          {breedCards}
        </SimpleGrid>
      </Stack>

      <Modal isOpen={isModalOpen} close={onCloseModal} />
    </>
  );
};

export default Rasseportrait;
