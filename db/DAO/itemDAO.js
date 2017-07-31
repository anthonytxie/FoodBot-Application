// delete this comment
const { Order, Item, Burger, Drink, Side } = require("./../models/index");
const mongoose = require("mongoose");
var itemDAO = {};
const { populateOrder } = require("./helperFunctions");

const itemMap = new Map();

itemMap.set("burger", (orderId, foodObject, resolve, reject) => {
  return new Burger({
    _order: orderId,
    patties: foodObject.patties,
    itemName: foodObject.title,
    premiumToppings: [...foodObject.premiumToppings],
    standardToppings: [...foodObject.standardToppings]
  })
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
});

itemMap.set("drink", (orderId, foodObject, resolve, reject) => {
  return new Drink({ _order: orderId })
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
});

itemMap.set("side", (orderId, foodObject, resolve, reject) => {
  return new Side({ _order: orderId })
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
});

itemDAO.post = function(data, sessionId) {
  return new Promise((resolve, reject) => {
    Order.findOne({ _session: sessionId })
      .sort({ createdAt: -1 })
      .then(order => {
        itemMap.get(data.foodType)(order._id, data.foodObject, resolve, reject);
      })
      .catch(err => reject(err));
  });
};



itemDAO.postBurger = function(data, orderId) {
  return new Promise((resolve, reject) => {
    const burger = new Burger(data);
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


itemDAO.postCombo = function(sessionId) {
  return new Promise((resolve, reject) => {
    Order.findOne({ _session: sessionId })
      .sort({ createdAt: -1 })
      .then(order => {
        const fries = new Side({itemName: "Small Fries", itemCombo: true});
        return fries.save().then(item => {
          return Order.findOneAndUpdate(
            { _id: order._id },
            { $push: { _items: item._id } },
            { new: true }
          );
        });
      })
      .then(order => {
        const drink = new Drink({itemName: "Pepsi", itemCombo: true});
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