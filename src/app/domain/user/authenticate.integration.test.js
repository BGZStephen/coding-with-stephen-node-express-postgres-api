const { default: axios } = require("axios")
const { postgres } = require("../db")
const { config } = require("../config")
const { resetDatabase } = require("../test-utils/db-queries")
const { generateUser } = require("../test-utils/user")

describe("user -> authenticate", () => {
  beforeAll(async () => {
    await postgres.connect()
  })

  beforeEach(async () => {
    await resetDatabase()
  })

  afterAll(async () => {
    await postgres.close()
  })

  test("200 - authenticates a user", async () => {
    const user = generateUser();

    await axios.post(`${config.API_URL}/users`, user)

    const res = await axios.post(`${config.API_URL}/users/authenticate`, {
      email: user.email,
      password: user.password
    })

    expect(res.status).toEqual(200)
    expect(res.data).toEqual({
      user: {
        id: expect.any(Number),
        firstName: "john",
        lastName: "doe",
        email: "john.doe@test.com",
        createdAt: expect.stringMatching(/\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/)
      },
      token: expect.stringMatching(/[A-Za-z0-9\-]{36}/)
    })
  })

  test("400 - submitted email address does not match any users", async () => {
    try {
      await axios.post(`${config.API_URL}/users/authenticate`, {
        email: "joe.bloggs@test.com",
        password: "invalidPassword"
      })
    } catch (err) {
      expect(err.response).toBeDefined()
      expect(err.response.status).toEqual(400)
      expect(err.response.data).toEqual("Invalid email address or password")
    }
  })

  test("400 - submitted password does not match that of the user", async () => {
    const user = generateUser();

    await axios.post(`${config.API_URL}/users`, user)

    try {
      await axios.post(`${config.API_URL}/users/authenticate`, {
        email: user.email,
        password: "invalidPassword"
      })
    } catch (err) {
      expect(err.response).toBeDefined()
      expect(err.response.status).toEqual(400)
      expect(err.response.data).toEqual("Invalid email address or password")
    }
  })
})