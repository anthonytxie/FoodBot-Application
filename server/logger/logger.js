const winston = require("winston");

const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;

const myFormat = printf(info => {
  return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});


const logger = winston.createLogger({
  level: "info",
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: "/Users/axie/desktop/foodbot-application/server/logger/error.log", level: "error" }),
    new winston.transports.File({ filename: "/Users/axie/desktop/foodbot-application/server/logger/info.log", level:"info" })
  ]
});


// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

module.exports = {logger} ;
