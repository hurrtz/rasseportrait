import React, { useId, useRef } from "react";
import { IconSearch, IconX } from "@tabler/icons-react";
import { useBreedActions, useQuery } from "~/stores/breeds";
import { SEARCH_ARIA_LABEL, SEARCH_PLACEHOLDER } from "~/constants";
import classes from "./BreedSearch.module.css";

/**
 * Search pill. The raw query lives in the store, so it survives a visit to a
 * breed page; the overview debounces it before filtering.
 */
const BreedSearch = () => {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const query = useQuery();
  const { setQuery } = useBreedActions();

  return (
    <div className={classes.search}>
      <IconSearch size={18} className={classes.icon} aria-hidden />
      <label htmlFor={id} className="rp-visually-hidden">
        {SEARCH_ARIA_LABEL}
      </label>
      <input
        ref={inputRef}
        id={id}
        type="search"
        className={classes.input}
        placeholder={SEARCH_PLACEHOLDER}
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
        autoComplete="off"
        enterKeyHint="search"
      />
      {query && (
        <button
          type="button"
          className={classes.clear}
          aria-label="Suche leeren"
          onClick={() => {
            setQuery("");
            inputRef.current?.focus();
          }}
        >
          <IconX size={16} aria-hidden />
        </button>
      )}
    </div>
  );
};

export default BreedSearch;
