const { AppStarter } = require(".")

jest.mock("../config")
jest.mock("../http-server")
jest.mock("../db")

beforeEach(() => {
  jest.clearAllMocks();  
})

describe("Startup", () => {
  describe("AppStarter", () => {
    test("When startServices is called, validateEnvProvidedConfig is called, returning undefined", async () => {
      const res = await AppStarter.startServices();

      expect(require("../config").validateEnvProvidedConfig).toHaveBeenCalled()
      expect(require("../http-server").AppHttpServer.start).toHaveBeenCalled()
      expect(res).toBe(undefined)
    })
  })
})