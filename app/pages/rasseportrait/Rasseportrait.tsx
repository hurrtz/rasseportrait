import React, { useEffect, useMemo } from "react";
import { SimpleGrid } from "@mantine/core";
import { useNavigate, useSearchParams } from "react-router";
import Fuse from "fuse.js";
import type { Breed } from "types/breed";
import { BreedSearch } from "~/components/BreedSearch";
import BreedNotFound from "~/components/BreedNotFound";
import { HeroPortrait } from "~/components/HeroPortrait";
import { LazyBreedCard } from "~/components/LazyBreedCard";
import { LoadError } from "~/components/LoadError";
import LoadingSpinner from "~/components/LoadingSpinner";
import { SortControl } from "~/components/SortControl";
import { LOADING_MESSAGE, SEARCH_DEBOUNCE_DELAY_MS } from "~/constants";
import { useAmplitude } from "~/hooks/useAmplitude";
import { useDebounce } from "~/hooks/useDebounce";
import { useEnsureBreeds } from "~/hooks/useEnsureBreeds";
import {
  useAllBreeds,
  useBreedActions,
  useQuery,
  useSortedBreeds,
} from "~/stores/breeds";
import { getNewestPortraitBreed } from "~/utils/breed";
import classes from "./Rasseportrait.module.css";

const fuseOptions = {
  keys: [
    "classification.fci.standardNumber",
    "details.variants.public",
    "details.variants.fci.standardNumber",
    "details.public",
  ],
  shouldSort: true,
  ignoreLocation: true,
  threshold: 0.1,
};

/** Old share links were /?breed=<hash>; they now live at /rasse/<slug> */
const useLegacyBreedRedirect = (breeds: Breed[]) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const breedParam = searchParams.get("breed");

  useEffect(() => {
    if (!breedParam) return;
    const breed = breeds.find(({ id }) => String(id) === breedParam);
    navigate(breed ? `/rasse/${breed.slug}` : "/", { replace: true });
  }, [breedParam, breeds, navigate]);
};

const Overview = () => {
  const breeds = useAllBreeds();
  const sortedBreeds = useSortedBreeds();
  const query = useQuery();
  const { setQuery } = useBreedActions();
  const { track } = useAmplitude();
  const needle = useDebounce(query.trim(), SEARCH_DEBOUNCE_DELAY_MS);

  useLegacyBreedRedirect(breeds);

  const fuse = useMemo(() => new Fuse(breeds, fuseOptions), [breeds]);
  const newest = useMemo(() => getNewestPortraitBreed(breeds), [breeds]);

  const visibleBreeds = useMemo(() => {
    if (!needle) return sortedBreeds;
    const hits = new Set(fuse.search(needle).map(({ item }) => item.id));
    return sortedBreeds.filter(({ id }) => hits.has(id));
  }, [needle, sortedBreeds, fuse]);

  useEffect(() => {
    if (!needle) return;
    track("Breed Search Performed", {
      searchTerm: needle,
      resultsCount: visibleBreeds.length,
      totalBreeds: breeds.length,
      hasResults: visibleBreeds.length > 0,
    });
    // tracked once per search term, not again when results re-render
  }, [needle]);

  return (
    <>
      {newest && !needle && (
        <div className={classes.heroWrap}>
          <HeroPortrait breed={newest} />
        </div>
      )}

      <section className={classes.section} aria-labelledby="portraits-title">
        <div className={classes.head}>
          <h2 id="portraits-title" className={classes.title}>
            {needle ? (
              `${visibleBreeds.length} Treffer für »${needle}«`
            ) : (
              <>
                Alle <span className={classes.count}>{breeds.length} </span>
                Portraits
              </>
            )}
          </h2>
          <div className={classes.search}>
            <BreedSearch />
          </div>
          <div className={classes.sort}>
            <SortControl />
          </div>
        </div>

        {needle && !visibleBreeds.length ? (
          <BreedNotFound needle={needle} onReset={() => setQuery("")} />
        ) : (
          <SimpleGrid
            cols={{ base: 2, sm: 3, md: 4, xl: 5 }}
            spacing={{ base: 14, md: 24 }}
            verticalSpacing={{ base: 24, md: 36 }}
          >
            {visibleBreeds.map((breed) => (
              <LazyBreedCard key={breed.id} breed={breed} />
            ))}
          </SimpleGrid>
        )}
      </section>
    </>
  );
};

const Rasseportrait = () => {
  const status = useEnsureBreeds();
  const { initialize } = useBreedActions();

  if (status === "error") {
    return (
      <LoadError
        title="Die Rassen konnten nicht geladen werden."
        onRetry={initialize}
      />
    );
  }

  if (status !== "ready") {
    return <LoadingSpinner message={LOADING_MESSAGE} />;
  }

  return <Overview />;
};

export default Rasseportrait;
