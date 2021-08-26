const { validateEnvProvidedConfig } = require(".")

jest.mock("../logger")

beforeEach(() => {
  jest.clearAllMocks();  
})

describe("Config", () => {
  describe("validateEnvProvidedConfig", () => {
    test("Calls process.exit with a value of 1 if there are missing environment variables", () => {
      const process = global.process;

      global.process = {
        exit: jest.fn(),
        env: {}
      }

      validateEnvProvidedConfig();

      expect(global.process.exit).toHaveBeenCalledWith(1)

      global.process = process;
    })

    test("Returns undefined when no missing variables are found", () => {
      const process = global.process;

      global.process = {
        exit: jest.fn(),
        env: {
          ENV: "dev",
          EXPRESS_PORT: "3000",
          SECRET: "secret",
          API_URL: "http://localhost:3000",
          POSTGRES_DATABASE: "postgres",
          POSTGRES_USER: "postgres",
          POSTGRES_PASSWORD: "postgres",
          POSTGRES_HOST: "localhost",
          POSTGRES_PORT: "5432"
        }
      }

      const res = validateEnvProvidedConfig();

      expect(global.process.exit).not.toHaveBeenCalled();
      expect(res).toBe(undefined);

      global.process = process;
    })
  })
})