const Burger = require('./../schemas/burger'); 
const burgerDAO = {};


burgerDAO.post = function(orderID) {
  return new Promise ((resolve,reject) => {
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
  } = req.body;

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
      return Order.findOneAndUpdate(order._id, { $push: {'_burgers': burger._id}})
    })
    .then((order) => {
      return res.send(order);
    });

  });
};