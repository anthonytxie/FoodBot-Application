//MODULES
const express = require("express");
const routes = express();
const moment = require("moment");
//DAO
const orderDAO = require("./../../db/DAO/orderDAO");
const { menuItems, findMenuItemsByItemName, findDifferentItemsOnBurger } = require("./../../messenger-api-helpers/messages/menuItems.js");

routes.get("/cashier", (req, res) => {
  orderDAO.showIncompleteOrders().then(orders => {
    res.status(200).render("cashier.pug", { 
      orders,
      findDifferentItemsOnBurger
    });
  });
});

routes.get("/history", (req, res) => {
  orderDAO.showInputtedOrderHistory().then(orders => {
    orders = orders.sort(function(a, b) {
      return parseFloat(a.inputDate) - parseFloat(b.inputDate);
    });
    res.status(200).render("cashierHistory.pug", { orders });
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
