const distance = require("google-distance");

const getDistance = destination => {
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
          resolve(data.distance);
        }
      }
    );
  });
};



module.exports = {getDistance};