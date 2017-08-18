//MODULES
const express = require("express");
const routes = express();

//DAO
const orderDAO = require("./../../db/DAO/orderDAO");

routes.get("/cashier", (req, res) => {
  orderDAO.showIncompleteOrders().then(orders => {
    console.log(orders)
    res.render("cashier.pug", { orders });
  });
});

// need to fix this so it's not sending all the orders
routes.post("/input", (req, res) => {
  let { orderId } = req.body;
  orderDAO
    .updateInputtedOrder(orderId)
    .then(() => {
      return orderDAO.showIncompleteOrders();
    })
    .then(orders => {
      res.render("cashier.pug", {orders});
    });
});

module.exports = routes;