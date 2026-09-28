import React from "react";
import { SearchPill } from "~/components/SearchPill";
import { useBreedActions, useQuery } from "~/stores/breeds";
import { SEARCH_ARIA_LABEL, SEARCH_PLACEHOLDER } from "~/constants";

/**
 * Breed search. The raw query lives in the store, so it survives a visit to
 * a breed page; the overview debounces it before filtering.
 */
const BreedSearch = () => {
  const query = useQuery();
  const { setQuery } = useBreedActions();

  return (
    <SearchPill
      value={query}
      onChange={setQuery}
      label={SEARCH_ARIA_LABEL}
      placeholder={SEARCH_PLACEHOLDER}
    />
  );
};

export default BreedSearch;
