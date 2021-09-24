const { asyncwrap } = require("./async-wrap")

beforeEach(() => {
  jest.resetAllMocks();
});

describe("async-wrap", () => {
  describe("asyncwrap", () => {
    test("wraps and calls an async function with a catch", () => {
      const catchSpy = jest.fn()
      const fnSpy = jest.fn().mockReturnValue({
        catch: catchSpy
      })

      const wrappedFunction = asyncwrap(fnSpy)
      const res = wrappedFunction(null, null, null);

      expect(wrappedFunction).toBeDefined()
      expect(res).toBe(undefined)
      expect(fnSpy).toHaveBeenCalled()
      expect(catchSpy).toHaveBeenCalled()
    })
  })
})