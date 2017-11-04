const { Order, User } = require("./../models/index");
const mongoose = require("mongoose");
const orderDAO = {};
const { populateOrder, pad } = require("./helperFunctions");

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

orderDAO.findOrderById = orderId => {
  return new Promise((resolve, reject) => {
    populateOrder(Order.findOne({ _id: orderId }))
      .then(order => {
        resolve(order);
      })
      .catch(err => reject(err));
  });
};

orderDAO.getAllOrders = () => {
  return new Promise((resolve, reject) => {
    populateOrder(Order.find({}))
      .then(orders => {
        resolve(orders);
      })
      .catch(err => reject(err));
  });
};
orderDAO.confirmOrder = function(data) {
  return new Promise((resolve, reject) => {
    populateOrder(
      Order.findOneAndUpdate(
        { _id: data.orderId },
        {
          $set: {
            isConfirmed: true,
            methodFulfillment: data.method,
            fulfillmentDate: data.time,
            isPaid: data.isPaid,
            address: data.address,
            postalCode: data.postal,
            orderConfirmDate: Date.now()
          }
        },
        { new: true }
      )
    )
      .then(order => {
        resolve(order);
      })
      .catch(err => reject(err));
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

orderDAO.getLastOrderBySender = function(senderId) {
  return new Promise((resolve, reject) => {
    User.findOne({ PSID: senderId }).then(user => {
      return populateOrder(Order.findOne({ _user: user._id })
        .sort({
          createdAt: -1
        }))
        .then(order => {
          resolve(order);
        })
        .catch(err => reject(err));
    });
  });
};

orderDAO.showIncompleteOrders = function() {
  return new Promise((resolve, reject) => {
    populateOrder(Order.find({ isInputted: false, isConfirmed: true }))
      .then(orders => {
        resolve(orders);
      })
      .catch(err => reject(err));
  });
};

orderDAO.showInputtedOrderHistory = function() {
  return new Promise((resolve, reject) => {
    populateOrder(Order.find({ isInputted: true, isConfirmed: true }))
      .then(orders => {
        resolve(orders);
      })
      .catch(err => reject(err));
  });
};

orderDAO.updateInputtedOrder = function(orderId) {
  return new Promise((resolve, reject) => {
    populateOrder(
      Order.findOneAndUpdate(
        { _id: orderId },
        {
          $set: {
            isInputted: true,
            inputDate: Date.now()
          }
        },
        { new: true }
      )
    )
      .then(order => {
        resolve(order);
      })
      .catch(err => reject(err));
  });
};

orderDAO.returnPaidOrderNumber = () => {
  return new Promise((resolve, reject) => {
    Order.count({ isPaid: true })
      .then(count => {
        resolve(pad(count+1,5));
      })
      .catch(err => reject(err));
  });
};


module.exports = orderDAO;
