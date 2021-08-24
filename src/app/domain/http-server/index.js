const express = require("express")
const cors = require("cors")
const { config } = require("../config")
const { logger } = require("../logger")

class AppHttpServerFactory {
  port = config.EXPRESS_PORT;

  start() {
    return new Promise((resolve) => {
      const app = express();

      app.use(cors())
      app.use(express.json())

      app.listen(this.port, () => {
        logger.info(`HTTP Server started on port ${this.port}`)

        resolve()
      })
    })
  }
}

module.exports = {
  AppHttpServer: new AppHttpServerFactory()
}