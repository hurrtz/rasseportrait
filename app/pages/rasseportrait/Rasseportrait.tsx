import React, { useEffect } from "react";
import { Grid } from "@mantine/core";
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
  const { Col } = Grid;
  const selectedBreed = useSelectedBreed();

  const onSelectBreed = (id: Breed["id"]) => {
    setSelectedBreed(id);
    openModal();
  };

  let numberOfColumns: number;

  if (width > 2048) {
    numberOfColumns = 1;
  } else if (width > 1600) {
    numberOfColumns = 2;
  } else if (width > 1024) {
    numberOfColumns = 4;
  } else if (width > 768) {
    numberOfColumns = 6;
  } else if (width > 480) {
    numberOfColumns = 8;
  } else {
    numberOfColumns = 10;
  }

  useEffect(() => {
    if (!breeds.length) {
      const breeds = Object.values(breedsDB);
      setBreeds(breeds);
    }
  }, [breeds]);

  const breedCards = breeds.map(
    ({ id, details: { public: names }, classification: { fci } }) => (
      <Col span={numberOfColumns}>
        <BreedCard
          id={id}
          name={names[0]}
          fci={fci}
          onClick={() => onSelectBreed(id)}
        />
      </Col>
    ),
  );

  return (
    <div>
      <Grid grow>{breedCards}</Grid>
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
