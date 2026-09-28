import { useEffect } from "react";
import { useBreedActions, useBreedsStatus } from "~/stores/breeds";

/** Starts loading breeds.json on first use; returns the load status */
export const useEnsureBreeds = () => {
  const status = useBreedsStatus();
  const { initialize } = useBreedActions();

  useEffect(() => {
    if (status === "idle") initialize();
  }, [status, initialize]);

  return status;
};
