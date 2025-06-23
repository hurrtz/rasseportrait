import React from "react";
import type { Breed } from "types/breed";

interface Props {
  breed?: Breed;
}

const BreedDetails = ({ breed }: Props) => {
  if (!breed) {
    return <div>Breed not found</div>;
  }

  return <div>{breed.classification.fci?.standardNumber}</div>;
};

export default BreedDetails;
