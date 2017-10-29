const { Order, Item, Burger, Drink, Side } = require("./../models/index");
const orderDAO = require("./orderDAO");
const mongoose = require("mongoose");
var itemDAO = {};
const { populateOrder } = require("./helperFunctions");

const saveItemAndUpdateOrder = function(item, orderId, resolve, reject) {
  return item
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
};

itemDAO.postBurger = function(data, senderId) {
  let orderId;
  return new Promise((resolve, reject) => {
    orderDAO
      .getLastOrderBySender(senderId)
      .then(order => {
        orderId = order._id;
        return Burger.FindOne({ _link: data._link, _order: order._id });
      })
      .then(burger => {
        if (!burger) {
          const burger = new Burger({
            _order: orderId,
            _link: data._link,
            patties: data.foodObject.patties,
            standardToppings: data.foodObject.standardToppings,
            premiumToppings: data.foodObject.premiumToppings,
            itemName: data.foodObject.itemName
          });
          saveItemAndUpdateOrder(burger, orderId, resolve, reject);
        } else {
          Burger.findOneAndUpdate(
            { _link: data._link, _order: orderId },
            {
              $set: {
                patties: data.foodObject.patties,
                standardToppings: data.foodObject.standardToppings,
                premiumToppings: data.foodObject.premiumToppings
              }
            }
          );
        }
      });
  });
};

itemDAO.postDrink = function(data, orderId) {
  return new Promise((resolve, reject) => {
    const drink = new Drink(data);
    if (data.itemCombo) {
      populateOrder(Order.findOne({ _id: orderId }))
        .then(order => {
          if (!order._items[0]) {
            resolve(false);
          } else if (order._items.slice(-1)[0].itemType === "burger") {
            saveItemAndUpdateOrder(drink, orderId, resolve, reject);
          } else {
            resolve(false);
          }
        })
        .catch(err => reject(err));
    } else {
      saveItemAndUpdateOrder(drink, orderId, resolve, reject);
    }
  });
};

itemDAO.postSide = function(data, orderId) {
  const side = new Side(data);
  return new Promise((resolve, reject) => {
    if (data.itemCombo) {
      populateOrder(Order.findOne({ _id: orderId })).then(order => {
        if (!order._items[0]) {
          resolve(false);
        } else if (order._items.slice(-1)[0].itemCombo) {
          saveItemAndUpdateOrder(side, orderId, resolve, reject);
        } else {
          resolve(false);
        }
      });
    } else {
      saveItemAndUpdateOrder(side, orderId, resolve, reject);
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

module.exports = itemDAO;
