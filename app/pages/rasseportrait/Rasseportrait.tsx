import React, { useEffect } from "react";
import { SimpleGrid } from "@mantine/core";
import { BreedCard } from "../../components/BreedCard";
import {
  useBreedActions,
  useBreeds,
  useSelectedBreed,
} from "../../stores/breeds";
import breedsDB from "../../../db/breeds";
import useWindowDimensions from "../../tools/useWindowDimensions";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "../../components/Modal";
import { BreedDetails } from "../../components/BreedDetails";
import type { Breed } from "types/breed";

const Rasseportrait = () => {
  const breeds = useBreeds();
  const { setBreeds, setSelectedBreed } = useBreedActions();
  const { width } = useWindowDimensions();
  const [isModalOpen, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const selectedBreed = useSelectedBreed();

  const onSelectBreed = (id: Breed["id"]) => {
    setSelectedBreed(id);
    openModal();
  };

  useEffect(() => {
    if (!breeds.length) {
      const breeds = Object.values(breedsDB);
      setBreeds(breeds);
    }
  }, [breeds]);

  const breedCards = breeds.map(
    ({ id, details: { public: names }, classification: { fci } }) => (
      <BreedCard
        id={id}
        name={names[0]}
        fci={fci}
        onClick={() => onSelectBreed(id)}
      />
    ),
  );

  return (
    <div>
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}
        spacing={{ base: 8 }}
        verticalSpacing={{ base: 8 }}
      >
        {breedCards}
      </SimpleGrid>
      <Modal
        isOpen={isModalOpen}
        close={closeModal}
        title={selectedBreed?.details.public[0]}
      >
        <BreedDetails breed={selectedBreed} />
      </Modal>
    </div>
  );
};

export default Rasseportrait;
