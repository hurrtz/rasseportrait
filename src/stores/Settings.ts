import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Settings } from "../../types/settings";

interface SettingsState {
  settings: Settings;
  set: (settings: Settings) => void;
}

const useSettingsStore = create<SettingsState>()(
  devtools(
    (set) => ({
      settings: {
        sortOrder: "air-date",
        sortDirection: "asc",
        collapseSimilarBreeds: true,
      },
      set: (settings) => set(() => ({ settings }), undefined, "setSettings"),
    }),
    { name: "Rasseportrait: Settings", store: "Rasseportrait" },
  ),
);

export { useSettingsStore };
