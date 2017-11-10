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
const { addMassiveOrder } = require("./../../db/DAO/garbage")
// LOGGER
const { logger } = require("./../logger/logger");

routes.get("/editorder", (req, res) => {
  logger.info("GET on /editorder");
  let senderId = req.query.sender;
  orderDAO.getLastOrderBySender(senderId).then(order => {
    res
      .status(200)
      .render("edit_order", {
        order,
        senderId
      })
      .catch(err => {
        logger.error(`GET on /editorder`, { err });
        res.status(500).send({ success: false });
      });
  });
});

routes.post("/editorder", (req, res) => {
  logger.info("POST on /editorder");
  let orderId = req.body.orderId;
  let itemIds = req.body.removeIds;
  let senderId = req.body.senderId;
  async.each(itemIds, itemId => {
    itemDAO
      .deleteItemById(itemId, orderId)
      .then(() => {
        send.sendOrderedMessage(senderId);
        res.status(200).send({ success: true });
      })
      .catch(err => {
        logger.error(`POST on /editorder`, { err });
        res.status(500).send({ success: false });
      });
  });
});

// FOR CHANDLER'S DEPRAVED TESTING PURPOSES ONLY
routes.post("/addMassiveOrder", (req, res) => {
  let orderId = req.body.orderId;
  let senderId = req.body.senderId
  console.log(req.body)
  addMassiveOrder(senderId, orderId)
    .then((order) => {
      res.status(200).send({success: true})
    }).catch((err) => res.send(err))
})



module.exports = routes;
