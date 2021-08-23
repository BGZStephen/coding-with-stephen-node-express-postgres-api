const { validateEnvProvidedConfig } = require("../config")
const { AppHttpServer } = require("../http-server")
const { logger } = require("../logger")

class AppStarter {
  static async startServices() {
    logger.info("Preparing environment variables")

    validateEnvProvidedConfig();

    logger.info("Starting services for application")

    await AppHttpServer.start()

    logger.info("All services started for application")
  }
}

module.exports = {
  AppStarter
}