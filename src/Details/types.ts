import { type Dispatch, type SetStateAction } from "react";
import type { BreedIdentifier } from "../../types/breed";
import type { TopicIdentifier } from "../../types/topic";

export interface ElementDetailsProps {
  selectedElement: BreedIdentifier | TopicIdentifier;
  setSelectedElement: (
    elementIdentifier: BreedIdentifier | TopicIdentifier,
  ) => void;
  elementType: "breeds" | "topics";
}
