const { redactUser } = require("./redactor")
const { generateUser } = require("../test-utils/user")

describe("redactor", () => {
  describe("redactUser", () => {
    test("Returns a user with only the expected fields", () => {
      const user = {
        id: 1,
        createdAt: new Date().toISOString(),
        ...generateUser()
      }

      const res = redactUser(user)

      expect(res).toEqual({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        createdAt: user.createdAt,
      })
      expect(res.password).toBe(undefined)
    })
  })
})