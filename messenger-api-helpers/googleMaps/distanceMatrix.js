const distance = require("google-distance");
const maxDeliveryRange = 7;

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
          if (parseFloat(data.distance.split(" ")[0]) < 7) {
            resolve(data.distance.split(" ")[0]);
          } else {
            resolve(data.distance.split(" ")[0]);
          }
        }
      }
    );
  });
};



module.exports = { isInDeliveryRange };
