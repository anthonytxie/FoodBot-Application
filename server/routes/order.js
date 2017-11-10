// MODULES
const express = require("express");
const routes = express();
const mongoose = require("mongoose");
const async = require("async");

// DAOS
const itemDAO = require("./../../db/DAO/itemDAO");
const orderDAO = require("./../../db/DAO/orderDAO");

//SEND FUNCTIONS
const send = require("../../messenger-api-helpers/send");


routes.get("/editorder", (req, res) => {
  let senderId = req.query.sender;
  orderDAO.getLastOrderBySender(senderId).then(order => {
    res.status(200).render("edit_order", {
      order,
      senderId
    });
  });
});

routes.post("/editorder", (req, res) => {
  console.log("request received");
  let orderId = req.body.orderId;
  let itemIds = req.body.removeIds;
  let senderId = req.body.senderId;
  console.log(req.body);
  async.each(itemIds, itemId => {
    itemDAO
      .deleteItemById(itemId, orderId)
      .then(() => {
        send.sendOrderedMessage(senderId);
        res.status(200).send({success:true});
      })
      .catch(err => console.log(err));
  });
});
module.exports = routes;
