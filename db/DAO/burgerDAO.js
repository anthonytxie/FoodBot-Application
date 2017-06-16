const Burger = require('./../schemas/burger'); 
const Order = require('./../schemas/burger'); 

const burgerDAO = {};


burgerDAO.post = function(orderID) {
    // const ObjectID = mongoose.Types.ObjectId(orderID)
    return new Promise ((resolve, reject) => {
        Order.findOne({_id: orderID})
        .then((order)=> resolve(order)).catch((err) => reject(err));
    });
};

module.exports = burgerDAO;