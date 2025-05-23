import React from "react";
import type { Breed } from "types/breed";

interface Props {
  breed: Breed;
}

const BreedDetails = ({ breed }: Props) => {
  return <div>{breed.fci?.standardNumber}</div>;
};

export default BreedDetails;
