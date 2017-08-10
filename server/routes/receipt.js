//MODULES
const express = require("express");
const routes = express();
const async = require('async');
const mongoose = require('mongoose');

//DAO
const sessionDAO = require("./../../db/DAO/sessionDAO");
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


routes.get("/getorder", (req, res) => {
  console.log(req.query)
  res.send('hello')
  // const orderId = req.params.orderId;
  // orderDAO.getOrderById(orderId).then(order => {
  //   res.send(order);
  // }).catch((err) => res.send(err));
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
  orderDAO.findOrderById(orderId)
    .then((order) => {
      console.log(order)
      res.render("receipt", { order, keyPublishable: "pk_test_tetHRTsQOph2yuOSaHGZG3pZ" });
    }).catch((err) => res.send(err))
});

routes.get("/orders", (req, res) => {
  orderDAO
    .getAllOrders()
    .then(orders => {
      res.send(orders);
    })
    .catch(err => console.log(err));
});

routes.post("/confirmOrder", (req, res) => {
  const orderId = req.body.orderId;
  let receipentId;
  orderDAO
    .confirmOrder(orderId)
    .then(order => {
      receipentId = order._user.PSID
      return sessionDAO.closeSession(order._session._id)
    })
    .then(() => {
      send.sendMessageGeneric(receipentId, 'bye!')
    })
    .catch(err => res.send(err));
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


// if there is no items in the delete request, return just the order... else loop through delete everything. at the end get the order and send it 



module.exports = routes;