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
const {
  isInDeliveryRange
} = require("../../messenger-api-helpers/googleMaps/distanceMatrix.js");
const bringg = require("../../messenger-api-helpers/bringg/bringg");

routes.get("/address", (req, res) => {
  let address = req.query.address;

  isInDeliveryRange(address)
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => {
      res.send(err);
    });
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
      console.log(err);
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
      res.status(200).send(orders);
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
  console.log(req.body);
  logger.info("POST on /confirm");
  let confirmationNumber;
  let {
    orderId,
    method,
    address,
    roomNumber,
    postal,
    token_id,
    token_email,
    authorized_payment,
    phoneNumber,
    senderId
  } = req.body;
  let orderObject;

  phoneNumber = phoneNumber.replace(/\s+/g, "");
  let time = new Date();
  let parsedDate = Date.parse(time);
  let fulfillmentDate = moment(parsedDate)
    .tz("America/Toronto")
    .format("YYYY-MM-DD HH:mm:ss");
  if (token_id && method === "delivery") {
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
        send.sendMessageGeneric(
          senderId,
          "Alright! Your payment went through. Give us a sec to process your delivery order!"
        );
      })
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
        orderObject = order
        return userDAO.updateEmail(order._user._id, token_email);
      })
      .then(user => {
        return userDAO.updatePhoneNumber(user._id, phoneNumber);
      })
      .then(user => {
        return userDAO.updateAddress(user._id, address, roomNumber);
      })
      .then(user => {
        if (!user.integrationIds.bringgId) {
          return bringg.createCustomer(user);
        } else {
          return user;
        }
      })
      .then(user => {
        return bringg.createWaypoint(user);
      })
      .then(body => {
        return bringg
          .createTask(
            body.task.id,
            body.task.way_points[1].id,
            orderObject
          )
          .then(response => {
            return orderDAO.updateBringgStatus(orderId, response.success);
          });
      })
      .then(order => {
        send.sendConfirmPaidMessageDelivery(order._user.PSID, {
          fulfillmentDate,
          address,
          confirmationNumber
        });
        return sessionDAO.closeSession(order._user._sessions.slice(-1).pop());
      })
      .then(session => {
        res.status(200).send({ success: true });
      })
      .catch(err => {
        // send user a message that their payment didn't go through
        logger.error(`POST on /confirm`, { err });
        send.sendMessageGeneric(
          senderId,
          "Sorry there was an error with processing your order. Please try again later"
        );
        res.status(500).send({ success: false });
      });
  } else if (token_id && method === "pickup") {
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
        send.sendMessageGeneric(
          senderId,
          "Alright! Your payment went through. Give us a sec to process your pickup order!"
        );
      })
      .then(() => {
        return orderDAO.returnPaidOrderNumber();
      })
      .then(orderNumber => {
        confirmationNumber = orderNumber;
        return orderDAO.confirmOrder({
          orderId,
          method,
          time,
          isPaid: true,
          orderNumber: orderNumber
        });
      })
      .then(order => {
        return userDAO.updateEmail(order._user._id, token_email);
      })
      .then(user => {
        send.sendConfirmPaidMessagePickup(user.PSID, {
          fulfillmentDate,
          orderId,
          confirmationNumber
        });
        return sessionDAO.closeSession(user._sessions.slice(-1).pop());
      })
      .then(session => {
        res.status(200).send({ success: true });
      })
      .catch(err => {
        // send user a message that their payment didn't go through
        logger.error(`POST on /confirm`, { err });
        send.sendMessageGeneric(
          senderId,
          "Sorry there was an error with processing your order. Please try again later."
        );
        res.status(500).send({ success: false });
      });
  }
});
// if there is no items in the delete request, return just the order... else loop through delete everything. at the end get the order and send it

module.exports = routes;
