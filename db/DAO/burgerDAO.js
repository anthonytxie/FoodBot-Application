const { Burger, Fry, Drink, Milkshake, Order, Session } = require("./../index");
const burgerDAO = {};
const { populateOrder } = require("./helperFunctions");

burgerDAO.post = function(payload, sessionId) {
  // const ObjectID = mongoose.Types.ObjectId(orderID)
  return new Promise((resolve, reject) => {
    // destructure payload here
    const burger = new Burger({
      patties: 1
    });

    Order.findOne({ _session: sessionId }).sort({ createdAt: -1 })
      .then((order) => resolve(order))
    });
};

module.exports = burgerDAO;
