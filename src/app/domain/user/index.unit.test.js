const { UserStore } = require("./store")

jest.mock("../db")

beforeEach(() => {
  jest.resetAllMocks();
});

describe("UserStore", () => {
  describe("insertUser", () => {
    test("Calls query with the correct parameters in the expected order", async () => {
      const user = {
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@test.com",
        password: "Password123!"
      }

      const dbSendMock = require("../db").postgres.client.query.mockResolvedValue({ rows: [user] });

      const res = await UserStore.insertUser(user);

      const functionInputs = dbSendMock.mock.calls[0]

      expect(functionInputs[0]).toEqual('INSERT INTO users("firstName", "lastName", email, password) VALUES($1, $2, $3, $4) RETURNING *')

      expect(functionInputs[1][0]).toEqual(user.firstName)
      expect(functionInputs[1][1]).toEqual(user.lastName)
      expect(functionInputs[1][2]).toEqual(user.email)
      expect(functionInputs[1][3]).toEqual(user.password)

      expect(res).toEqual(user)
      expect(require("../db").postgres.client.query).toHaveBeenCalledTimes(1)
    })
  })
})