const express = require("express")
const { UserRouter } = require("./routes")
const { generateUser } = require("../test-utils/user")

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
        const user = generateUser();
        delete user.password;

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

      test("When validation passes, call UserHandlers.createUser", async () => {
        const user = generateUser();

        const req = {
          body: user
        }

        const jsonSpy = jest.fn()
        const res = {
          json: jsonSpy
        }

        require("./handlers").UserHandlers.createUser.mockResolvedValue({token: "", user: {}})

        const userCreateResponse = await userRouter.createUser(req, res)

        expect(userCreateResponse).toBe(undefined)
        expect(jsonSpy).toHaveBeenCalled()
        expect(require("./handlers").UserHandlers.createUser).toHaveBeenCalledWith(req)
      })
    })

    describe("authenticateUser", () => {
      test("throws an error if email address is not present in the request", () => {
        const userAuthenticationParams = {}
        const jsonSpy = jest.fn()
        const req = {
          body: userAuthenticationParams
        }
        const res = {
          json: jsonSpy
        }

        expect(userRouter.authenticateUser(req, res)).rejects.toThrow("Email is required. Password is required")
        expect(res.json).not.toHaveBeenCalled()
      })

      test("throws an error if email address is not a string in the request", () => {
        const userAuthenticationParams = {
          email: 1
        }
        const jsonSpy = jest.fn()
        const req = {
          body: userAuthenticationParams
        }
        const res = {
          json: jsonSpy
        }

        expect(userRouter.authenticateUser(req, res)).rejects.toThrow("Email must be a string. Password is required")
        expect(res.json).not.toHaveBeenCalled()
      })

      test("throws an error if password is not present in the request", () => {
        const userAuthenticationParams = {
          email: "joe.bloggs@test.com"
        }
        const jsonSpy = jest.fn()
        const req = {
          body: userAuthenticationParams
        }
        const res = {
          json: jsonSpy
        }

        expect(userRouter.authenticateUser(req, res)).rejects.toThrow("Password is required")
        expect(res.json).not.toHaveBeenCalled()
      })

      test("throws an error if password is not a string in the request", () => {
        const userAuthenticationParams = {
          email: "joe.bloggs@test.com",
          password: 1
        }
        const jsonSpy = jest.fn()
        const req = {
          body: userAuthenticationParams
        }
        const res = {
          json: jsonSpy
        }

        expect(userRouter.authenticateUser(req, res)).rejects.toThrow("Password must be a string")
        expect(res.json).not.toHaveBeenCalled()
      })

      test("calls res.json with a user / token once validation has passed", async () => {
        const userAuthenticationParams = {
          email: "joe.bloggs@test.com",
          password: "validPassword"
        }

        const jsonSpy = jest.fn()

        const req = {
          body: userAuthenticationParams
        }

        const res = {
          json: jsonSpy
        }

        require("./handlers").UserHandlers.authenticateUser.mockResolvedValue({token: "", user: {}})

        const userAuthenticateResponse = await userRouter.authenticateUser(req, res)

        expect(userAuthenticateResponse).toBe(undefined)
        expect(jsonSpy).toHaveBeenCalled()
        expect(require("./handlers").UserHandlers.authenticateUser).toHaveBeenCalledWith(req)
      })
    })
  })
})