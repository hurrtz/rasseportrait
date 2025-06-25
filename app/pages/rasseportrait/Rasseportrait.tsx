import React, { useEffect } from "react";
import { SimpleGrid } from "@mantine/core";
import { BreedCard } from "../../components/BreedCard";
import {
  useBreedActions,
  useBreeds,
  useSelectedBreed,
} from "../../stores/breeds";
import breedsDB from "../../../db/breeds";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "../../components/Modal";
import { BreedDetails } from "../../components/BreedDetails";
import type { Breed } from "types/breed";
import { mergeGroupedBreeds, sortBreeds } from "./utils";

const Rasseportrait = () => {
  const breeds = useBreeds();
  const { setRawBreeds, setBreeds, setSelectedBreed } = useBreedActions();
  const [isModalOpen, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const selectedBreed = useSelectedBreed();

  const onSelectBreed = (id: Breed["id"]) => {
    setSelectedBreed(id);
    openModal();
  };

  useEffect(() => {
    if (!breeds.length) {
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
  }, [breeds]);

  const breedCards = breeds.map(({ id, details: { public: names } }) => (
    <BreedCard
      key={id}
      id={id}
      name={names[0]}
      onClick={() => onSelectBreed(id)}
    />
  ));

  return (
    <div>
      <SimpleGrid
        cols={{ base: 2, sm: 3, lg: 4, xl: 5 }}
        spacing={{ base: 8 }}
        verticalSpacing={{ base: 8 }}
      >
        {breedCards}
      </SimpleGrid>
      <Modal
        isOpen={isModalOpen}
        close={closeModal}
        title={selectedBreed?.details.public[0] ?? ""}
      >
        <BreedDetails breed={selectedBreed} />
      </Modal>
    </div>
  );
};

export default Rasseportrait;
