require("@testing-library/jest-dom");

// Add TextEncoder/TextDecoder for React Router v7
const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock import.meta for Vite-specific code
global.importMeta = {
  env: {
    DEV: true,
    VITE_LOG_LEVEL: "debug",
    VITE_AMPLITUDE_API_KEY: "test-api-key",
  },
};
