const { Order, Session, Burger, Drink, Side } = require('./../index');

var itemDAO = {};
const { populateOrder } = require("./helperFunctions");

// const itemMap = new Map();

// itemMap.set("burger", Burger);
// itemMap.set("drink", Drink);
// itemMap.set("side", Side);

itemDAO.post = function() {
  return new Promise((resolve, sessionId) => {
    const item = new Drink();
    Order.findOne().then(order => {
      item.save().then(item => {
        resolve(
          populateOrder(
            Order.findOneAndUpdate(
              { _id: order._id },
              { $push: { _items: item._id } },
              { new: true }
            )
          )
        );
      });
    });
  });
};
module.exports = itemDAO;