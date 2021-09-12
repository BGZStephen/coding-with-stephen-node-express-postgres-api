const { httpErrorResponseHandler } = require("./http-error-response-handler")
const { HTTPError } = require("../errors/http-error")

describe("http-error-response-handler", () => {
  describe("httpErrorResponseHandler", () => {
    test("When an HTTPError is sent, a response is sent with the custom error statusCode and message", () => {
      const resSendSpy = jest.fn()
      const resStatusSpy = jest.fn().mockReturnValue({
        send: resSendSpy
      })

      const err = new HTTPError(400, "First name is required")
      const req = {}
      const res = {
        status: resStatusSpy
      }
      const next = () => undefined
      
      httpErrorResponseHandler(err, req, res, next)

      expect(resStatusSpy).toHaveBeenCalledWith(400)
      expect(resSendSpy).toHaveBeenCalledWith("First name is required")
    })

    test("When an Error is sent, a response is sent with the 500 statusCode and a generic message", () => {
      const resSendSpy = jest.fn()
      const resStatusSpy = jest.fn().mockReturnValue({
        send: resSendSpy
      })

      const err = new Error("First name is required")
      const req = {}
      const res = {
        status: resStatusSpy
      }
      const next = () => undefined
      
      httpErrorResponseHandler(err, req, res, next)

      expect(resStatusSpy).toHaveBeenCalledWith(500)
      expect(resSendSpy).toHaveBeenCalledWith("Something went wrong")
    })
  })
})