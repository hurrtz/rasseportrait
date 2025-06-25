import React, { useEffect, useMemo } from "react";
import { SimpleGrid, Stack } from "@mantine/core";
import { BreedCard } from "../../components/BreedCard";
import {
  useAllBreeds,
  useBreedActions,
  useBreeds,
  useRawBreeds,
  useSelectedBreed,
  useSearch,
} from "../../stores/breeds";
import breedsDB from "../../../db/breeds";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "../../components/Modal";
import { BreedDetails } from "../../components/BreedDetails";
import { BreedSearch } from "../../components/BreedSearch";
import type { Breed } from "types/breed";
import { mergeGroupedBreeds, sortBreeds } from "./utils";
import Fuse from "fuse.js";

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
  let searchedBreeds = breeds;
  const { needle } = useSearch();
  const { setRawBreeds, setBreeds, setSelectedBreed, setSearch } =
    useBreedActions();
  const [isModalOpen, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const selectedBreed = useSelectedBreed();

  const fuse = useMemo(() => new Fuse(allBreeds, fuseOptions), [allBreeds]);

  const onSelectBreed = (id: Breed["id"]) => {
    setSelectedBreed(id);
    openModal();
  };

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

      // sort breeds by air date of podcast
      const sortedBreeds = sortBreeds({
        breeds: allBreeds,
        sortBy: "airDate",
        sortDirection: "desc",
      });

      setBreeds(sortedBreeds);
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

  const breedCards = searchedBreeds.map(
    ({ id, details: { public: names } }) => (
      <BreedCard
        key={id}
        id={id}
        name={names[0]}
        onClick={() => onSelectBreed(id)}
      />
    ),
  );

  return (
    <>
      <Stack>
        <BreedSearch />

        <SimpleGrid
          cols={{ base: 1, sm: 3, lg: 4, xl: 5 }}
          spacing={{ base: 8 }}
          verticalSpacing={{ base: 8 }}
        >
          {breedCards}
        </SimpleGrid>
      </Stack>

      <Modal
        isOpen={isModalOpen}
        close={closeModal}
        title={selectedBreed?.details.public[0] ?? ""}
      >
        <BreedDetails breed={selectedBreed} />
      </Modal>
    </>
  );
};

export default Rasseportrait;
