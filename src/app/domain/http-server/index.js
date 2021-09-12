const express = require("express")
const cors = require("cors")
const { config } = require("../config")
const { logger } = require("../logger");
const { httpErrorResponseHandler } = require("../middleware/http-error-response-handler");
const { userRouter } = require("../user/routes");

class AppHttpServerFactory {
  port = config.EXPRESS_PORT;

  start() {
    return new Promise((resolve) => {
      const app = express();

      app.use(cors())
      app.use(express.json())

      app.use("/", userRouter)

      app.use(httpErrorResponseHandler)

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