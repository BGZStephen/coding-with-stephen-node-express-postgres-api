const { TestWatcher } = require("jest");
const { logFormatter } = require(".")

beforeEach(() => {
  jest.clearAllMocks();  
})

describe("logger", () => {
  describe("logFormatter", () => {
    test("Given a set of parameters, returns a formatted string", () => {
      const params = {
        timestamp: new Date().toISOString(),
        level: "info",
        message: "message"
      }

      const res = logFormatter(params)

      expect(res).toEqual(`${params.timestamp} [${params.level}]: ${params.message}`)
    })
  })
})