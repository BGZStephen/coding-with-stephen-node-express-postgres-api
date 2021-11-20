const { HTTPError } = require("../errors/http-error");
const { UserHandlers } = require("./handlers");

jest.mock("bcryptjs")
jest.mock("./store")
jest.mock("../authentication-token/generator")

beforeEach(() => {
  jest.resetAllMocks();
});

describe("handlers", () => {
  describe("createUser", () => {
    test("When an existing user is found, throws an HTTPError", async () => {
      const user = {
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@test.com",
        password: "Password123!"
      }

      require("./store").UserStore.getUserByEmail.mockResolvedValue(user);

      const req = {
        body: user
      }

      await expect(UserHandlers.createUser(req)).rejects.toThrow(new HTTPError(400, "Email address is already in use"))
    })

    test("When an existing user is not found, creates a user with a hashed password", async () => {
      const user = {
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@test.com",
        password: "Password123!"
      }

      const createdUser = {
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@test.com",
        password: "HASHED_PASSWORD"
      }

      require("../authentication-token/generator").createAuthenticationToken.mockResolvedValue({userId: 1, token: "authentication-token"})
      require("./store").UserStore.getUserByEmail.mockResolvedValue(null);
      require("./store").UserStore.insertUser.mockResolvedValue(createdUser);
      require("bcryptjs").hashSync.mockReturnValue("HASHED_PASSWORD");

      const req = {
        body: user
      }

      await expect(UserHandlers.createUser(req)).resolves.toEqual({user: createdUser, token: "authentication-token"})
      expect(require("./store").UserStore.insertUser).toHaveBeenCalledWith(createdUser)
      expect(require("bcryptjs").hashSync).toHaveBeenCalledTimes(1)
    })
  })

  describe("authenticateUser", () => {
    test("Throws an error if the email provided does not match a user in our database", () => {
      const user = {
        email: "john.smith@test.com",
        password: "Password123!"
      }

      const req = {
        body: {
          email: user.email,
          password: user.password
        }
      }

      require("./store").UserStore.getUserByEmail.mockResolvedValue(undefined)

      expect(UserHandlers.authenticateUser(req)).rejects.toThrow(new HTTPError(400, "Invalid email address or password"))
    })

    test("Throws an error if the password provided does not match a found users password in our database", () => {
      const user = {
        email: "john.smith@test.com",
        password: "Password123!"
      }

      const req = {
        body: {
          email: user.email,
          password: user.password
        }
      }

      require("./store").UserStore.getUserByEmail.mockResolvedValue(user)
      require("bcryptjs").compareSync.mockReturnValue(false)

      expect(UserHandlers.authenticateUser(req)).rejects.toThrow(new HTTPError(400, "Invalid email address or password"))
    })

    test("Returns an authentication token and a user, when all checks pass", async () => {
      const user = {
        email: "john.smith@test.com",
        password: "Password123!"
      }

      const req = {
        body: {
          email: user.email,
          password: user.password
        }
      }

      require("./store").UserStore.getUserByEmail.mockResolvedValue(user)
      require("bcryptjs").compareSync.mockReturnValue(true)
      require("../authentication-token/generator").createAuthenticationToken.mockResolvedValue({token: "authentication-token"})

      const res = await UserHandlers.authenticateUser(req)
      
      expect(res.token).toBe("authentication-token")
      expect(res.user).toEqual(user)
    })
  })
})