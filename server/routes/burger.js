// MODULES
const express = require("express");
const routes = express();
const mongoose = require("mongoose");

// DAOS
const itemDAO = require("./../../db/DAO/itemDAO");
const orderDAO = require("./../../db/DAO/orderDAO");

//HELPER FUNCTIONS
const {
  premiumToppingsArray
} = require("../../messenger-api-helpers/messages/toppings");
const { findItem } = require("../../messenger-api-helpers/messages/menuItems");

//SEND FUNCTIONS
const send = require("../../messenger-api-helpers/send");

routes.get("/burgercustomize", (req, res) => {
  let _link = req.query.linkId;
  let burgerName = req.query.name;
  let senderId = req.query.sender;

  let burger = findItem(burgerName);
  console.log(burger);
  res.status(200).render("burgercustomize", {
    sender_id: senderId,
    burger: burger,
    _link: _link
  });
});

routes.post("/burger", (req, res) => {
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
      return send.sendOrderedBurgerUpsizeMessage(senderId, linkId);
    })
    .then(() => {
      return res.status(200).send();
    })
    .catch(err => console.log(err));
});

module.exports = routes;
