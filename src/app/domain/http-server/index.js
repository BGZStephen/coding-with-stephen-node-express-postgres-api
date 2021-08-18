const express = require("express")
const cors = require("cors")
const { config } = require("../config")

class AppHttpServerFactory {
  port = config.EXPRESS_PORT;

  start() {
    return new Promise((resolve) => {
      const app = express();

      app.use(cors())
      app.use(express.json())

      app.listen(this.port, () => {
        console.log(`HTTP Server started on port ${this.port}`)

        resolve()
      })
    })
  }
}

module.exports = {
  AppHttpServer: new AppHttpServerFactory()
}