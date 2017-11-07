const winston = require("winston");

const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;

const myFormat = printf(info => {
  return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), myFormat),

  transports: [
    new winston.transports.File({
      filename:
        "/Users/axie/desktop/foodbot-application/server/logger/error.log",
      level: "error"
    }),
    new winston.transports.File({
      filename:
        "/Users/axie/desktop/foodbot-application/server/logger/info.log",
      level: "info"
    })
  ]
});

if (process.env.NODE_ENV == "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

module.exports = { logger };
