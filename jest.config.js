export default {
  // eslint-disable-next-line no-undef
  preset: "ts-jest",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts", "!**/node_modules/**"],
  coveragePathIgnorePatterns: [
    "/node-modules/",
    "/src/components/ui/",
    "/src/lib/",
  ],

  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Support alias '@/'
  },
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
};
