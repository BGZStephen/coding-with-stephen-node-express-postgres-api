const winston = require("winston")

function logFormatter(params) {
  return `${params.timestamp} [${params.level}]: ${params.message}`
}

function createLogger() {
  winston.addColors({
    error: "red",
    warn: "darkred",
    info: "cyan",
    debug: "gray"
  })

  return winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "http-api" },
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp(),
          winston.format.splat(),
          winston.format.printf(logFormatter)
        )
      })
    ]
  })
}

module.exports = {
  logFormatter,
  logger: createLogger()
}