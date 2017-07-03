const {Burger, Fry, Drink, Milkshake, Order, Session } = require('./../index');
const burgerDAO = {};
const { populateOrder, findMostRecentOrder } = require('./helperFunctions');




burgerDAO.post = function(result, session) {
    // const ObjectID = mongoose.Types.ObjectId(orderID)
    const orderID = findMostRecentOrder(session).then((order) => order)

    return new Promise ((resolve, reject) => {
      

      const {
        bunType,
        meatType,
        patties,
        cheddar,
        blueCheese,
        swiss,
        bacon,
        sauce,
        pickles,
        lettuce,
        tomatoes,
        onions,
        fried,
        pankoCrumbs,
        egg
      } = result.parameters

      const burger = new Burger({
        bunType,
        meatType,
        patties,
        cheddar,
        blueCheese,
        swiss,
        bacon,
        sauce,
        pickles,
        lettuce,
        tomatoes,
        onions,
        fried,
        pankoCrumbs,
        egg
      });

      burger.save()
        .then((burger) => {
          return burger
        }).catch((err) => reject(err))
        .then((burger) => {
          return populateOrder(Order.findByIdAndUpdate(orderID, { $push: {'_burgers': burger._id}}, {new: true}));
        }).catch((err) => reject(err))
        .then((order)=> {
          resolve(order);
        });
  });
};

burgerDAO.get = function () {
    return new Promise((resolve,reject) => {
        Burger.findOne()
            .then((burger) => {
                resolve([burger])
            }).catch((err) => res.send(err));
    });
};

module.exports = burgerDAO;