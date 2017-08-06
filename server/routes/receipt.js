//MODULES
const express = require("express");
const routes = express();
const async = require('async');
const mongoose = require('mongoose');

//DAO
const orderDAO = require("./../../db/DAO/orderDAO");
const itemDAO = require("./../../db/DAO/itemDAO");
const stripe = require('stripe')('sk_test_wGIrSvj5T4LPKJe603wPoLhw')

//SEND FUNCTIONS
const send = require("../../messenger-api-helpers/send");

routes.get("/stripe", (req, res) => {
  res.render("stripe.pug", {keyPublishable: "pk_test_tetHRTsQOph2yuOSaHGZG3pZ" })
});

routes.post("/charge", (req, res) => {
  let amount = 500;
  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  }).then(customer => {
    stripe.charges.create({
      amount,
      description: "sample charge",
      currency: "cad",
      customer: customer.id
    })
    .then(charge => {
      res.render("charge.pug")
    })

  })
})



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
  let itemIds = req.body.itemIds;
  async.each(itemIds, (itemId) => {
    itemDAO.deleteItemById(itemId, orderId)
      .then((item) => {
        console.log(item)
      }).catch((err) => console.log(err))
  })


}, function (error) {
  if (error) res.json(500, {error: error});

  console.log('items deleted');
  return res.json(201, {msg: 'items deleted'} );
});

module.exports = routes;