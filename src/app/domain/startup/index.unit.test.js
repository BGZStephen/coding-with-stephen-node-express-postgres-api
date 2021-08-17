const { AppStarter } = require(".")

jest.mock("../config")

describe("Startup", () => {
  describe("AppStarter", () => {
    test("When startServices is called, validateEnvProvidedConfig is called, returning undefined", () => {
      const res = AppStarter.startServices();

      expect(require("../config").validateEnvProvidedConfig).toHaveBeenCalled()
      expect(res).toBe(undefined)
    })
  })
})