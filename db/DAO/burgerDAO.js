const {Burger, Fry, Drink, Milkshake, Order, User } = require('./../index');

const burgerDAO = {};


burgerDAO.post = function(orderID, burgerObject) {
    // const ObjectID = mongoose.Types.ObjectId(orderID)
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
      } = burgerObject

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
          return (Order.findByIdAndUpdate(orderID, { $push: {'_burgers': burger._id}}, {new: true}))
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