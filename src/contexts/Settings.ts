import { createContext } from "react";
import type { Settings } from "../../types/settings";

export const SettingsContext = createContext<Settings>({
  artStyle: "realistic",
  sortOrder: "air-date",
  sortDirection: "asc",
  collapseSimilarBreeds: true,
});
