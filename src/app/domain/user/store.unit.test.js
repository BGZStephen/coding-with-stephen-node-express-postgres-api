const { UserStore } = require("./store")
const { generateUser } = require("../test-utils/user")

jest.mock("../db")

beforeEach(() => {
  jest.resetAllMocks();
});

describe("UserStore", () => {
  describe("insertUser", () => {
    test("Calls query with the correct parameters in the expected order", async () => {
      const user = generateUser();

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

  describe("getUserByEmail", () => {
    test("Calls query with the correct parameters", async () => {
      const user = generateUser();

      const dbSendMock = require("../db").postgres.client.query.mockResolvedValue({ rows: [user] });

      const res = await UserStore.getUserByEmail(user.email);

      const functionInputs = dbSendMock.mock.calls[0]

      expect(functionInputs[0]).toEqual('SELECT * FROM users WHERE email = $1')

      expect(functionInputs[1][0]).toEqual(user.email)

      expect(res).toEqual(user)
      expect(require("../db").postgres.client.query).toHaveBeenCalledTimes(1)
    })
  })
})