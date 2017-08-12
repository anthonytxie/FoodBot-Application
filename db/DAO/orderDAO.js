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
      .then(order => resolve(order))
      .catch(err => reject(err));
  });
};

orderDAO.findOrderById = (orderId) => {
  return new Promise ((resolve ,reject) => {
    populateOrder(Order.findOne({_id: orderId}))
      .then((order) => {
        resolve(order)
      }).catch((err) => reject(err))
  });
};


orderDAO.getAllOrders = () => {
  return new Promise((resolve, reject) => {
    populateOrder(Order.find({}))
      .then((orders) => {
        resolve(orders);
      })
      .catch((err) => reject(err));
  });
};
orderDAO.confirmOrder = function(data) {
  return new Promise((resolve, reject) => {
    if (data.method === "pickup") {
      populateOrder(
        Order.findOneAndUpdate(
          { _id: data.orderId },
          {
            $set: {
              isConfirmed: true,
              methodFulfillment: data.method,
              fulfillmentDate: data.time
              // address: address,
              // postalCode: postal
            }
          },
          { new: true }
        )
      )
        .then(order => {
          resolve(order);
        })
        .catch(err => reject(err));
    } else {
      populateOrder(
        Order.findOneAndUpdate(
          { _id: data.orderId },
          {
            $set: {
              isConfirmed: true,
              methodFulfillment: data.method,
              fulfillmentDate: data.time,
              address: address,
              postalCode: postal
            }
          },
          { new: true }
        )
      )
        .then(order => {
          resolve(order);
        })
        .catch(err => reject(err));
    }
  });
};

orderDAO.getOrderBySessionId = function(sessionId) {
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