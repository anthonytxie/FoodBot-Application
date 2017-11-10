//MODULES
const express = require("express");
const routes = express();
const moment = require("moment");
const { findDifferentItemsOnBurger } = require("./../../config/menuItems");
//DAO
const orderDAO = require("./../../db/DAO/orderDAO");

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

routes.post("/cashier", (req, res) => {
  console.log(req.body)
  const isInputted = parseInt(req.body.isInputted);

  if (isInputted) {
    orderDAO.updateInputtedOrder(req.body.id, true).then(() => {
      res.status(200).send({success:true});
    });
  } else {
    orderDAO.updateInputtedOrder(req.body.id, false).then(() => {
      res.status(200).send({success: true});
    });
  }
});

module.exports = routes;
