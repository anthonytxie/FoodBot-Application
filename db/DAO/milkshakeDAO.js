const {Burger, Fry, Drink, Milkshake, Order, Session } = require('./../index');
const milkshakeDAO = {};
const {populateOrder} = require('./helperFunctions');

milkshakeDAO.post = function(result, session) {
    // const ObjectID = mongoose.Types.ObjectId(orderID)
    return new Promise ((resolve, reject) => {
      const {
        type,
        size
      } = result.parameters

      const milkshake = new Milkshake({
        type,
        size
      });

      Session.findOne({session: session})
        .then((session) => (Order.findOne({_session: session._id})).sort({createdAt: -1}).catch((err) => reject(err))).catch((err) => reject(err))
        .then((order) => milkshake.save()
            .then((milkshake) => {
                resolve(populateOrder(Order.findOneAndUpdate({_id: order._id}, { $push: {'_milkshakes': milkshake._id}}, {new: true})));
            }).catch((err) => reject(err))
        ).catch((err) => reject(err))
    });
};

module.exports = milkshakeDAO;