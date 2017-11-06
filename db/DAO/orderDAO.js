const { Order, User } = require("./../models/index");
const mongoose = require("mongoose");
const orderDAO = {};
const { populateOrder, pad } = require("./helperFunctions");
const { logger } = require("./../../server/logger/logger");

orderDAO.initializeOrder = function(PSID, sessionId) {
  logger.info(`${PSID} orderDAO initializeOrder`);
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
      .catch(err => {
        logger.error(`${PSID} orderDAO initializeOrder`, { err });
        reject(err);
      });
  });
};

orderDAO.findOrderById = orderId => {
  logger.info(`${orderId} orderDAO findOrderById`);
  return new Promise((resolve, reject) => {
    populateOrder(Order.findOne({ _id: orderId }))
      .then(order => {
        resolve(order);
      })
      .catch(err => {
        logger.error(`${orderId} orderDAO findOrderById`, { err });
        reject(err);
      });
  });
};

orderDAO.getAllOrders = () => {
  logger.info(`orderDAO getAllOrders`);
  return new Promise((resolve, reject) => {
    populateOrder(Order.find({}))
      .then(orders => {
        resolve(orders);
      })
      .catch(err => {
        logger.error(`orderDAO getAllOrders`, { err });
        reject(err);
      });
  });
};

orderDAO.confirmOrder = function(data) {
  logger.info(`${data.orderId} orderDAO confirmOrder`);
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
            orderConfirmDate: Date.now(),
            orderNumber: data.orderNumber
          }
        },
        { new: true }
      )
    )
      .then(order => {
        resolve(order);
      })
      .catch(err => {
        logger.error(`${data.orderId} orderDAO confirmOrder`, { err });
        reject(err);
      });
  });
};

orderDAO.getOrderBySessionId = function(sessionId) {
  logger.info(`${sessionId} orderDAO getOrderBySessionId`);
  return new Promise((resolve, reject) => {
    populateOrder(Order.findOne({ _session: sessionId }))
      .sort({
        createdAt: -1
      })
      .then(order => {
        resolve(order);
      })
      .catch(err => {
        logger.error(`${sessionId} orderDAO getOrderBySessionId`, { err });
        reject(err);
      });
  });
};

orderDAO.getLastOrderBySender = function(senderId) {
  logger.info(`${senderId} orderDAO getLastOrderBySender`);
  return new Promise((resolve, reject) => {
    User.findOne({ PSID: senderId }).then(user => {
      return populateOrder(
        Order.findOne({ _user: user._id }).sort({
          createdAt: -1
        })
      )
        .then(order => {
          resolve(order);
        })
        .catch(err => {
          logger.error(`${senderId} orderDAO getLastOrderBySender`, { err });
          reject(err);
        });
    });
  });
};

orderDAO.showIncompleteOrders = function() {
  logger.info(`orderDAO showIncompleteOrders`);
  return new Promise((resolve, reject) => {
    populateOrder(Order.find({ isInputted: false, isConfirmed: true }))
      .then(orders => {
        resolve(orders);
      })
      .catch(err => {
        logger.error(`orderDAO showIncompleteOrders`, { err });
        reject(err);
      });
  });
};

orderDAO.showInputtedOrderHistory = function() {
  logger.info(`orderDAO showInputtedOrderHistory`);
  return new Promise((resolve, reject) => {
    populateOrder(Order.find({ isInputted: true, isConfirmed: true }))
      .then(orders => {
        resolve(orders);
      })
      .catch(err => {
        logger.error(`orderDAO showInputtedOrderHistory`, { err });
        reject(err);
      });
  });
};

orderDAO.updateInputtedOrder = function(orderId) {
  logger.info(`${orderId} orderDAO updateInputtedOrder`);
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
      .catch(err => {
        logger.error(`${orderId} orderDAO updateInputtedOrder`, { err });
        reject(err);
      });
  });
};

orderDAO.returnPaidOrderNumber = () => {
  logger.info(`orderDAO returnPaidOrderNumber`);
  return new Promise((resolve, reject) => {
    Order.count({ isPaid: true })
      .then(count => {
        resolve(pad(count + 1, 5));
      })
      .catch(err => {
        logger.error(`orderDAO returnPaidOrderNumber`, { err });
        reject(err);
      });
  });
};

//worried about this... will this sometimes result in same number for two orders if they are happening concurrently?

module.exports = orderDAO;
