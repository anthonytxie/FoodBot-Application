// MODULES
const express = require("express");
const routes = express();
const mongoose = require("mongoose");
const { logger } = require("./../logger/logger");

// DAOS
const itemDAO = require("./../../db/DAO/itemDAO");
const orderDAO = require("./../../db/DAO/orderDAO");

//HELPER FUNCTIONS
const { premiumToppingsArray } = require("./../../config/toppings");
const { findMenuItemsByItemName } = require("./../../config/menuItems");

//SEND FUNCTIONS
const send = require("../../messenger-api-helpers/send");

routes.get("/burger", (req, res) => {
  let _link = req.query.linkId;
  let burgerName = req.query.name;
  let senderId = req.query.sender;
  let receipt = req.query.receipt;

  let burger = findMenuItemsByItemName(burgerName);
  orderDAO
    .getLastOrderBySender(senderId)
    .then(order => {
      return order._items
        .filter(x => x.itemType === "burger" && x._link)
        .find(x => x._link.equals(_link) && x._order.equals(order._id));
    })
    .then(item => {
      if (item) {
        res.status(200).render("burger", {
          sender_id: senderId,
          burger: item,
          _link: _link,
          receipt
        });
      } else {
        res.status(200).render("burger", {
          sender_id: senderId,
          burger: burger,
          _link: _link,
          receipt
        });
      }
    })
    .catch(err => {
      logger.error(`GET on /burger`, { err });
      res.status(500).send({ success: false });
    });
});

routes.post("/burger", (req, res) => {
  logger.info("POST on /burger");
  const sendMessage = parseInt(req.body.sendMessage);
  const burgerFormat = function(body) {
    let standardToppings = [];
    let premiumToppings = [];
    let Patties = parseFloat(body.Patties);
    let itemName = body.itemName;

    for (var key in body) {
      if (body.hasOwnProperty(key)) {
        if (body[key] == "true") {
          if (premiumToppingsArray.includes(key)) {
            premiumToppings.push(key.toString());
          } else {
            if (key != "beef") {
              standardToppings.push(key.toString());
            }
          }
        }
      }
    }
    return {
      _link: body._link,
      Patties: Patties,
      itemName: itemName,
      premiumToppings: [...premiumToppings],
      standardToppings: [...standardToppings]
    };
  };
  const senderId = req.body.sender_id;
  const linkId = req.body._link;
  const foodObject = burgerFormat(req.body);
  itemDAO
    .postBurger(foodObject, senderId)
    .then(() => {
      if (sendMessage) {
        return send.sendOrderedBurgerUpsizeMessage(senderId, linkId);
      }
    })
    .then(() => {
      return res.status(200).send({ success: true });
    })
    .catch(err => {
      logger.error(`POST on /burger`, { err });
      res.status(500).send({ success: false });
    });
});

module.exports = routes;
