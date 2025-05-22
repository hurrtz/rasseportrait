import React, { useEffect } from "react";
import { Grid } from "@mantine/core";
import { BreedCard } from "../../components/BreedCard";
import { useBreedActions, useBreeds } from "../../stores/breeds";
import breedsDB from "../../../db/breeds";
import useWindowDimensions from "../../tools/useWindowDimensions";

const Rasseportrait = () => {
  const breeds = useBreeds();
  const { setBreeds } = useBreedActions();
  const { Col } = Grid;
  const { width } = useWindowDimensions();

  let numberOfColumns = 1;

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

  const breedCards = breeds.map(({ id, names, fci, non_fci }) => (
    <Col span={numberOfColumns}>
      <BreedCard
        id={id}
        names={names}
        fci={fci}
        imageId={non_fci ? `no_fci_${non_fci}` : String(fci?.standardNumber)}
      />
    </Col>
  ));

  return (
    <div>
      <Grid grow>{breedCards}</Grid>
    </div>
  );
};

export default Rasseportrait;
