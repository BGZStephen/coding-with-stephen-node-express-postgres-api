const { default: axios } = require("axios")
const { postgres } = require("../db")
const { config } = require("../config")
const { resetDatabase } = require("../test-utils/db-queries")
const { generateUser } = require("../test-utils/user")

describe("user -> create", () => {
  beforeAll(async () => {
    await postgres.connect()
  })

  beforeEach(async () => {
    await resetDatabase()
  })

  afterAll(async () => {
    await postgres.close()
  })

  test("200 - creates a new user", async () => {
    const user = generateUser();

    const res = await axios.post(`${config.API_URL}/users`, user)

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

  test("400 - fails to create a user as a user already exists with that email", async () => {
    const user = generateUser();

    await axios.post(`${config.API_URL}/users`, user)

    try {
      await axios.post(`${config.API_URL}/users`, user)
    } catch (err) {
      expect(err.response).toBeDefined()
      expect(err.response.status).toEqual(400)
      expect(err.response.data).toEqual("Email address is already in use")
    }
  })

  test("400 - fails to create a user if firstName is not provided", async () => {
    const user = generateUser();
    delete user.firstName;

    try {
      await axios.post(`${config.API_URL}/users`, user)
    } catch (err) {
      expect(err.response).toBeDefined()
      expect(err.response.status).toEqual(400)
      expect(err.response.data).toEqual("First name is required")
    }
  })

  test("400 - fails to create a user if lastName is not provided", async () => {
    const user = generateUser();
    delete user.lastName;

    try {
      await axios.post(`${config.API_URL}/users`, user)
    } catch (err) {
      expect(err.response).toBeDefined()
      expect(err.response.status).toEqual(400)
      expect(err.response.data).toEqual("Last name is required")
    }
  })

  test("400 - fails to create a user if email is not provided", async () => {
    const user = generateUser();
    delete user.email;

    try {
      await axios.post(`${config.API_URL}/users`, user)
    } catch (err) {
      expect(err.response).toBeDefined()
      expect(err.response.status).toEqual(400)
      expect(err.response.data).toEqual("Email is required")
    }
  })

  test("400 - fails to create a user if password is not provided", async () => {
    const user = generateUser();
    delete user.password;

    try {
      await axios.post(`${config.API_URL}/users`, user)
    } catch (err) {
      expect(err.response).toBeDefined()
      expect(err.response.status).toEqual(400)
      expect(err.response.data).toEqual("Password is required")
    }
  })

  test("400 - fails to create a user if firstName is not a string", async () => {
    const user = generateUser({
      firstName: 1
    });

    try {
      await axios.post(`${config.API_URL}/users`, user)
    } catch (err) {
      expect(err.response).toBeDefined()
      expect(err.response.status).toEqual(400)
      expect(err.response.data).toEqual("First name must be a string")
    }
  })

  test("400 - fails to create a user if lastName is not a string", async () => {
    const user = generateUser({
      lastName: 1
    });

    try {
      await axios.post(`${config.API_URL}/users`, user)
    } catch (err) {
      expect(err.response).toBeDefined()
      expect(err.response.status).toEqual(400)
      expect(err.response.data).toEqual("Last name must be a string")
    }
  })

  test("400 - fails to create a user if email is not a string", async () => {
    const user = generateUser({
      email: 1
    });

    try {
      await axios.post(`${config.API_URL}/users`, user)
    } catch (err) {
      expect(err.response).toBeDefined()
      expect(err.response.status).toEqual(400)
      expect(err.response.data).toEqual("Email must be a string")
    }
  })

  test("400 - fails to create a user if password is not a string", async () => {
    const user = generateUser({
      password: 1
    });

    try {
      await axios.post(`${config.API_URL}/users`, user)
    } catch (err) {
      expect(err.response).toBeDefined()
      expect(err.response.status).toEqual(400)
      expect(err.response.data).toEqual("Password must be a string")
    }
  })

  test("400 - fails to create a user if password is not strong enough", async () => {
    const user = generateUser({
      password: "1"
    });

    try {
      await axios.post(`${config.API_URL}/users`, user)
    } catch (err) {
      expect(err.response).toBeDefined()
      expect(err.response.status).toEqual(400)
      expect(err.response.data).toEqual("Password is not strong enough")
    }
  })

  test("400 - fails to create a user if email is not a valid email address", async () => {
    const user = generateUser({
      email: "john.doe"
    });

    try {
      await axios.post(`${config.API_URL}/users`, user)
    } catch (err) {
      expect(err.response).toBeDefined()
      expect(err.response.status).toEqual(400)
      expect(err.response.data).toEqual("Email is not valid")
    }
  })

  test("400 - fails to create a user if the body is not an object", async () => {
    const user = []

    try {
      await axios.post(`${config.API_URL}/users`, user)
    } catch (err) {
      expect(err.response).toBeDefined()
      expect(err.response.status).toEqual(400)
      expect(err.response.data).toEqual("Body must be a valid object")
    }
  })
})