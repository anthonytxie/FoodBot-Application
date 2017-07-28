// delete this comment
const { Order, Item, Burger, Drink, Side } = require("./../models/index");
const mongoose = require("mongoose");
var itemDAO = {};
const { populateOrder } = require("./helperFunctions");

const itemMap = new Map();

itemMap.set("burger", id => {
  return new Burger({ _order: id });
});

itemMap.set("drink", id => {
  return new Drink({ _order: id });
});

itemMap.set("side", id => {
  return new Side({ _order: id });
});

itemDAO.post = function(data, sessionId) {
  return new Promise((resolve, reject) => {
    Order.findOne({ _session: sessionId })
      .sort({ createdAt: -1 })
      .then(order => {
        const item = itemMap.get(data.foodType)(order._id);
        item
          .save()
          .then(item => {
            resolve(
              populateOrder(
                Order.findOneAndUpdate(
                  { _id: order._id },
                  { $push: { _items: item._id } },
                  { new: true }
                )
              )
            );
          })
          .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });
};

itemDAO.postCombo = function(sessionId) {
  return new Promise((resolve, reject) => {
    Order.findOne({ _session: sessionId })
      .sort({ createdAt: -1 })
      .then(order => {
        const fries = new Side({});
        return fries.save().then(item => {
          return Order.findOneAndUpdate(
            { _id: order._id },
            { $push: { _items: item._id } },
            { new: true }
          );
        });
      })
      .then(order => {
        const drink = new Side({});
        return drink.save().then(item => {
          resolve(
            populateOrder(
              Order.findOneAndUpdate(
                { _id: order._id },
                { $push: { _items: item._id } },
                { new: true }
              )
            )
          );
        });
      });
  });
};

itemDAO.deleteMostRecentItem = function(sessionId) {
  return new Promise((resolve, reject) => {
    Order.findOne({ _session: sessionId })
      .sort({ createdAt: -1 })
      .then(order => {
        const itemId = mongoose.Types.ObjectId(order._items[0]);
        return itemId;
      })
      .then(itemId => {
        return Item.findOneAndRemove({ _id: itemId });
      })
      .catch(err => reject(err))
      .then(item => {
        Order.findOneAndUpdate(
          { _id: item._order },
          { $pull: { _items: item._id } },
          { new: true }
        ).then(order => {
          resolve(item);
        });
      })
      .catch(err => reject(err));
  });
};

module.exports = itemDAO;