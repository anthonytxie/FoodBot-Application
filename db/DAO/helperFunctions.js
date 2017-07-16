const {Burger, Fry, Drink, Milkshake, Order, Session } = require('./../index');

const populateOrder = function(operation) {
  return operation
    .populate("_drinks")
    .populate("_burgers")
    .populate("_milkshakes")
    .populate("_fries")
    .populate('_session')
    .populate("_user")
};


module.exports = {populateOrder};