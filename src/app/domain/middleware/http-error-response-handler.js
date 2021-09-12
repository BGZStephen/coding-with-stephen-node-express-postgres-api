const { HTTPError } = require("../errors/http-error")
const { logger } = require("../logger/index")

function httpErrorResponseHandler(err, req, res, next) {
  logger.error("API Error: %o", err.message)

  if (err instanceof HTTPError) {
    return res.status(err.statusCode).send(err.message)
  }

  return res.status(500).send("Something went wrong")
}

module.exports = {
  httpErrorResponseHandler
}