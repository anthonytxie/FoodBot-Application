//MODULES
const express = require("express");
const routes = express();
const moment = require("moment");
//DAO
const orderDAO = require("./../../db/DAO/orderDAO");

routes.get("/cashier", (req, res) => {
  orderDAO.showIncompleteOrders().then(orders => {
    res.render("cashier.pug", { orders });
  });
});

routes.get("/history", (req, res) => {
  orderDAO.showInputtedOrderHistory().then(orders => {
    res.render("cashierHistory.pug", { orders });
  });
});

routes.post("/input", (req, res) => {
  let { orderId } = req.body;
  orderDAO
    .updateInputtedOrder(orderId)
    .then(() => {
      return orderDAO.showIncompleteOrders();
    })
    .then(orders => {
      res.render("cashier.pug", { orders });
    });
});

module.exports = routes;