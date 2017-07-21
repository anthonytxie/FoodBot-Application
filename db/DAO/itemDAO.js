const { Order, Session, Burger, Drink, Side, Item } = require('./../index');
const mongoose = require('mongoose')
var itemDAO = {};
const { populateOrder } = require("./helperFunctions");

// const itemMap = new Map();

// itemMap.set("burger", Burger);
// itemMap.set("drink", Drink);
// itemMap.set("side", Side);

itemDAO.post = function() {
  return new Promise((resolve, reject) => {
    Order.findOne().then((order) => {
      const item = new Drink({_order: order._id });
      item.save().then((item) => {
        resolve(
          populateOrder(
            Order.findOneAndUpdate(
              { _id: order._id },
              { $push: { _items: item._id } },
              { new: true }
            )
          )
        );
      }).catch((err) => reject(err))
    }).catch((err) => reject(err))
  });
};



itemDAO.deleteMostRecentItem = function() {
  return new Promise ((resolve, reject) => {
    Order.findOne()
      .then((order) => {
        const itemId =  mongoose.Types.ObjectId(order._items[0])
        return(itemId)
      })
      .then((itemId) => {
        return Item.findOneAndRemove({_id: itemId})
      }).catch((err) => reject(err))
      .then((item) => {
        Order.findOneAndUpdate({_id: item._order}, {$pull: {_items: item._id}}, {new:true})
          .then((order) => {
            resolve(item)
          })
      }).catch((err) => reject(err))
  })
}

module.exports = itemDAO;