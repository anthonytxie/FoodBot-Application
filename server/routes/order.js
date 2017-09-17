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
    res.status(200).render("edit_order", {
      order
    });
  });
});

routes.post("/editorder", (req, res) => {
  console.log("request received");
  let orderId = req.body.orderId;
  let itemIds = req.body.removeIds;
  console.log(req.body);
  async.each(itemIds, itemId => {
    itemDAO
      .deleteItemById(itemId, orderId)
      .then(item => {
        res.status(200).send();
      })
      .catch(err => console.log(err));
  });
});
module.exports = routes;
