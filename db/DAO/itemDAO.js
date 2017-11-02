const { Order, Item, Burger, Drink, Side } = require("./../models/index");
const orderDAO = require("./orderDAO");
const mongoose = require("mongoose");
var itemDAO = {};
const { populateOrder } = require("./helperFunctions");

const saveItemAndUpdateOrder = function(item, orderId, resolve, reject) {
  return item
    .save()
    .then(item => {
      return Order.findOneAndUpdate(
        { _id: orderId },
        { $push: { _items: item._id } },
        { new: true }
      ).populate("_items")
    })
    .then(order => {
      resolve({_order: orderId})
    })
    .catch(err => reject(err));
};

itemDAO.postBurger = function(foodObject, senderId) {
  /*
                    foodObject: {
                      _link: 1234,
                      itemName: 'Single Burger',
                      patties: 2,
                      standardToppings: ['tomato', 'lettuce'],
                      premiumToppings: ['bacon']
                    }
                  

  */
  let orderId;
  return new Promise((resolve, reject) => {
    orderDAO.getLastOrderBySender(senderId).then(order => {
      orderId = order._id;
      Burger.findOne({
        _link: foodObject._link,
        _order: order._id
      }).then(burger => {
        if (burger) {
          return resolve(
            Burger.findOneAndUpdate(
              {
                _order: order._id,
                _link: foodObject._link
              },
              {
                $set: {
                  patties: foodObject.patties,
                  standardToppings: foodObject.standardToppings,
                  premiumToppings: foodObject.premiumToppings
                }
              },
              { new: true }
            )
          );
          // no catch here???
        } else {
          const newBurger = new Burger({
            _order: order._id,
            _link: foodObject._link,
            patties: foodObject.patties,
            standardToppings: foodObject.standardToppings,
            premiumToppings: foodObject.premiumToppings,
            itemName: foodObject.itemName
          });
          saveItemAndUpdateOrder(newBurger, orderId, resolve, reject);
        }
      });
    });
  });
};

itemDAO.postDrink = function(foodObject, senderId) {
  let orderId;
  return new Promise((resolve, reject) => {
    if (foodObject.itemCombo) {
      orderDAO
        .getLastOrderBySender(senderId)
        .then(order => {
          orderId = order._id;
          return Drink.findOne({
            _link: foodObject._link,
            _order: order._id
          });
        })
        .then(drink => {
          if (drink) {
            return resolve(
              Drink.findOneAndUpdate(
                {
                  _order: orderId,
                  _link: foodObject._link
                },
                {
                  $set: {
                    itemName: foodObject.itemName
                  }
                },
                { new: true }
              )
            );
          } else {
            const newDrink = new Drink({
              _order: orderId,
              _link: foodObject._link,
              itemName: foodObject.itemName,
              itemCombo: foodObject.itemCombo
            });
            saveItemAndUpdateOrder(newDrink, orderId, resolve, reject);
          }
        });
    } else {
      orderDAO.getLastOrderBySender(senderId).then(order => {
        const newDrink = new Drink({
          _order: order._id,
          itemName: foodObject.itemName
        });
        saveItemAndUpdateOrder(newDrink, order._id, resolve, reject);
      });
    }
  });
};

itemDAO.postSide = function(foodObject, senderId) {
  let orderId;
  return new Promise((resolve, reject) => {
    if (foodObject.itemCombo) {
      orderDAO
        .getLastOrderBySender(senderId)
        .then(order => {
          orderId = order._id;
          return Side.findOne({
            _link: foodObject._link,
            _order: order._id
          });
        })
        .then(side => {
          if (side) {
            return resolve(
              Side.findOneAndUpdate(
                {
                  _order: orderId,
                  _link: foodObject._link
                },
                {
                  $set: {
                    itemName: foodObject.itemName
                  }
                },
                { new: true }
              )
            );
          } else {
            const newSide = new Side({
              _order: orderId,
              _link: foodObject._link,
              itemName: foodObject.itemName,
              itemSize: foodObject.itemSize,
              itemCombo: foodObject.itemCombo
            });
            saveItemAndUpdateOrder(newSide, orderId, resolve, reject);
          }
        });
    } else {
      orderDAO.getLastOrderBySender(senderId).then(order => {
        const newSide = new Side({
          _order: order._id,
          itemName: foodObject.itemName,
          itemSize: foodObject.itemSize
        });
        saveItemAndUpdateOrder(newSide, order._id, resolve, reject);
      });
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
