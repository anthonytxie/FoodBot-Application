const { Order, Session, Burger, Drink, Side } = require('./../index');

const populateOrder = function(operation) {
  return operation
    .populate('_session')
    .populate("_user")
    .populate("_items")
};


module.exports = {populateOrder};