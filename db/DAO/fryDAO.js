const { Burger, Fry, Drink, Milkshake, Order, Session } = require("./../index");
const fryDAO = {};
const { populateOrder } = require("./helperFunctions");

fryDAO.post = function(payload, sessionId) {
  // const ObjectID = mongoose.Types.ObjectId(orderID)
  return new Promise((resolve, reject) => {
    // destructure payload here
    const fry = new Fry({
      size: 'medium'
    });

    Order.findOne({ _session: sessionId })
      .sort({ createdAt: -1 })
      .then(order => {
        fry
          .save()
          .then(fry => {
            return resolve(
              populateOrder(
                Order.findOneAndUpdate(
                  { _id: order._id },
                  { $push: { _fries: fry._id } },
                  { new: true }
                )
              )
            );
          })
          .catch(err => reject(err));
      });
  });
};

module.exports = fryDAO;