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

// move this to own routes .js file
routes.get("/checkout", (req, res) => {
  res.render("checkout.pug", {keyPublishable: "pk_test_tetHRTsQOph2yuOSaHGZG3pZ" })
});

routes.get("/stripe", (req, res) => {
  res.render("stripe.pug", {keyPublishable: "pk_test_tetHRTsQOph2yuOSaHGZG3pZ" })
});


routes.get("/getOrder/:orderId"), (req, res) => {
  const orderId = req.params.orderId
  orderDAO.getOrderById(orderId)
    .then((order) => {
      res.status(200).send(order);
    });
};

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

// routes.get("/receipt", (req, res) => {
//   let orderId = req.query.order;
//   orderDAO
//     .getOrderById(orderId)
//     .then(order => {
//       res.render("receipt", { order: order });
//     })
//     .catch(err => console.log(err));
// });

// routes.get("/orders", (req, res) => {
//   orderDAO
//     .getAllOrders()
//     .then(orders => {
//       res.send(orders);
//     })
//     .catch(err => console.log(err));
// });

// this is temporary
routes.get("/receipt", (req, res) => {
  res.render("checkout.pug", {keyPublishable: "pk_test_tetHRTsQOph2yuOSaHGZG3pZ" })
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
});

module.exports = routes;