//MODULES
const express = require("express");
const routes = express();
const async = require("async");
const mongoose = require("mongoose");

//DAO
const sessionDAO = require("./../../db/DAO/sessionDAO");
const orderDAO = require("./../../db/DAO/orderDAO");
const itemDAO = require("./../../db/DAO/itemDAO");
const userDAO = require("./../../db/DAO/userDAO");
const stripe = require("stripe")("sk_test_wGIrSvj5T4LPKJe603wPoLhw");

//SEND FUNCTIONS
const send = require("../../messenger-api-helpers/send");

routes.get("/getorder/:orderid", (req, res) => {
  let orderId = req.params.orderid;
  orderDAO
    .findOrderById(orderId)
    .then(order => {
      res.status(200).send(order);
    })
    .catch(err => res.send(err));
});

routes.get("/receipt", (req, res) => {
  let orderId = req.query.order;
  orderDAO
    .findOrderById(orderId)
    .then(order => {
      res.status(200).render("receipt", {
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
        res.status(200).send();
      })
      .catch(err => console.log(err));
  });
});

routes.post("/confirm", (req, res) => {
  // console.log(req.body);
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
  time = Date(time);
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
      .then(() => {
        return orderDAO
          .confirmOrder({
            orderId,
            method,
            time,
            address,
            postal,
            isPaid: true
          })
        })
          .then(order => {
            //send success message here
            return userDAO.updateEmail(order._user._id, token_email)
          })
          .then(() => {
            res.status(200).send();
          })
          .catch((err) => {
            // payment didn't go through send message back to user
          })
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
        send.sendConfirmUnpaidMessage(order._user.PSID)
        res.status(200).send(order);
      });
  }
});
// if there is no items in the delete request, return just the order... else loop through delete everything. at the end get the order and send it

module.exports = routes;



