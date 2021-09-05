const { HTTPError } = require("./http-error");

describe("http-error", () =>{
  describe("HTTPError", () => {
    test("When creating an HTTPError, we get a statusCode and a message available on the HTTPError", () => {
      const res = new HTTPError(403, "Unauthorized");

      expect(res.statusCode).toBe(403)
      expect(res.message).toBe("Unauthorized")
    }) 
  })
})