import { createContext } from "react";
import type { Settings } from "../../types/settings";

export const SettingsContext = createContext<Settings>({
  artStyle: "realistic",
  sortOrder: "fci-standard-number",
  sortDirection: "asc",
  showBreedVariants: false,
});
