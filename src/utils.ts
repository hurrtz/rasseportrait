import type { FCI } from "../types/breed";

export const getBreedImagePath = ({
  group,
  section,
  standardNumber,
  variant = "default",
}: FCI & { variant?: string }) =>
  `assets/fci/${group}/${section}/${standardNumber}/${variant}.jpeg`;
