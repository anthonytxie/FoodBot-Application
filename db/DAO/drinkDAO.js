const {Burger, Fry, Drink, Milkshake, Order, Session } = require('./../index');
const drinkDAO = {};
const populateOrder = require('./helperFunctions');


drinkDAO.post = function(orderID, drinkObject) {
    // const ObjectID = mongoose.Types.ObjectId(orderID)
    return new Promise ((resolve, reject) => {
      const {
        type,
        size
      } = drinkObject

      const drink = new Drink({
        type,
        size
      });

      drink.save()
        .then((drink) => {
          return drink
        }).catch((err) => reject(err))
        .then((drink) => {
          return populateOrder(Order.findOneAndUpdate({_id: orderID}, { $push: {'_drinks': drink._id}}, {new: true}));
        }).catch((err) => reject(err))
        .then((order)=> {
          resolve(order);
        });
  });
};

module.exports = drinkDAO;