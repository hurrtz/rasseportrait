require("@testing-library/jest-dom");

// Mock import.meta for Vite-specific code
global.importMeta = {
  env: {
    DEV: true,
    VITE_LOG_LEVEL: "debug",
    VITE_AMPLITUDE_API_KEY: "test-api-key",
  },
};
