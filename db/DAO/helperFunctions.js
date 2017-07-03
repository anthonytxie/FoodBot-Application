const {Burger, Fry, Drink, Milkshake, Order, Session } = require('./../index');

const populateOrder = function(operation) {
  return operation
    .populate("_drinks")
    .populate("_burgers")
    .populate("_milkshakes")
    .populate("_fries")
    .populate('_session')
};


const findMostRecentOrder = function(sessionId) {
    return new Promise((resolve,reject) => {
        Session.find({session: sessionId})
            .then((session) => {
                return Order.findOne({_session: session._id}).sort({createdAt: -1});
            })
            .then((order) => {
                resolve(order)
            });
    });
};


findMostRecentOrder('5fd65fcc-56b8-420b-91aa-234c212434a8')
    .then((order) => {
        console.log(order)
    })




module.exports = {populateOrder, findMostRecentOrder };