const winston = require("winston");
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;
const serializeError = require("serialize-error");

const myFormat = printf(info => {
  return `${info.timestamp}: ${info.level}: ${info.message}: ${JSON.stringify(
    serializeError(info.err)
  ) || "Entered"}`;
});

function expandErrors(logger) {
  var oldLogFunc = logger.log;
  logger.log = function() {
    var args = Array.prototype.slice.call(arguments, 0);
    if (args.length >= 2 && args[1] instanceof Error) {
      args[1] = args[1].stack;
    }
    return oldLogFunc.apply(this, args);
  };
  return logger;
}

const logger = expandErrors(
  winston.createLogger({
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
    ],
    exceptionHandlers: [
      new transports.File({
        filename:
          "/Users/axie/desktop/foodbot-application/server/logger/exceptions.log"
      })
    ]
  })
);

if (process.env.NODE_ENV != "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple()
    })
  );
}

module.exports = { logger };
