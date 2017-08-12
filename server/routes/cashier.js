//MODULES
const express = require("express");
const routes = express();

//DAO
const orderDAO = require("./../../db/DAO/orderDAO");

routes.get("/cashier", (req, res) => {
  orderDAO.showIncompleteOrders().then(orders => {
  	console.log(orders);
    res.render("cashier.pug", {orders});
  });
});

module.exports = routes