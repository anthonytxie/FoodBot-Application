const { Burger, Fry, Drink, Milkshake, Order, Session, User } = require("./../index");
const mongoose = require("mongoose");
const orderDAO = {};
const { populateOrder } = require("./helperFunctions");

const itemMap = new Map();

itemMap.set("burger", Burger);
itemMap.set("milkshake", Milkshake);
itemMap.set("drink", Drink);
itemMap.set("fry", Fry);

orderDAO.initializeOrder = function(PSID, sessionId) {
  let sessionObjectId = mongoose.Types.ObjectId(sessionId);
  return new Promise((resolve, reject) => {
    User.findOne({ PSID })
      .then(user => {
        const newOrder = new Order({
          _user: user._id,
          _session: sessionObjectId
        });
        return populateOrder(newOrder.save())
      })
      .catch(err => reject(err))
      .then(order => resolve(order))
      .catch(err => reject(err));
  });
};

orderDAO.getAllOrders = () => {
  return new Promise((resolve, reject) => {
    populateOrder(Order.find())
      .then((orders) => resolve(orders)).catch((err) => reject(err));
  });
};



orderDAO.confirmOrder = function(session) {
  return new Promise((resolve, reject) => {
    Session.findOne({ session: session })
      .then(session =>
        populateOrder(
          Order.findOneAndUpdate(
            { _session: session._id },
            { isConfirmed: true },
            { new: true }
          )
        ).sort({ createdAt: -1 })
      )
      .catch(err => reject(err))
      .then(order => resolve(order))
      .catch(err => reject(err));
  });
};

orderDAO.unconfirmOrder = function(session) {
  return new Promise((resolve, reject) => {
    Session.findOne({ session: session })
      .then(session =>
        populateOrder(
          Order.findOneAndUpdate(
            { _session: session._id },
            { isConfirmed: false },
            { new: true }
          )
        ).sort({ createdAt: -1 })
      )
      .catch(err => reject(err))
      .then(order => resolve(order))
      .catch(err => reject(err));
  });
};

orderDAO.showOrderDetails = function(session) {
  return new Promise((resolve, reject) => {
    Session.findOne({ session: session })
      .then(session =>
        populateOrder(Order.findOne({ _session: session })).sort({
          createdAt: -1
        })
      )
      .catch(err => reject(err))
      .then(order => {
        resolve(order);
      })
      .catch(err => reject(err));
  });
};

// orderDAO.deleteItem = function(orderID,itemType,itemObject) {
//  return new Promise((resolve, reject) => {
//    populateOrder(Order.findOne({_id: orderID}))
//      .then((order) => {
//        if (itemType ==='burger') {
//          Burger.findOneAndRemove({itemObject});
//        }
//        else if (itemType ==='milkshake') {
//          Milkshake.findOneAndRemove({itemObject});
//        }
//        else if (itemType ==='drink') {
//          Drink.findOneAndRemove({itemObject});
//        }
//        else if (itemType ==='fry') {
//          Fry.findOneAndRemove({itemObject});
//        }
//      })
//    .then((deletedItem) => {
//      resolve(deletedItem);
//    });
//  });
// };

orderDAO.deleteMostRecentItemAdded = function(session) {
  return new Promise((resolve, reject) => {
    Session.findOne({ session: session })
      .then(session =>
        populateOrder(
          Order.findOne({ _session: session._id }).sort({ createdAt: -1 })
        )
      )
      .then(order => {
        if (order.itemArray.length <= 0) {
          return resolve(order);
        } else {
          let mostRecentOrder = order.itemArray[0];
          return order;
        }
      })
      .then(order => {
        let mostRecentOrder = order.itemArray[0];
        let id = mongoose.Types.ObjectId(mostRecentOrder[0]);
        return itemMap.get(mostRecentOrder[2]).findOneAndRemove({ _id: id });
      })
      .then(item => {
        resolve(item);
      });
  });
};

module.exports = orderDAO;
