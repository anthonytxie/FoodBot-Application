// MODULES
const express = require("express");
const routes = express();
const mongoose = require("mongoose");

// DAOS
const itemDAO = require("./../../db/DAO/itemDAO");
const orderDAO = require("./../../db/DAO/orderDAO");

//HELPER FUNCTIONS
const { premiumToppingsArray } = require("../../messenger-api-helpers/messages/toppings");
const { findItem } = require("../../messenger-api-helpers/messages/burgers");

//SEND FUNCTIONS
const send = require("../../messenger-api-helpers/send");

routes.get("/burgercustomize", (req, res) => {
  let id = req.query.order;
  let burgerName = req.query.name;
  let senderId = req.query.sender;
  let burgerObject = findItem(burgerName);
  res.render("burgercustomize", {
    order_id: id,
    sender_id: senderId,
    burgerObject: burgerObject
  });
});

routes.post("/burger", (req, res) => {
  const senderId = req.body.sender_id;
  const burgerFormat = function(body) {
    let standardToppings = [];
    let premiumToppings = [];
    let patties = parseFloat(body.patties);
    let itemName = body.title;
    let _order = mongoose.Types.ObjectId(body.order_id);
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
      _order: _order,
      patties: patties,
      itemName: itemName,
      premiumToppings: [...premiumToppings],
      standardToppings: [...standardToppings]
    };
  };
  const burgerObject = burgerFormat(req.body);
  itemDAO
    .postBurger(burgerObject, burgerObject._order)
    .then(order => {
      return send.sendOrderedBurgerUpsizeMessage(senderId, burgerObject, order);
    })
    .catch(err => console.log(err));
});

module.exports = routes;