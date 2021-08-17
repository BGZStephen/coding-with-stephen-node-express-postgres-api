const { validateEnvProvidedConfig } = require("../config")
const { AppHttpServer } = require("../http-server")

class AppStarter {
  static async startServices() {
    console.log("Preparing environment variables")

    validateEnvProvidedConfig();

    console.log("Starting services for application")

    await AppHttpServer.start()

    console.log("All services started for application")
  }
}

module.exports = {
  AppStarter
}