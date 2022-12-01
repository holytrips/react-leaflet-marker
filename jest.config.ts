/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!react-leaflet)"],
  testMatch: ["**/tests/**/*.test.tsx", "**/tests/**/*.test.ts"],
  testEnvironment: "jsdom",
  modulePathIgnorePatterns: ["node_modules", "jest-test-results.json"],
  moduleNameMapper: {
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules",
  },
};
