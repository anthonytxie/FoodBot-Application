// delete this comment
const { Order, Item, Burger, Drink, Side } = require("./../models/index");
const mongoose = require("mongoose");
var itemDAO = {};
const { populateOrder } = require("./helperFunctions");

itemDAO.postBurger = function(data, orderId) {
  return new Promise((resolve, reject) => {
    const burger = new Burger(data)
    burger.save().then(item => {
      resolve(
        populateOrder(
          Order.findOneAndUpdate(
            { _id: orderId },
            { $push: { _items: item._id } },
            { new: true }
          )
        )
      );
    }).catch((err) => reject(err));
  });
};

itemDAO.postDrink = function(data, orderId) {
return new Promise((resolve, reject) => {
    if (data.itemCombo) {
      populateOrder(Order.findOne({ _id: orderId })).then(order => {
        if (order._items.slice(-1)[0].itemType ==='burger') {
          const drink = new Drink(data);
          drink.save().then(item => {
            resolve(
              populateOrder(
                Order.findOneAndUpdate(
                  { _id: orderId },
                  { $push: { _items: item._id } },
                  { new: true }
                )
              )
            );
          });
        }
      });
    } else {
      const drink = new Drink(data);
      drink
        .save()
        .then(item => {
          resolve(
            populateOrder(
              Order.findOneAndUpdate(
                { _id: orderId },
                { $push: { _items: item._id } },
                { new: true }
              )
            )
          );
        })
        .catch(err => reject(err));
    }
  });
};

itemDAO.postSide = function(data, orderId) {
  return new Promise((resolve, reject) => {
    if (data.itemCombo) {
      populateOrder(Order.findOne({ _id: orderId })).then(order => {
        if (order._items.slice(-1)[0].itemCombo) {
          const side = new Side(data);
          side.save().then(item => {
            resolve(
              populateOrder(
                Order.findOneAndUpdate(
                  { _id: orderId },
                  { $push: { _items: item._id } },
                  { new: true }
                )
              )
            );
          });
        }
      });
    } else {
      const side = new Side(data);
      side
        .save()
        .then(item => {
          resolve(
            populateOrder(
              Order.findOneAndUpdate(
                { _id: orderId },
                { $push: { _items: item._id } },
                { new: true }
              )
            )
          );
        })
        .catch(err => reject(err));
    }
  });
};


itemDAO.deleteItemById = function(itemId, orderId) {
  return new Promise((resolve, reject) => {
    Item.findOneAndRemove({ _id: itemId })
      .then(item => {
        return Order.findOneAndUpdate(
          { _id: orderId },
          { $pull: { _items: itemId } },
          { new: true }
        );
      })
      .then(order => {
        resolve(order);
      })
      .catch(err => reject(err));
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