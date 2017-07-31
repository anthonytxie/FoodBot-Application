const express = require("express");
const routes = express();
const mongoose = require("mongoose");
const {
  handleReceivePostback
} = require("../../messenger-api-helpers/receive/receivePostback");
const {
  handleReceiveMessage
} = require("../../messenger-api-helpers/receive/receiveMessage");
const sessionDAO = require("./../../db/DAO/sessionDAO");
const runner = require("../../messenger-api-helpers/runner");
const orderDAO = require("./../../db/DAO/orderDAO");
const itemDAO = require("./../../db/DAO/itemDAO");
const {
  premiumToppingsArray
} = require("../../messenger-api-helpers/messages/toppings");

const {
  normalBurgers,
  specialBurgers,
  findBurger
} = require("../../messenger-api-helpers/messages/burgers");
// Verify Token
//need to put secret in process.env

routes.get("/", (req, res) => {
  res.send("hello welcome to foodbot api");
});

routes.get("/burgercombo", (req, res) => {
  let orderId = req.query.order;
  let senderId = req.query.sender;
  res.render("burgercombopage", { order_id: orderId, sender_id: senderId }); //send back pug file
});

routes.post("/burger", (req, res) => {
  const senderId = req.query.sender;
  const burgerFormat = function(body) {
    let standardToppings = [];
    let premiumToppings = [];
    let patties = parseFloat(body.patties);
    let itemName = body.title
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
  console.log(burgerObject);
  itemDAO
    .postBurger(burgerFormat(burgerObject), burgerObject._order)
    .then(order => {
      send.sendOrderedBurgerUpsizeMessage(senderId, burgerObject, order);
    });
});

routes.post("/combo", (req, res) => {
  console.log(req.body);
  const drinkObject = function(body) {
    switch (body.drinkType) {
      case "water":
        return "waterBottle";
        break;
      case "soda":
        return body.drinkName;
        break;
      case "milkshake":
        if (body.milkshakeFlavor === "strawberry") {
          return "strawberryMilkshake";
        } else if (body.milkshakeFlavor === "vanilla") {
          return "vanillaMilkshake";
        } else if (body.milkshakeFlavor === "chocolate") {
          return "chocolateMilkshake";
        }
        break;
      default:
        console.log("no idea");
        break;
    }
  };

  const sideObject = function(body) {
    return body.fries;
  };
});
routes.get("/testlog", (req, res) => {
  console.log({ type: "Fiat", model: "500", color: "white" });
});

routes.get("/receipt", (req, res) => {
  let orderId = req.query.order;
  orderDAO.getOrderById(orderId).then(order => {
    res.render("receipt", { order: order });
  });
});

routes.get("/burgercustomize", (req, res) => {
  let id = req.query.order;
  let burgerName = req.query.name;
  let senderId = req.query.sender;
  let burgerObject = findBurger(burgerName);
  orderDAO.getOrderById(id).then(order => {
    res.render("burgercustomize", {
      order_id: id,
      sender_id: senderId,
      burgerObject: burgerObject
    });
  });
});

routes.get("/isActiveSession", (req, res) => {
  sessionDAO
    .isSessionActive("1234676803307932")
    .then(isSessionActive => {
      res.send(isSessionActive);
    })
    .catch(err => res.send(err));
});

routes.get("/webhook", (req, res) => {
  if (req.query["hub.verify_token"] === process.env.secret) {
    res.send(req.query["hub.challenge"]);
  } else {
    res.send("Error, wrong token");
  }
});

routes.get("/orders", (req, res) => {
  orderDAO
    .getAllOrders()
    .then(orders => {
      res.send(orders);
    })
    .catch(err => res.send(err));
});

routes.post("/webhook", (req, res) => {
  /*
    You must send back a status of 200(success) within 20 seconds
    to let us know you've successfully received the callback.
    Otherwise, the request will time out.

    When a request times out from Facebook the service attempts
    to resend the message.

    This is why it is good to send a response immediately so you
    don't get duplicate messages in the event that a request takes
    awhile to process.
  */
  res.sendStatus(200);

  const data = req.body;

  // Make sure this is a page subscription
  if (data.object === "page") {
    // Iterate over each entry
    // There may be multiple if batched
    data.entry.forEach(pageEntry => {
      // Iterate over each messaging event and handle accordingly
      pageEntry.messaging.forEach(messagingEvent => {
        console.log({ messagingEvent });
        if (messagingEvent.postback) {
          handleReceivePostback(messagingEvent);
        } else if (messagingEvent.message) {
          handleReceiveMessage(messagingEvent);
        } else if (messagingEvent.delivery) {
          console.log("delivery");
        } else if (messagingEvent.read) {
          console.log("read");
        } else if (messagingEvent.optin) {
          console.log("auth log in");
        } else if (messagingEvent.account_linking) {
          console.log("account link");
        } else {
          console.log(
            "Webhook received unknown messagingEvent: ",
            messagingEvent
          );
        }
      });
    });
  }
});

// const postBody =
// { order_id: '597eb88e157115001155186f',
//   sender_id: '1435338713202002',
//   title: 'Single Bacon Cheeseburger',
//   patties: '1',
//   beef: 'true',
//   chickenPatty: '',
//   standardBun: 'true',
//   lettuceBun: '',
//   glutenFreeBun: '',
//   grilledCheeseBun: '',
//   ketchup: '',
//   mustard: '',
//   mayo: '',
//   relish: '',
//   fancySauce: '',
//   hotSauce: '',
//   lettuce: '',
//   tomatoes: '',
//   pickles: '',
//   hotPepper: '',
//   onions: '',
//   bacon: 'true',
//   standardCheese: 'true',
//   americanCheese: '',
//   blueCheese: '',
//   caramelizedOnions: '',
//   stuffedPortobello: '',
//   sauteedMushrooms: '',
//   cheeseSauce: 'true',
//   gravySide: '' }

// const createBurger = function(body) {
//   let standardToppings = [];
//   let premiumToppings = [];
//   let patties = parseFloat(body.patties);
//   let itemName = body.title;
//   let _order = body.order_id;
//   for (var key in body) {
//     if (body.hasOwnProperty(key)) {
//       if (body[key] == "true") {
//         if (premiumToppingsArray.includes(key)) {
//           premiumToppings.push(key);
//         } else {
//           if (key != 'beef')
//           standardToppings.push(key);
//         }
//       }
//     }
//   }

//   return {
//     _order: _order,
//     patties: patties,
//     itemName: itemName,
//     premiumToppings: [...premiumToppings],
//     standardToppings: [...standardToppings]
//   };
// };

// console.log(createBurger(postBody))

// const milkshakeBody = {
//   fries: "cheesyFries",
//   drinkType: "milkshake",
//   milkshakeFlavor: 'strawberry',
//   drinkName: ""
// };

// const popBody = {
//   fries: "cheesyFries",
//   drinkType: "soda",
//   milkshakeFlavor: '',
//   drinkName: "dr.pepper"
// };

// const waterBody = {
//   fries: "cheesyFries",
//   drinkType: "water",
//   milkshakeFlavor: '',
//   drinkName: ""
// };

// const drinkObject = function(body) {
//   switch(body.drinkType) {
//     case "water":
//       return 'waterBottle'
//       break;
//     case "soda":
//       return body.drinkName
//       break;
//     case "milkshake":
//       if (body.milkshakeFlavor === 'strawberry'){
//         return 'strawberryMilkshake';
//       }
//       else if (body.milkshakeFlavor === 'vanilla') {
//         return 'vanillaMilkshake';
//       }
//       else if (body.milkshakeFlavor === 'chocolate') {
//         return 'chocolateMilkshake';
//       }
//       break;
//     default:
//       console.log('no idea');
//       break;
//   }
// }

// const sideObject = function(body) {
//   return body.fries
// }

// console.log(drinkObject(popBody))
// console.log(sideObject(popBody))
module.exports = routes;