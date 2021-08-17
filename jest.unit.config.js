const baseConfig = require("./jest.config");

module.exports = {
  ...baseConfig,
  testRegex: "\\.unit.test\\.(js|ts)$",
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
};
