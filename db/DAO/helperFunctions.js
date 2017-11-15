const { Order } = require("./../models/index");
const { logger } = require("./../../server/logger/logger");
const populateOrder = function(operation) {
  return operation
    .populate("_session")
    .populate("_user")
    .populate("_items");
};

const pad = function(n, width, z) {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

const saveItemAndUpdateOrder = function(item, orderId, resolve, reject) {
  logger.info(`itemDAO saveItemAndUpdateOrder ${item.itemType}`);
  item
    .save()
    .then(item => {
      return Order.findOneAndUpdate(
        { _id: orderId },
        { $push: { _items: item._id } },
        { new: true }
      ).populate("_items");
    })
    .then(order => {
      resolve(order._items.slice(-1).pop());
    })
    .catch(err => {
      logger.error(`itemDAO saveItemAndUpdateOrder ${item.itemType}`, {
        err
      });
      reject(err);
    });
};

module.exports = { populateOrder, pad, saveItemAndUpdateOrder };
