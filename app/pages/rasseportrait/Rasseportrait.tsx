import React, { useEffect, useMemo, useCallback } from "react";
import { SimpleGrid, Stack, Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import { useSearchParams } from "react-router";
import { LazyBreedCard } from "../../components/LazyBreedCard";
import {
  useAllBreeds,
  useBreedActions,
  useBreeds,
  useSearch,
  useSelectedBreedId,
  useLoading,
  useError,
  useInitialized,
} from "../../stores/breeds";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "../../components/Modal";
import { BreedSearch } from "../../components/BreedSearch";
import LoadingSpinner from "../../components/LoadingSpinner";
import type { Breed } from "types/breed";
import Fuse from "fuse.js";
import { useAmplitude } from "../../hooks/useAmplitude";
import { LOADING_MESSAGE } from "~/constants";
import { logger } from "~/utils/logger";

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

const Rasseportrait = () => {
  const breeds = useBreeds();
  const allBreeds = useAllBreeds();
  const { needle } = useSearch();
  const selectedBreedId = useSelectedBreedId();
  const loading = useLoading();
  const error = useError();
  const initialized = useInitialized();
  const { initialize, setSelectedBreed, setSearch } = useBreedActions();
  const [isModalOpen, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  const { track } = useAmplitude();
  const [searchParams, setSearchParams] = useSearchParams();

  const fuse = useMemo(() => new Fuse(allBreeds, fuseOptions), [allBreeds]);

  const onSelectBreed = useCallback(
    (id: Breed["id"]) => {
      const selectedBreedData = allBreeds.find((breed) => breed.id === id);
      track("Breed Selected", {
        breedId: String(id),
        breedName: selectedBreedData?.details.public[0],
        hasVariants: (selectedBreedData?.details.variants?.length || 0) > 1,
        variantCount: selectedBreedData?.details.variants?.length || 0,
        searchActive: !!needle,
        searchTerm: needle || null,
        totalBreedsVisible: breeds.length,
      });
      setSelectedBreed(id);

      // Update URL with breed parameter without affecting scroll position
      setSearchParams(
        (prev) => {
          const newParams = new URLSearchParams(prev);
          newParams.set("breed", String(id));
          return newParams;
        },
        { replace: true, preventScrollReset: true },
      );
    },
    [
      allBreeds,
      track,
      needle,
      breeds.length,
      setSelectedBreed,
      setSearchParams,
    ],
  );

  const onCloseModal = useCallback(() => {
    const selectedBreedData = allBreeds.find(
      (breed) => breed.id === selectedBreedId,
    );
    track("Breed Modal Closed", {
      breedId: selectedBreedId ? String(selectedBreedId) : undefined,
      breedName: selectedBreedData?.details.public[0],
      modalOpenDuration: Date.now(), // This could be improved with actual duration tracking
    });

    // Close modal first
    closeModal();

    // Remove breed parameter from URL without affecting scroll position
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev);
        newParams.delete("breed");
        return newParams;
      },
      { replace: true, preventScrollReset: true },
    );

    // Clear the selected breed after a short delay to allow modal to close
    setTimeout(() => {
      setSelectedBreed(undefined);
    }, 0);
  }, [
    allBreeds,
    selectedBreedId,
    track,
    setSelectedBreed,
    closeModal,
    setSearchParams,
  ]);

  // Initialize breeds on mount
  useEffect(() => {
    if (!initialized && !loading) {
      // Mark performance for initial render
      if (typeof window !== "undefined" && window.performance?.mark) {
        window.performance.mark("breeds-init-start");
      }
      initialize();
    }
  }, [initialized, loading, initialize]);

  // Handle breed parameter from URL on initial load and URL changes
  useEffect(() => {
    if (!initialized) return;

    const breedParam = searchParams.get("breed");
    if (breedParam) {
      // Convert to number if it's a numeric ID, otherwise keep as string
      const breedId = /^\d+$/.test(breedParam)
        ? parseInt(breedParam, 10)
        : breedParam;

      // Check if this breed exists
      const breedExists = allBreeds.some((breed) => breed.id === breedId);

      if (breedExists && breedId !== selectedBreedId) {
        // Set the selected breed without updating URL (since it's already there)
        setSelectedBreed(breedId);
        logger.info(`Opening breed from URL parameter: ${breedId}`);
      } else if (!breedExists && breedParam) {
        // Invalid breed ID in URL, remove it
        logger.warn(`Invalid breed ID in URL: ${breedParam}`);
        setSearchParams(
          (prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.delete("breed");
            return newParams;
          },
          { replace: true, preventScrollReset: true },
        );
      }
    }
    // Remove the else clause that was clearing selectedBreedId when URL has no breed parameter
    // This prevents the race condition when closing the modal
  }, [searchParams, initialized, allBreeds, setSelectedBreed, setSearchParams]);

  // Log performance metrics when breeds are loaded
  useEffect(() => {
    if (
      initialized &&
      typeof window !== "undefined" &&
      window.performance?.mark
    ) {
      window.performance.mark("breeds-init-end");
      try {
        if (window.performance?.measure) {
          window.performance.measure(
            "breeds-initialization",
            "breeds-init-start",
            "breeds-init-end",
          );
          const measure = window.performance.getEntriesByName?.(
            "breeds-initialization",
          )[0];
          if (measure) {
            logger.info(
              `Breeds initialization took ${measure.duration.toFixed(2)}ms`,
            );
          }
        }
      } catch (e) {
        // Ignore if marks don't exist
      }

      // Log total breeds count for performance tracking
      logger.info(
        `Total breeds loaded: ${allBreeds.length}, Visible: ${breeds.length}`,
      );
    }
  }, [initialized, allBreeds.length, breeds.length]);

  useEffect(() => {
    if (selectedBreedId) {
      openModal();
    }
  }, [selectedBreedId, openModal]);

  useEffect(() => {
    if (!needle) {
      setSearch({ results: null });
    } else {
      const results = fuse.search(needle).map(({ item: { id } }) => id);
      track("Breed Search Performed", {
        searchTerm: needle,
        resultsCount: results.length,
        totalBreeds: allBreeds.length,
        hasResults: results.length > 0,
      });
      setSearch({ results });
    }
  }, [needle, setSearch, fuse, track, allBreeds.length]);

  // Show loading state while breeds are being loaded
  if (loading) {
    return <LoadingSpinner message={LOADING_MESSAGE} />;
  }

  // Show error state if initialization failed
  if (error) {
    return (
      <Alert
        icon={<IconAlertCircle size={16} />}
        title="Failed to load breeds"
        color="red"
        variant="light"
      >
        {error}
      </Alert>
    );
  }

  // Don't render until initialized
  if (!initialized) {
    return <LoadingSpinner message={LOADING_MESSAGE} />;
  }

  const breedCards = breeds.map(({ id, details: { public: names } }) => (
    <LazyBreedCard
      key={id}
      id={id}
      name={names[0]}
      onClick={() => onSelectBreed(id)}
    />
  ));

  return (
    <>
      <Stack>
        <BreedSearch />
        <SimpleGrid
          cols={{ base: 1, sm: 3, lg: 4, xl: 5 }}
          spacing={{ base: 8 }}
          verticalSpacing={{ base: 8 }}
        >
          {breedCards}
        </SimpleGrid>
      </Stack>

      <Modal isOpen={isModalOpen} close={onCloseModal} />
    </>
  );
};

export default Rasseportrait;
