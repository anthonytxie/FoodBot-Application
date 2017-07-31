const { Order, User } = require('./../models/index');
const mongoose = require("mongoose");
const orderDAO = {};
const { populateOrder } = require("./helperFunctions");

orderDAO.initializeOrder = function(PSID, sessionId) {
  return new Promise((resolve, reject) => {
    User.findOne({ PSID })
      .then(user => {
        const newOrder = new Order({
          _user: user._id,
          _session: sessionId
        });
        return newOrder.save();
      })
      .catch(err => reject(err))
      .then(order => resolve(order))
      .catch(err => reject(err));
  });
};

orderDAO.getOrderById = (orderId) => {
  return new Promise((resolve, reject) => {
    populateOrder(Order.findOne({_id: mongoose.Types.ObjectId(orderId)}))
      .then((order) => {
        resolve(order)
      })
  })

}
orderDAO.getAllOrders = () => {
  return new Promise((resolve, reject) => {
    Order.find().populate("_items")
      .then((orders) => resolve(orders))
      .catch((err) => reject(err))
  });
};

orderDAO.confirmOrder = function(sessionId, confirmStatus) {
  return new Promise((resolve, reject) => {
    populateOrder(
      Order.findOneAndUpdate(
        { _session: sessionId },
        { isConfirmed: confirmStatus },
        { new: true }
      ).sort({ createdAt: -1 })
    )
      .then(order => resolve(order))
      .catch(err => reject(err));
  });
};

orderDAO.showOrderDetails = function(sessionId) {
  return new Promise((resolve, reject) => {
    populateOrder(Order.findOne({ _session: sessionId }))
      .sort({
        createdAt: -1
      })
      .then(order => {
        resolve(order);
      })
      .catch(err => reject(err));
  });
};


module.exports = orderDAO;