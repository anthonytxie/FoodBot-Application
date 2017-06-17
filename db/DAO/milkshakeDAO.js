const {Burger, Fry, Drink, Milkshake, Order, User } = require('./../index');
const milkshakeDAO = {};


milkshakeDAO.post = function(orderID, milkshakeObject) {
    // const ObjectID = mongoose.Types.ObjectId(orderID)
    return new Promise ((resolve, reject) => {
      const {
        type,
        size
      } = milkshakeObject

      const milkshake = new Milkshake({
        type,
        size
      });

      milkshake.save()
        .then((milkshake) => {
          return milkshake
        }).catch((err) => reject(err))
        .then((milkshake) => {
          return (Order.findOneAndUpdate({_id: orderID}, { $push: {'_milkshakes': milkshake._id}}, {new: true}))
        }).catch((err) => reject(err))
        .then((order)=> {
          resolve(order);
        });
  });
};

module.exports = milkshakeDAO;