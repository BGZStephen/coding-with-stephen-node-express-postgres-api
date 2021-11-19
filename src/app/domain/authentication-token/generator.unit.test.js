const { createAuthenticationToken } = require("./generator")

jest.mock("./store")

beforeEach(() => {
  jest.resetAllMocks();
});

describe("generator", () => {
  describe("createAuthenticationToken", () => {
    test("insertToken is called with the generated topken and passed userId", async () => {
      const userId = 1;

      await createAuthenticationToken(userId)

      expect(require("./store").AuthenticationTokenStore.insertToken).toHaveBeenCalledWith({
        userId,
        token: expect.stringMatching(/[A-Za-z0-9\-]{36}/)
      })
    })
  })
})