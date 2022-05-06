const { AuthenticationTokenStore } = require("./store")

jest.mock("../db")

beforeEach(() => {
  jest.resetAllMocks();
});

describe("AuthenticationTokenStore", () => {
  describe("insertToken", () => {
    test("Calls query with the correct parameters in the expected order", async () => {
      const authenticationTokenParams = {
        userId: 1,
        token: "randomToken"
      }

      const dbSendMock = require("../db").postgres.client.query.mockResolvedValue({ rows: [authenticationTokenParams] });

      const res = await AuthenticationTokenStore.insertToken(authenticationTokenParams);

      const functionInputs = dbSendMock.mock.calls[0]

      expect(functionInputs[0]).toEqual('INSERT INTO "authentication-tokens"("userId", token) VALUES($1, $2) ON CONFLICT ON CONSTRAINT "authentication-tokens_userId_key" DO UPDATE SET token = $2 RETURNING *')

      expect(functionInputs[1][0]).toEqual(authenticationTokenParams.userId)
      expect(functionInputs[1][1]).toEqual(authenticationTokenParams.token)

      expect(res).toEqual(authenticationTokenParams)
      expect(require("../db").postgres.client.query).toHaveBeenCalledTimes(1)
    })
  })

  describe("getToken", () => {
    test("Calls query with the correct parameters in the expected order", async () => {
      const authenticationToken = {
        userId: 1,
        token: "randomToken"
      }

      const dbSendMock = require("../db").postgres.client.query.mockResolvedValue({ rows: [authenticationToken] });

      const res = await AuthenticationTokenStore.getToken(authenticationToken.token);

      const functionInputs = dbSendMock.mock.calls[0]

      expect(functionInputs[0]).toEqual('SELECT * FROM "authentication-tokens" WHERE token = $1')

      expect(functionInputs[1][0]).toEqual(authenticationToken.token)

      expect(res).toEqual(authenticationToken)
      expect(require("../db").postgres.client.query).toHaveBeenCalledTimes(1)
    })
  })

  describe("deleteToken", () => {
    test("Calls query with the correct parameters in the expected order", async () => {
      const userId = 1;

      const dbSendMock = require("../db").postgres.client.query.mockResolvedValue({ rows: [] });

      const res = await AuthenticationTokenStore.deleteTokenForUser(userId);

      const functionInputs = dbSendMock.mock.calls[0]

      expect(functionInputs[0]).toEqual('DELETE FROM "authentication-tokens" WHERE "userId" = $1')

      expect(functionInputs[1][0]).toEqual(userId)

      expect(res).toEqual(undefined)
      expect(require("../db").postgres.client.query).toHaveBeenCalledTimes(1)
    })
  })
})