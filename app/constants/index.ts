/**
 * Application-wide constants
 */

// ============================================================================
// Search & Input
// ============================================================================

/**
 * Debounce delay for search input in milliseconds
 * Prevents excessive API calls or filtering operations while user is typing
 */
export const SEARCH_DEBOUNCE_DELAY_MS = 300;

/**
 * Placeholder text for the breed search input
 */
export const SEARCH_PLACEHOLDER = "Rasse oder FCI-Nummer";

/**
 * ARIA label for the breed search input
 */
export const SEARCH_ARIA_LABEL = "Rassen durchsuchen";

// ============================================================================
// Store Configuration
// ============================================================================

/**
 * Name for the Zustand devtools store
 */
export const BREEDS_STORE_NAME = "BreedsStore";

/**
 * Initial sort field for breeds display
 */
export const DEFAULT_SORT_BY = "airDate" as const;

/**
 * Initial sort order for breeds display
 */
export const DEFAULT_SORT_ORDER = "desc" as const;

// ============================================================================
// Error Messages
// ============================================================================

/**
 * Error message when no breeds are found in the database
 */
export const ERROR_NO_BREEDS_FOUND = "No breeds found in database";

/**
 * Generic error message for unknown errors
 */
export const ERROR_UNKNOWN = "Unknown error";

// ============================================================================
// Loading & UI States
// ============================================================================

/**
 * Loading message displayed while breeds are being loaded
 */
export const LOADING_MESSAGE = "Rassen werden geladen …";

// ============================================================================
// Assets & Navigation
// ============================================================================

/**
 * Base path of the deployed app; asset URLs must be absolute because detail
 * pages live one level deeper (/rasse/:slug)
 */
export const BASE_PATH = "/rasseportrait/";

/**
 * Pages in the main navigation, with the analytics event of each link
 */
export const NAV_ITEMS = [
  { label: "Portraits", to: "/", event: "Rasseportrait Clicked" },
  { label: "Hundewissen", to: "/hundewissen", event: "Hundewissen Clicked" },
  { label: "Statistik", to: "/statistiken", event: "Statistics Clicked" },
  { label: "Impressum", to: "/impressum", event: "Impressum Clicked" },
] as const;
