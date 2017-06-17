const {Burger, Fry, Drink, Milkshake, Order, User } = require('./../index');

const populateOrder = function(operation) {
  return operation
    .populate("_drinks")
    .populate("_burgers")
    .populate("_milkshakes")
    .populate("_fries")
};




module.exports = populateOrder;