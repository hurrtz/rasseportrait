import { useMemo } from "react";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type { Breed } from "../../types/breed";
import {
  sortBreeds,
  type SortBy,
  type SortOrder,
} from "../pages/rasseportrait/utils";
import { logger } from "~/utils/logger";
import { toDisplayBreeds } from "~/utils/breed";
import {
  BASE_PATH,
  BREEDS_STORE_NAME,
  DEFAULT_SORT_BY,
  DEFAULT_SORT_ORDER,
  ERROR_NO_BREEDS_FOUND,
  ERROR_UNKNOWN,
} from "~/constants";

export type { SortBy, SortOrder };

export type BreedsStatus = "idle" | "loading" | "ready" | "error";

/** The three sort options of the UI, each with its fixed direction */
export const SORT_ORDER_BY_FIELD: Record<SortBy, SortOrder> = {
  airDate: "desc",
  name: "asc",
  fci: "asc",
};

interface BreedActions {
  /** Loads breeds.json once; after an error it may be called again */
  initialize: () => Promise<void>;
  setQuery: (query: string) => void;
  setSort: (sort: { sortBy: SortBy; sortOrder: SortOrder }) => void;
}

interface State {
  /** One entry per breed data file */
  rawBreeds: Breed[];
  /** What the app shows: grouped breeds merged, hashed ids, slugs */
  breeds: Breed[];
  status: BreedsStatus;
  error: string | null;
  /** The search input as typed (debounced by the page) */
  query: string;
  sortBy: SortBy;
  sortOrder: SortOrder;
  actions: BreedActions;
}

/** The running load, so concurrent callers can await the same request */
let inflight: Promise<void> | null = null;

const fetchRawBreeds = async (): Promise<Breed[]> => {
  const response = await fetch(`${BASE_PATH}data/breeds.json`);
  if (!response.ok) {
    throw new Error(
      `Failed to load breeds: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();
  const rawBreeds = data.breeds as Breed[] | undefined;
  if (!rawBreeds?.length) throw new Error(ERROR_NO_BREEDS_FOUND);

  logger.info(
    `Loaded ${rawBreeds.length} breeds (compiled: ${data.meta?.compiled})`,
  );
  return rawBreeds;
};

const useBreedsStore = create<State>()(
  devtools(
    persist(
      (set, get) => ({
        rawBreeds: [],
        breeds: [],
        status: "idle",
        error: null,
        query: "",
        sortBy: DEFAULT_SORT_BY,
        sortOrder: DEFAULT_SORT_ORDER,
        actions: {
          initialize: () => {
            const { status } = get();
            if (status === "ready") return Promise.resolve();
            if (status === "loading" && inflight) return inflight;

            set({ status: "loading", error: null }, undefined, "initialize");
            inflight = fetchRawBreeds()
              .then((rawBreeds) =>
                set(
                  {
                    rawBreeds,
                    breeds: toDisplayBreeds(rawBreeds),
                    status: "ready",
                  },
                  undefined,
                  "initialize:success",
                ),
              )
              .catch((e) => {
                logger.error("Failed to initialize breeds:", e);
                set(
                  {
                    status: "error",
                    error: e instanceof Error ? e.message : ERROR_UNKNOWN,
                  },
                  undefined,
                  "initialize:error",
                );
              })
              .finally(() => {
                inflight = null;
              });
            return inflight;
          },
          setQuery: (query) => set({ query }, undefined, "setQuery"),
          setSort: ({ sortBy, sortOrder }) =>
            set({ sortBy, sortOrder }, undefined, "setSort"),
        },
      }),
      {
        name: "rasseportrait-sort-settings",
        version: 2,
        partialize: ({ sortBy, sortOrder }) => ({ sortBy, sortOrder }),
        // v1 let people pick any direction; v2 has one direction per field
        migrate: (persisted, version) => {
          const { sortBy } = (persisted ?? {}) as { sortBy?: SortBy };
          const field =
            sortBy && sortBy in SORT_ORDER_BY_FIELD ? sortBy : DEFAULT_SORT_BY;
          return version < 2
            ? { sortBy: field, sortOrder: SORT_ORDER_BY_FIELD[field] }
            : (persisted as { sortBy: SortBy; sortOrder: SortOrder });
        },
      },
    ),
    { name: BREEDS_STORE_NAME },
  ),
);

export const useBreedsStatus = () => useBreedsStore((state) => state.status);

export const useBreedsError = () => useBreedsStore((state) => state.error);

export const useRawBreeds = () => useBreedsStore((state) => state.rawBreeds);

export const useAllBreeds = () => useBreedsStore((state) => state.breeds);

export const useBreedBySlug = (slug: string | undefined) =>
  useBreedsStore((state) => state.breeds.find((breed) => breed.slug === slug));

export const useQuery = () => useBreedsStore((state) => state.query);

export const useSortBy = () => useBreedsStore((state) => state.sortBy);

export const useSortOrder = () => useBreedsStore((state) => state.sortOrder);

export const useBreedActions = () => useBreedsStore((state) => state.actions);

/** All display breeds in the chosen sort order */
export const useSortedBreeds = () => {
  const breeds = useAllBreeds();
  const sortBy = useSortBy();
  const sortOrder = useSortOrder();

  return useMemo(
    () => sortBreeds({ breeds, sortBy, sortOrder }),
    [breeds, sortBy, sortOrder],
  );
};

export default useBreedsStore;
