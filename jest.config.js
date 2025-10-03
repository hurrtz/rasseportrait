import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export default {
  testEnvironment: "node",
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  transform: {
    ...tsJestTransformCfg,
  },
  moduleNameMapper: {
    "^~/(.*)$": "<rootDir>/app/$1",
  },
};
