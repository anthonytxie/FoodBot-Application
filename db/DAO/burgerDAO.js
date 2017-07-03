const {Burger, Fry, Drink, Milkshake, Order, Session } = require('./../index');
const burgerDAO = {};
const { populateOrder } = require('./helperFunctions');




burgerDAO.post = function(result, session) {
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

      Session.findOne({session: session})
        .then((session) => (Order.findOne({_session: session._id})).sort({createdAt: -1}).catch((err) => reject(err)))
        .then((order) => burger.save()
            .then((burger) => {
                resolve(populateOrder(Order.findOneAndUpdate({_id: order._id}, { $push: {'_burgers': burger._id}}, {new: true})));
            }).catch((err) => reject(err))
        ).catch((err) => reject(err))
    });
};


module.exports = burgerDAO;