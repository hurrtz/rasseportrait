import React, { useCallback, type ChangeEvent, useState } from "react";
import { Input } from "@mantine/core";
import "./styles.css";
import { useBreedActions } from "../../stores/breeds";
import { useDebounce } from "../../hooks/useDebounce";

const BreedSearch = () => {
  const { setSearch } = useBreedActions();
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 300); // 300ms delay

  const handleChange = useCallback((event?: ChangeEvent<HTMLInputElement>) => {
    if (event && event.currentTarget) {
      setSearchValue(event.currentTarget.value);
    }
  }, []);

  // Update search when debounced value changes
  React.useEffect(() => {
    setSearch({ needle: debouncedSearchValue });
  }, [debouncedSearchValue, setSearch]);

  return (
    <>
      <Input
        placeholder="Suche nach Rassenamen oder FCI-Nummern"
        value={searchValue}
        onChange={handleChange}
        size="lg"
        aria-label="Search for dog breeds by name or FCI number"
        role="searchbox"
      />
    </>
  );
};

export default BreedSearch;
