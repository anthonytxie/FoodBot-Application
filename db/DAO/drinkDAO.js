const {Burger, Fry, Drink, Milkshake, Order, Session } = require('./../index');
const drinkDAO = {};
const {populateOrder} = require('./helperFunctions');


drinkDAO.post = function(result, session) {
    // const ObjectID = mongoose.Types.ObjectId(orderID)
    return new Promise ((resolve, reject) => {
      const {
        type,
        size
      } = result.parameters

      const drink = new Drink({
        type,
        size
      });

      Session.findOne({session: session})
        .then((session) => (Order.findOne({_session: session._id})).sort({createdAt: -1}).catch((err) => reject(err))).catch((err) => reject(err))
        .then((order) => drink.save()
            .then((drink) => {
                resolve(populateOrder(Order.findOneAndUpdate({_id: order._id}, { $push: {'_drinks': drink._id}}, {new: true})));
            }).catch((err) => reject(err))
        ).catch((err) => reject(err))
    });
};

module.exports = drinkDAO;