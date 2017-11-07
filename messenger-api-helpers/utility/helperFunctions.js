const distance = require("google-distance");
const maxDeliveryRange = 7;
const { logger } = require("./../../server/logger/logger");
const moment = require("moment");
const tz = require("moment-timezone");

const isInDeliveryRange = destination => {
  return new Promise((resolve, reject) => {
    distance.get(
      {
        origin: "42.991555, -81.251408",
        destination: `${destination}, Ontario, Canada`
      },
      function(err, data) {
        if (err) {
          reject(err);
        } else {
          if (parseFloat(data.distance[0]) < 7) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      }
    );
  });
};
const isStoreOpen = () => {
  let myTimezone = "America/Toronto";
  let currentHour = parseFloat(
    moment(new Date())
      .tz(myTimezone)
      .format("HH")
  );
  logger.info(`isStoreOpen the hour is currently ${currentHour}`);
  if (currentHour < 11 || currentHour >= 23) {
    return false;
  } else {
    return true;
  }
}

module.exports = { isInDeliveryRange, isStoreOpen };
