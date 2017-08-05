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
  let id = req.query.order;
  let burgerName = req.query.name;
  let senderId = req.query.sender;
  let burger = findItem(burgerName);
  console.log(burger);
  res.render("burgercustomize", {
    order_id: id,
    sender_id: senderId,
    burger: burger
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
      orderId: _order,
      foodObject: {
        patties: patties,
        itemName: itemName,
        premiumToppings: [...premiumToppings],
        standardToppings: [...standardToppings]
      }
    };
  };
  
  const burger = burgerFormat(req.body);
  itemDAO
    .postBurger(burger.foodObject, burger._order)
    .then(order => {
      return send.sendFarewellMessage(senderId);
    })
    .catch(err => console.log(err));
});

module.exports = routes;