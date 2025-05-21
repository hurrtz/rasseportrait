import React from "react";
import { Grid } from "@mantine/core";
import { BreedCard } from "../../components/BreedCard";

const Rasseportrait = () => {
  const { Col } = Grid;

  return (
    <div>
      <Grid grow>
        <Col span={4}>
          <BreedCard />
        </Col>
        <Col span={4}>
          <BreedCard />
        </Col>
        <Col span={4}>
          <BreedCard />
        </Col>
        <Col span={4}>
          <BreedCard />
        </Col>
        <Col span={4}>
          <BreedCard />
        </Col>
      </Grid>
    </div>
  );
};

export default Rasseportrait;
