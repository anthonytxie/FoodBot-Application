const { Burger, Fry, Drink, Milkshake, Order, Session } = require("./../index");
const milkshakeDAO = {};
const { populateOrder } = require("./helperFunctions");

milkshakeDAO.post = function(payload, sessionId) {
  // const ObjectID = mongoose.Types.ObjectId(orderID)
  return new Promise((resolve, reject) => {
    // destructure payload here
    const milkshake = new Milkshake({
      size: 'medium'
    });

    Order.findOne({ _session: sessionId })
      .sort({ createdAt: -1 })
      .then(order => {
        milkshake
          .save()
          .then(milkshake => {
            resolve(
              populateOrder(
                Order.findOneAndUpdate(
                  { _id: order._id },
                  { $push: { _milkshakes: milkshake._id } },
                  { new: true }
                )
              )
            );
          })
          .catch(err => reject(err));
      });
  });
};

module.exports = milkshakeDAO;