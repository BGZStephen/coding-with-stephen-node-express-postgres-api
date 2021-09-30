const baseConfig = require("./jest.config");

module.exports = {
  ...baseConfig,
  testRegex: "\\.integration.test\\.(js|ts)$",
};
