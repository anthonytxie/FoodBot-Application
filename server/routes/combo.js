// MODULES
const express = require("express");
const routes = express();
const mongoose = require("mongoose");

//DAO
const itemDAO = require("./../../db/DAO/itemDAO");

//SEND FUNCTIONS
const send = require("../../messenger-api-helpers/send");

routes.get("/burgercombo", (req, res) => {
  let linkId = req.query.linkId;
  let senderId = req.query.sender;
  res.render("burgercombopage", { _link: linkId, sender_id: senderId }); //send back pug file
});

routes.post("/combo", (req, res) => {
  console.log(JSON.stringify(req.body));
  let senderId = req.body.sender_id;
  let linkId = req.body._link;

  const parseDrink = function(body) {
    switch (body.drink_type) {
      case "water":
        return "Water Bottle";
        break;
      case "soda":
        return body.soda_flavor;
        break;
      case "milkshake":
        if (body.milkshake_flavor === "strawberry") {
          return "Strawberry Milkshake";
        } else if (body.milkshake_flavor === "vanilla") {
          return "Vanilla Milkshake";
        } else if (body.milkshake_flavor === "chocolate") {
          return "Chocolate Milkshake";
        }
        break;
      default:
        console.log("no idea");
        break;
    }
  };

  const parseSide = function(body) {
    return body.food_type;
  };

  let sideObject = {
    linkId: linkId,
    itemName: parseSide(req.body),
    itemSize: "Medium",
    itemCombo: true
  };

  let drinkObject = {
    linkId: linkId,
    itemName: parseDrink(req.body),
    itemCombo: true
  };

  itemDAO
    .postDrink(drinkObject, senderId)
    .then(() => {
      return itemDAO.postSide(sideObject, senderId);
    })
    .then(side => {
      send.sendOrderedMessage(senderId, side);
    })
    .then(() => {
      res.status(200).send();
    })
    .catch(err => console.log(err));
});

module.exports = routes;
