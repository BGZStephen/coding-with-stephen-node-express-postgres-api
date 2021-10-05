const express = require("express")
const { UserRouter } = require("./routes")

jest.mock("./handlers")
jest.mock("./redactor")

beforeEach(() => {
  jest.resetAllMocks();
});

describe("routes", () => {
  describe("UserRouter", () => {
    const userRouter = new UserRouter(express.Router())

    describe("createUser", () => {
      test("throws an error if a required property is not present in the request", () => {
        const user = {
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@test.com"
        }

        const req = {
          body: user
        }

        const jsonSpy = jest.fn()
        const res = {
          json: jsonSpy
        }

        expect(userRouter.createUser(req, res)).rejects.toThrowError("Password is required")
        expect(jsonSpy).not.toHaveBeenCalled()
      })

      test("throws an error if a required property is not present in the request", async () => {
        const user = {
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@test.com",
          password: "Password123!"
        }

        const req = {
          body: user
        }

        const jsonSpy = jest.fn()
        const res = {
          json: jsonSpy
        }

        const userCreateResponse = await userRouter.createUser(req, res)

        expect(userCreateResponse).toBe(undefined)
        expect(jsonSpy).toHaveBeenCalled()
        expect(require("./handlers").UserHandlers.createUser).toHaveBeenCalledWith(req)
      })
    })
  })
})