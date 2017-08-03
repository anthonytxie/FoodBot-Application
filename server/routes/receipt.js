//MODULES
const express = require("express");
const routes = express();

//DAO
const orderDAO = require("./../../db/DAO/orderDAO");

//SEND FUNCTIONS
const send = require("../../messenger-api-helpers/send");

routes.get("/receipt", (req, res) => {
  let orderId = req.query.order;
  orderDAO
    .getOrderById(orderId)
    .then(order => {
      res.render("receipt", { order: order });
    })
    .catch(err => console.log(err));
});

routes.get("/orders", (req, res) => {
  orderDAO
    .getAllOrders()
    .then(orders => {
      res.send(orders);
    })
    .catch(err => console.log(err));
});

module.exports = routes;