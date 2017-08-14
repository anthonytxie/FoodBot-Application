// MODULES
const express = require("express");
const routes = express();
const mongoose = require("mongoose");

//DAO
const itemDAO = require("./../../db/DAO/itemDAO");

//SEND FUNCTIONS
const send = require("../../messenger-api-helpers/send");

routes.get("/burgercombo", (req, res) => {
  let orderId = req.query.order;
  let senderId = req.query.sender;
  res.render("burgercombopage", { order_id: orderId, sender_id: senderId }); //send back pug file
});

routes.post("/combo", (req, res) => {
  let orderId = mongoose.Types.ObjectId(req.body.order_id);
  let senderId = req.body.sender_id;

  const drinkObject = function(body) {
    switch (body.drink_type) {
      case "water":
        return "waterBottle";
        break;
      case "soda":
        return body.soda_flavor;
        break;
      case "milkshake":
        if (body.milkshake_flavor === "strawberry") {
          return "strawberryMilkshake";
        } else if (body.milkshake_flavor === "vanilla") {
          return "vanillaMilkshake";
        } else if (body.milkshake_flavor === "chocolate") {
          return "chocolateMilkshake";
        }
        break;
      default:
        console.log("no idea");
        break;
    }
  };

  const sideObject = function(body) {
    return body.food_type;
  };

  let side = {
    itemName: sideObject(req.body),
    itemSize: "medium",
    itemCombo: true
  };

  let drink = {
    itemName: drinkObject(req.body),
    itemCombo: true
  };

  itemDAO
    .postDrink(drink, orderId)
    .then(order => {
      if (!order) {
        send.sendComboError(senderId);
      } else {
        return itemDAO.postSide(side, orderId);
      }
    })
    .then(order => {
      if (order) {
        send.sendOrderedMessage(senderId, order);
      }
    })
    .then(() => {
      res.status(200).send()
    })
    .catch(err => console.log(err));
});

module.exports = routes;