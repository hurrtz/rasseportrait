import React, {
  useCallback,
  useState,
  useEffect,
  type ChangeEvent,
} from "react";
import { Input, CloseButton } from "@mantine/core";
import "./styles.css";
import { useBreedActions } from "../../stores/breeds";
import { useDebounce } from "../../hooks/useDebounce";
import {
  SEARCH_DEBOUNCE_DELAY_MS,
  SEARCH_PLACEHOLDER,
  SEARCH_ARIA_LABEL,
  ROLE_SEARCHBOX,
} from "~/constants";

const BreedSearch = () => {
  const { setSearch } = useBreedActions();
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(
    searchValue,
    SEARCH_DEBOUNCE_DELAY_MS,
  );

  const handleChange = useCallback((event?: ChangeEvent<HTMLInputElement>) => {
    if (event && event.currentTarget) {
      setSearchValue(event.currentTarget.value);
    }
  }, []);

  // Update search when debounced value changes
  useEffect(() => {
    setSearch({ needle: debouncedSearchValue });
  }, [debouncedSearchValue, setSearch]);

  return (
    <>
      <Input
        placeholder={SEARCH_PLACEHOLDER}
        value={searchValue}
        onChange={handleChange}
        size="lg"
        aria-label={SEARCH_ARIA_LABEL}
        role={ROLE_SEARCHBOX}
        rightSectionPointerEvents="all"
        rightSection={
          <CloseButton
            aria-label="Clear input"
            onClick={() => setSearchValue("")}
            style={{ display: searchValue ? undefined : "none" }}
          />
        }
      />
    </>
  );
};

export default BreedSearch;
