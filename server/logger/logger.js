const winston = require("winston");
require("winston-daily-rotate-file");

const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;

const myFormat = printf(info => {
  return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

const infotransport = new winston.transports.DailyRotateFile({
  filename: "/Users/axie/desktop/foodbot-application/server/logger/info.log",
  datePattern: "yyyy-MM-dd.",
  prepend: true,
  level: "info"
});

const errorTransport = new winston.transports.DailyRotateFile({
  filename: "/Users/axie/desktop/foodbot-application/server/logger/error.log",
  datePattern: "yyyy-MM-dd.",
  prepend: true,
  level: "error"
});

const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), myFormat),
  transports: [infotransport, errorTransport]
});

// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

module.exports = { logger };
