module.exports = {
  testEnvironment: "node",
  modulePaths: ["<rootDir>/src"],
  testRegex: "\\.test\\.(js|ts)$",
  moduleFileExtensions: ["ts", "js", "json", "node"],
  testPathIgnorePatterns: ["/_mocks_/", "/node_modules/"],
  coveragePathIgnorePatterns: ["/_mocks_/", "tests/"],
};
