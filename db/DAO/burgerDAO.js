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

    Order.findOne({ _session: sessionId })
      .sort({ createdAt: -1 })
      .then(order => {
        return burger.save();
      })
      .then(burger => {
        resolve(
          populateOrder(
            Order.findOneAndUpdate(
              { _id: order._id },
              { $push: { _burgers: burger._id } },
              { new: true }
            )
          )
        );
      });
  });
};

module.exports = burgerDAO;
