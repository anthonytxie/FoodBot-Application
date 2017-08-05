//MODULES
const express = require("express");
const routes = express();

//DAO
const orderDAO = require("./../../db/DAO/orderDAO");
const itemDAO = require("./../../db/DAO/itemDAO");

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

routes.post("/delete", (req, res) => {
  let orderId = req.body.orderId;

  if (req.body.burgerId & (req.body.sideId)) {
    let burgerId = req.body.burgerId;
    let drinkId = req.body.drinkId;
    let sideId = req.body.sideId;
    itemDAO.deleteItemById(orderId, burgerId)
      .then(() => {
        itemDAO.deleteItemById(orderId, drinkId);
      })
      .then(() => {
        itemDAO.deleteItemById(orderId, sideId);
      })
      .then(() => {
        res.status(200);
      })
  }
  else if (req.body.sideId) {
    let sideId = req.body.sideId;
    itemDAO.deleteItemById(orderId, sideId)
    .then(() => {
      res.status(200);
    })
  }
  else if (req.body.drinkId) {
    let drinkId =req.body.drinkId; 
    itemDAO.deleteItemById(orderId, drinkId)
    .then(() => {
      res.status(200);
    })
  }
});

module.exports = routes;