const { validateThrow } = require("./validation")
const Joi = require("@hapi/joi")
const { HTTPError } = require("../errors/http-error")

describe("validation", () => {
  describe("validateThrow", () => {
    test("throws no error if validation passes", () => {
      const schema = Joi.object().keys({
        firstName: Joi.string()
      })

      const data = {
        firstName: "stephen"
      }

      expect(validateThrow(data, schema)).toBe(undefined)
    })

    test("throws an error when a single field fails validation", () => {
      const schema = Joi.object().keys({
        firstName: Joi.string().required()
      })

      const data = {
        firstName: null
      }

      expect(() => validateThrow(data, schema)).toThrow(new HTTPError(400, '"firstName" must be a string'))
    })

    test("throws an error when multiple fields failing validation", () => {
      const schema = Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required()
      })

      const data = {
        firstName: null,
        lastName: null
      }

      expect(() => validateThrow(data, schema)).toThrow(new HTTPError(400, '"firstName" must be a string. "lastName" must be a string'))
    })
  })
})