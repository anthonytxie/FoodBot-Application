const { Burger, Fry, Drink, Milkshake, Order, Session } = require("./../index");
const drinkDAO = {};
const { populateOrder } = require("./helperFunctions");

drinkDAO.post = function(payload, sessionId) {
  // const ObjectID = mongoose.Types.ObjectId(orderID)
  return new Promise((resolve, reject) => {
    // destructure payload here
    const drink = new Drink({
      size: 'medium'
    });

    Order.findOne({ _session: sessionId })
      .sort({ createdAt: -1 })
      .then(order => {
        drink
          .save()
          .then(drink => {
            return resolve(
              populateOrder(
                Order.findOneAndUpdate(
                  { _id: order._id },
                  { $push: { _drinks: drink._id } },
                  { new: true }
                )
              )
            );
          })
          .catch(err => reject(err));
      });
  });
};

module.exports = drinkDAO;