//MODULES
const express = require("express");
const routes = express();

//DAO
const orderDAO = require("./../../db/DAO/orderDAO");

routes.get("/cashier", (req, res) => {
  orderDAO.showIncompleteOrders().then(orders => {
    res.render("cashier.pug", {orders});
  });
});


routes.post("/input", (req, res) => {
  console.log(req.body);
})

module.exports = routes