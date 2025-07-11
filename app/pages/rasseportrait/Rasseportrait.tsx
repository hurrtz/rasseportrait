import React, { useEffect, useMemo } from "react";
import { SimpleGrid, Stack } from "@mantine/core";
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
import { mergeGroupedBreeds } from "./utils";
import Fuse from "fuse.js";
import { useAmplitude } from "../../hooks/useAmplitude";

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
  const { track } = useAmplitude();

  const fuse = useMemo(() => new Fuse(allBreeds, fuseOptions), [allBreeds]);

  const onSelectBreed = (id: Breed["id"]) => {
    const selectedBreedData = allBreeds.find((breed) => breed.id === id);
    track("Breed Selected", {
      breedId: id,
      breedName: selectedBreedData?.details.public[0],
      hasVariants: (selectedBreedData?.details.variants?.length || 0) > 1,
      variantCount: selectedBreedData?.details.variants?.length || 0,
      searchActive: !!needle,
      searchTerm: needle || null,
      totalBreedsVisible: breeds.length,
    });
    setSelectedBreed(id);
  };

  const onCloseModal = () => {
    const selectedBreedData = allBreeds.find(
      (breed) => breed.id === selectedBreedId,
    );
    track("Breed Modal Closed", {
      breedId: selectedBreedId,
      breedName: selectedBreedData?.details.public[0],
      modalOpenDuration: Date.now(), // This could be improved with actual duration tracking
    });
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
      track("Breed Search Performed", {
        searchTerm: needle,
        resultsCount: results.length,
        totalBreeds: allBreeds.length,
        hasResults: results.length > 0,
      });
      setSearch({ results });
    }
  }, [needle, setSearch, fuse, track, allBreeds.length]);

  const breedCards = breeds.map(({ id, details: { public: names } }) => (
    <BreedCard
      key={id}
      id={id}
      name={names[0]}
      onClick={() => onSelectBreed(id)}
    />
  ));

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

      <Modal isOpen={isModalOpen} close={onCloseModal} />
    </>
  );
};

export default Rasseportrait;
