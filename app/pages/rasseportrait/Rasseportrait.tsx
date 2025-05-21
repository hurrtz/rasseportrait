import React, { useEffect } from "react";
import { Grid } from "@mantine/core";
import { BreedCard } from "../../components/BreedCard";
import { useBreedActions, useBreeds } from "../../stores/breeds";
import breedsDB from "../../../db/breeds";

const Rasseportrait = () => {
  const breeds = useBreeds();
  const { setBreeds } = useBreedActions();
  const { Col } = Grid;

  useEffect(() => {
    if (!breeds.length) {
      const breeds = Object.values(breedsDB);
      setBreeds(breeds);
    }
  }, [breeds]);

  const breedCards = breeds.map(({ id, names, fci }) => (
    <Col span={4}>
      <BreedCard id={id} names={names} fci={fci} />
    </Col>
  ));

  return (
    <div>
      <Grid grow>{breedCards}</Grid>
    </div>
  );
};

export default Rasseportrait;
