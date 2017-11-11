//MODULES
const express = require("express");
const routes = express();
const async = require("async");
const mongoose = require("mongoose");
const moment = require("moment-timezone");
//DAO
const sessionDAO = require("./../../db/DAO/sessionDAO");
const orderDAO = require("./../../db/DAO/orderDAO");
const itemDAO = require("./../../db/DAO/itemDAO");
const userDAO = require("./../../db/DAO/userDAO");
const stripe = require("stripe")(process.env.stripe_test_key);
// JS FUNCTIONS
const send = require("../../messenger-api-helpers/send");
const { isInDeliveryRange } = require("../../messenger-api-helpers/googleMaps/distanceMatrix.js");

routes.get("/address", (req, res) => {
  let address = req.query.address;

  isInDeliveryRange(address)
  .then((result) => { 
  res.send(result); 
  })
  .catch((err) => { 
  res.send(err); 
  })
});

// LOGGER
const { logger } = require("./../logger/logger");

routes.get("/getorder/:orderid", (req, res) => {
  logger.info("GET on /getorder");
  let orderId = req.params.orderid;
  orderDAO
    .findOrderById(orderId)
    .then(order => {
      res.status(200).send(order);
    })
    .catch(err => {
      logger.error(`GET on /getorder`, { err });
      console.log(err)
      res.status(500).send({ success: false });
    });
});

routes.get("/receipt", (req, res) => {
  logger.info("GET on /receipt");
  let senderId = req.query.senderId;
  orderDAO
    .getLastOrderBySender(senderId)
    .then(order => {
      if (order._items.length === 0) {
        send.sendEmptyOrderMessage(order._user.PSID);
        res.status(200).render("receipt", {
          order,
          keyPublishable: "pk_test_tetHRTsQOph2yuOSaHGZG3pZ"
        });
      } else if (order.isConfirmed) {
        send.sendNewOrderMessage(order._user.PSID);
        res.status(200).render("receipt", {
          order,
          keyPublishable: "pk_test_tetHRTsQOph2yuOSaHGZG3pZ"
        });
      } else {
        res.status(200).render("receipt", {
          order,
          keyPublishable: "pk_test_tetHRTsQOph2yuOSaHGZG3pZ"
        });
      }
    })
    .catch(err => {
      logger.error(`GET on /receipt`, { err });
      res.status(500).send({ success: false });
    });
});

routes.get("/orders", (req, res) => {
  logger.info("GET on /orders");
  orderDAO
    .getAllOrders()
    .then(orders => {
      res.send(orders);
    })
    .catch(err => {
      logger.error(`GET on /orders`, { err });
      res.status(500).send({ success: false });
    });
});

routes.post("/delete", (req, res) => {
  logger.info("POST on /delete");
  let orderId = req.body.orderId;
  let itemIds = req.body.itemIds;
  async.each(itemIds, itemId => {
    itemDAO
      .deleteItemById(itemId, orderId)
      .then(item => {
        res.status(200).send({ success: true });
      })
      .catch(err => {
        logger.error(`GET on /delete`, { err });
        res.status(500).send({ success: false });
      });
  });
});

routes.post("/confirm", (req, res) => {
  logger.info("POST on /confirm");
  let confirmationNumber;
  let {
    orderId,
    method,
    address,
    postal,
    token_id,
    token_email,
    authorized_payment,
    phoneNumber
  } = req.body;

  let time = new Date();
  let parsedDate = Date.parse(time);
  let fulfillmentDate = moment(parsedDate)
    .tz("America/Toronto")
    .format("YYYY-MM-DD HH:mm:ss");
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
        return orderDAO.returnPaidOrderNumber();
      })
      .then(orderNumber => {
        confirmationNumber = orderNumber;
        return orderDAO.confirmOrder({
          orderId,
          method,
          time,
          address,
          postal,
          isPaid: true,
          orderNumber: orderNumber
        });
      })
      .then(order => {
        return userDAO.updateEmail(order._user._id, token_email);
      })
      .then(user => {
        return userDAO.updatePhoneNumber(user._id, phoneNumber);
      })
      .then(user => {
        if (method === "delivery") {
          send.sendConfirmPaidMessageDelivery(user.PSID, {
            fulfillmentDate,
            address,
            confirmationNumber
          });
        } else {
          send.sendConfirmPaidMessagePickup(user.PSID, {
            fulfillmentDate,
            orderId,
            confirmationNumber
          });
        }
        return sessionDAO.closeSession(user._sessions.slice(-1).pop());
      })
      .then(session => {
        res.status(200).send({ success: true });
      })
      .catch(err => {
        // send user a message that their payment didn't go through
        logger.error(`POST on /confirm`, { err });
        send.sendMessageGeneric(
          user.PSID,
          "Sorry there was an error with processing your order. Please try again later"
        );
        res.status(500).send({ success: false });
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
        if (method === "delivery") {
          send.sendConfirmUnpaidMessageDelivery(order._user.PSID, {
            fulfillmentDate,
            confirmationNumber
          });
        } else {
          send.sendConfirmUnpaidMessagePickup(order._user.PSID, {
            fulfillmentDate,
            confirmationNumber
          });
        }
        return sessionDAO.closeSession(order._session);
      })
      .then(() => {
        return res.status(200).send();
      })
      .catch(err => {
        logger.error(`POST on /confirm`, { err });
        send.sendMessageGeneric(
          user.PSID,
          "Sorry there was an error with processing your order. Please try again later"
        );
        res.status(500).send({ success: false });
      });
  }
});
// if there is no items in the delete request, return just the order... else loop through delete everything. at the end get the order and send it

module.exports = routes;
