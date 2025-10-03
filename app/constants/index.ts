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
export const SEARCH_PLACEHOLDER = "Suche nach Rassenamen oder FCI-Nummern";

/**
 * ARIA label for the breed search input
 */
export const SEARCH_ARIA_LABEL = "Search for dog breeds by name or FCI number";

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

/**
 * Initial search needle value
 */
export const DEFAULT_SEARCH_NEEDLE = "";

/**
 * Initial search results value
 */
export const DEFAULT_SEARCH_RESULTS: never[] = [];

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

/**
 * Error message for failed breed initialization
 */
export const ERROR_INIT_FAILED = "Failed to initialize breeds";

// ============================================================================
// Loading & UI States
// ============================================================================

/**
 * Loading spinner size in pixels
 */
export const LOADING_SPINNER_SIZE = 100;

/**
 * Loading message displayed while breeds are being loaded
 */
export const LOADING_MESSAGE = "Lädt Daten...";

// ============================================================================
// Keyboard Navigation
// ============================================================================

/**
 * Key codes for keyboard navigation
 */
export const KEY_ENTER = "Enter";
export const KEY_SPACE = " ";
export const KEY_ESCAPE = "Escape";

// ============================================================================
// Accessibility
// ============================================================================

/**
 * Tab index for focusable elements
 */
export const TAB_INDEX_FOCUSABLE = 0;

/**
 * Tab index for non-focusable elements
 */
export const TAB_INDEX_NOT_FOCUSABLE = -1;

/**
 * Role for clickable card elements
 */
export const ROLE_BUTTON = "button";

/**
 * Role for search input elements
 */
export const ROLE_SEARCHBOX = "searchbox";
