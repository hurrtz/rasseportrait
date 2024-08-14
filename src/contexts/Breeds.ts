import { createContext } from "react";
import type { EnrichedBreed } from "../../types/breed";

export const BreedsContext = createContext<EnrichedBreed[]>([]);
