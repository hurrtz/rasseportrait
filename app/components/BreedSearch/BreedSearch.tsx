import React, { useCallback, type ChangeEvent } from "react";
import { Input } from "@mantine/core";
import "./styles.css";
import { useBreedActions } from "../../stores/breeds";

const BreedSearch = () => {
  const { setSearch } = useBreedActions();

  const handleChange = useCallback((event?: ChangeEvent<HTMLInputElement>) => {
    if (event && event.currentTarget) {
      setSearch({ needle: event.currentTarget.value });
    }
  }, []);

  return (
    <>
      <Input
        placeholder="Suche nach Rassenamen oder FCI-Nummern"
        onChange={handleChange}
      />
    </>
  );
};

export default BreedSearch;
