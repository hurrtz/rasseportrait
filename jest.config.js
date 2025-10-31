import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export default {
  testEnvironment: "jsdom",
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          verbatimModuleSyntax: false,
          module: "esnext",
          target: "esnext",
        },
      },
    ],
  },
  globals: {
    "import.meta": {
      env: {
        DEV: true,
        VITE_LOG_LEVEL: "debug",
        VITE_AMPLITUDE_API_KEY: "test-api-key",
      },
    },
  },
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/app/$1",
    "\\.(css|less|scss|sass)$": "<rootDir>/__mocks__/styleMock.js",
    "^react-player$": "<rootDir>/__mocks__/react-player.js",
  },
  transformIgnorePatterns: ["node_modules/(?!(@amplitude|react-player)/)"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/__tests__/fixtures\\.(ts|tsx|js|jsx)$",
  ],
};
