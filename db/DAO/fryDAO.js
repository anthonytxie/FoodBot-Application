const {Burger, Fry, Drink, Milkshake, Order, Session } = require('./../index');
const fryDAO = {};
const populateOrder = require('./helperFunctions');


fryDAO.post = function(orderID, fryObject) {
    // const ObjectID = mongoose.Types.ObjectId(orderID)
    return new Promise ((resolve, reject) => {
      const {
        size
      } = fryObject

      const fry = new Fry({
        size
      });

      fry.save()
        .then((fry) => {
          return fry
        }).catch((err) => reject(err))
        .then((fry) => {
          return populateOrder(Order.findOneAndUpdate({_id: orderID}, { $push: {'_fries': fry._id}}, {new: true}));
        }).catch((err) => reject(err))
        .then((order)=> {
          resolve(order);
        });
  });
};

module.exports = fryDAO;