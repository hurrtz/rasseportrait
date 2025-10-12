import type { Breed } from "../../types/breed";

// Safe characters for URLs (36 chars total: a-z, 0-9)
const CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";

/**
 * Simple hash function that works in the browser
 * Uses djb2 algorithm with modifications for better distribution
 */
function hashString(str: string): number {
  let hash = 5381;

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);

    hash = (hash << 5) + hash + char; // hash * 33 + char
    hash = hash & 0x7fffffff; // Keep positive
  }

  return hash;
}

/**
 * Generate a 4-character hash from a string
 */
function stringToFourChars(input: string): string {
  const hash = hashString(input);

  // Convert to base-36 (alphanumeric)
  const first = CHARS[hash % 36];
  const second = CHARS[Math.floor(hash / 36) % 36];
  const third = CHARS[Math.floor(hash / (36 * 36)) % 36];
  const fourth = CHARS[Math.floor(hash / (36 * 36 * 36)) % 36];

  return first + second + third + fourth;
}

/**
 * Generate unique hashes for all breeds, handling collisions
 * by using additional breed details
 */
export function generateBreedHashes(
  breeds: Breed[],
): Map<string | number, string> {
  const hashMap = new Map<string | number, string>();
  const usedHashes = new Set<string>();

  for (const breed of breeds) {
    const originalId = breed.id;
    let hash = "";
    let attempt = 0;
    let found = false;

    // Try different combinations until we find a unique hash
    while (!found && attempt < 10) {
      let inputForHash = String(originalId);

      if (attempt > 0) {
        // Use additional breed details to generate different hashes
        switch (attempt) {
          case 1:
            // Try with first public name
            inputForHash = `${originalId}_${breed.details.public[0]}`;
            break;

          case 2:
            // Try with internal name
            inputForHash = `${originalId}_${breed.details.internal}`;
            break;

          case 3:
            // Try with all public names
            inputForHash = `${originalId}_${breed.details.public.join("_")}`;
            break;

          case 4:
            // Try with FCI number if available
            if (breed.classification.fci) {
              inputForHash = `${originalId}_fci${breed.classification.fci.standardNumber}`;
            } else {
              inputForHash = `${originalId}_nofci_${attempt}`;
            }
            break;

          case 5:
            // Try with groupAs if available
            if (breed.details.groupAs) {
              inputForHash = `${originalId}_group_${breed.details.groupAs}`;
            } else {
              inputForHash = `${originalId}_nogroup_${attempt}`;
            }
            break;

          default:
            // Fallback: add attempt number
            inputForHash = `${originalId}_attempt_${attempt}`;
        }
      }

      hash = stringToFourChars(inputForHash);

      if (!usedHashes.has(hash)) {
        usedHashes.add(hash);
        hashMap.set(originalId, hash);
        found = true;
      }

      attempt++;
    }

    // If we still have a collision after all attempts (extremely unlikely with 4 chars)
    if (!found) {
      console.error(
        `Failed to generate unique hash for breed ${originalId} after ${attempt} attempts`,
      );
      // Use original ID as fallback
      hashMap.set(originalId, String(originalId));
    }
  }

  // Log any breeds that needed collision handling
  const collisionHandled = Array.from(hashMap.entries()).filter(
    ([id, hash]) => {
      const baseHash = stringToFourChars(String(id));

      return hash !== baseHash;
    },
  );

  if (collisionHandled.length > 0) {
    console.log(
      `Handled collisions for ${collisionHandled.length} breeds:`,
      collisionHandled.map(([id]) => id),
    );
  }

  return hashMap;
}
