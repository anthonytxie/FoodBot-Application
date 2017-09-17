// MODULES
const express = require("express");
const routes = express();
const mongoose = require("mongoose");

// DAOS
const itemDAO = require("./../../db/DAO/itemDAO");
const orderDAO = require("./../../db/DAO/orderDAO");

routes.get("/editorder", (req, res) => {
  let orderId = req.query.order;
  let senderId = req.query.sender;
  orderDAO.findOrderById(orderId).then(order => {
    res.status(200).send(order);
  });
});

module.exports = routes;
