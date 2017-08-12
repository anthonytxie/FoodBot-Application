//MODULES
const express = require("express");
const routes = express();

//DAO
const orderDAO = require("./../../db/DAO/orderDAO");

routes.get("/cashier", (req, res) => {
  orderDAO.showIncompleteOrders().then(orders => {
    res.send(orders);
  });
});

module.exports = routes