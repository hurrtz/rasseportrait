import { Button, Group, Select } from "@mantine/core";
import { useBreedActions, useSortBy, useSortOrder, useResetSort } from "~/stores/breeds";

export const SortControls = () => {
  const { setSort } = useBreedActions();
  const sortBy = useSortBy();
  const sortOrder = useSortOrder();
  const resetSort = useResetSort();

  const handleSortByChange = (value: string | null) => {
    if (value && ["name", "fci", "airDate"].includes(value)) {
      setSort({
        sortBy: value as "name" | "fci" | "airDate",
        sortOrder: "asc", // Default order when changing sort field
      });
    }
  };

  const toggleSortOrder = () => {
    setSort({
      sortBy,
      sortOrder: sortOrder === "asc" ? "desc" : "asc",
    });
  };

  const handleReset = () => {
    resetSort();
  };

  return (
    <Group gap="md">
      <Select
        label="Sort by"
        value={sortBy}
        onChange={handleSortByChange}
        data={[
          { value: "name", label: "Name" },
          { value: "fci", label: "FCI Number" },
          { value: "airDate", label: "Air Date" },
        ]}
      />
      
      <Button 
        variant="light" 
        onClick={toggleSortOrder}
        size="sm"
      >
        Order: {sortOrder === "asc" ? "↑ Ascending" : "↓ Descending"}
      </Button>
      
      <Button 
        variant="outline" 
        color="gray" 
        onClick={handleReset}
        size="sm"
      >
        Reset Sort
      </Button>
    </Group>
  );
};