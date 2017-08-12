//MODULES
const express = require("express");
const routes = express();
const async = require("async");
const mongoose = require("mongoose");

//DAO
const sessionDAO = require("./../../db/DAO/sessionDAO");
const orderDAO = require("./../../db/DAO/orderDAO");
const itemDAO = require("./../../db/DAO/itemDAO");
const stripe = require("stripe")("sk_test_wGIrSvj5T4LPKJe603wPoLhw");

//SEND FUNCTIONS
const send = require("../../messenger-api-helpers/send");

// move this to own routes .js file
routes.get("/checkout", (req, res) => {
  res.render("checkout.pug", {
    keyPublishable: "pk_test_tetHRTsQOph2yuOSaHGZG3pZ"
  });
});

routes.get("/stripe", (req, res) => {
  res.render("stripe.pug", {
    keyPublishable: "pk_test_tetHRTsQOph2yuOSaHGZG3pZ"
  });
});

routes.get("/getorder/:orderid", (req, res) => {
  let orderId = req.params.orderid;
  orderDAO
    .findOrderById(orderId)
    .then(order => {
      res.send(order);
    })
    .catch(err => res.send(err));
});

routes.get("/receipt", (req, res) => {
  let orderId = req.query.order;
  orderDAO
    .findOrderById(orderId)
    .then(order => {
      res.render("receipt", {
        order,
        keyPublishable: "pk_test_tetHRTsQOph2yuOSaHGZG3pZ"
      });
    })
    .catch(err => res.send(err));
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
  let itemIds = req.body.removeIds;
  async.each(itemIds, itemId => {
    itemDAO
      .deleteItemById(itemId, orderId)
      .then(item => {
        res.status(200);
      })
      .catch(err => console.log(err));
  });
});

routes.post("/confirm", (req, res) => {
  console.log(req.body);
  let {
    orderId,
    method,
    time,
    address,
    postal,
    token_id,
    token_email,
    authorized_payment
  } = req.body;
  if (token_id) {
    let amount = parseFloat(authorized_payment);
    stripe.customers
      .create({
        email: token_email,
        source: token_id
      })
      .then(customer =>
        stripe.charges.create({
          amount,
          description: "Order Charge",
          currency: "cad",
          customer: customer.id
        })
      )
      .then(order => {
        return userDAO.updateEmail(
          mongoose.Types.ObjectId("598f7462a1cd840011436ae7"),
          "anthony112244@hotmail.com"
        );
      })
      .then(() => {
        return orderDAO.confirmOrder({
          orderId,
          method,
          time,
          address,
          postal,
          isPaid: true
        });
      });
  } else {
    orderDAO
      .confirmOrder({
        orderId,
        method,
        time,
        address,
        postal,
        isPaid: false
      })
      .then(order => {
        res.send(order);
      });
  }
});
// if there is no items in the delete request, return just the order... else loop through delete everything. at the end get the order and send it

module.exports = routes;