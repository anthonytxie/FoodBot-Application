const {Burger, Fry, Drink, Milkshake, Order, Session } = require('./../index');
const fryDAO = {};
const {populateOrder} = require('./helperFunctions');

fryDAO.post = function(result, session) {
    // const ObjectID = mongoose.Types.ObjectId(orderID)
    return new Promise ((resolve, reject) => {
      const {
        type,
        size
      } = result.parameters

      const fry = new Fry({
        type,
        size
      });

      Session.findOne({session: session})
        .then((session) => (Order.findOne({_session: session._id})).sort({createdAt: -1}).catch((err) => reject(err))).catch((err) => reject(err))
        .then((order) => fry.save()
            .then((fry) => {
                resolve(populateOrder(Order.findOneAndUpdate({_id: order._id}, { $push: {'_fries': fry._id}}, {new: true})));
            }).catch((err) => reject(err))
        ).catch((err) => reject(err))
    });
};

module.exports = fryDAO;