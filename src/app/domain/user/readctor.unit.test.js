const { redactUser } = require("./redactor")

describe("redactor", () => {
  describe("redactUser", () => {
    test("Returns a user with only the expected fields", () => {
      const user = {
        id: 1,
        firstName: "john",
        lastName: "doe",
        email: "john.doe@test.com",
        password: "Password123!",
        createdAt: new Date().toISOString(),
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