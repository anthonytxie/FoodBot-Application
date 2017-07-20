const { Order, Session, Burger, Drink, Side } = require('./../index');


const mongoose = require("mongoose");
const orderDAO = {};
const { populateOrder } = require("./helperFunctions");


orderDAO.post = () => {
  return new Promise((resolve, reject) => {
    const order = new Order({})
    order.save()
      .then((order) => {
        resolve(order)
      })
  })
}



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

orderDAO.getAllOrders = () => {
  return new Promise((resolve, reject) => {
    populateOrder(Order.find())
      .then(orders => resolve(orders))
      .catch(err => reject(err));
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

orderDAO.deleteMostRecentItemAdded = function(sessionId) {
  return new Promise((resolve, reject) => {
    populateOrder(
      Order.findOne({ _session: sessionId }).sort({ createdAt: -1 })
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

module.exports = orderDAO;