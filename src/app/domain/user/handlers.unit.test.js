const { HTTPError } = require("../errors/http-error");
const { UserHandlers } = require("./handlers");

jest.mock("bcryptjs")
jest.mock("./store")

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

      require("./store").UserStore.getUserByEmail.mockResolvedValue(null);
      require("./store").UserStore.insertUser.mockResolvedValue(createdUser);
      require("bcryptjs").hashSync.mockReturnValue("HASHED_PASSWORD");

      const req = {
        body: user
      }

      await expect(UserHandlers.createUser(req)).resolves.toEqual(createdUser)
      expect(require("./store").UserStore.insertUser).toHaveBeenCalledWith(createdUser)
      expect(require("bcryptjs").hashSync).toHaveBeenCalledTimes(1)
    })
  })
})