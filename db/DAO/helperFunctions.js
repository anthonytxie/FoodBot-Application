const { Order } = require("./../models/index");

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

module.exports = { populateOrder, pad };
