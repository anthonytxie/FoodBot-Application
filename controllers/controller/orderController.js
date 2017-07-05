const orderController = {};
const orderDAO = require('./../../db/DAO/orderDAO');
const {promiseHelper} = require('./..//helpers/helper-functions');


orderController.initializeOrder = (req, res, result, session) => {
  orderDAO.initializeOrder(session)
   .then((order) => {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Authorization', 'Bearer ' + 'a92a16035b1b441897e1654f7e17478a' )
      let body =  {
        speech: 'Hello you just got yourself initialized!',
        displayText: 'Hello you just got yourself initialized!',
        data: {},
        contextOut: [],
        source: "Pepe",
        followupEvent: {}
      };
      return res.send(body);    
      });
};


orderController.showOrderDetails = (req, res, result, session) => {
  orderDAO.showOrderDetails(session)
  .then((order) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Authorization', 'Bearer ' + 'a92a16035b1b441897e1654f7e17478a' )
    let body = {
      speech: `On your current order is ${order._burgers.length} burgers, ${order._drinks.length} drinks, ${order._fries.length} fries, ${order._milkshakes.length} milkshakes`,
      displayText: `On your current order is ${order._burgers.length} burgers, ${order._drinks.length} drinks, ${order._fries.length} fries, ${order._milkshakes.length} milkshakes`,
      data: {},
      contextOut: [],
      source: "Pepe",
      followupEvent: {}
    };
    res.send(body);
  });
};



orderController.confirmOrder = (req, res, result, session) => {
	orderDAO.confirmOrder(session)
    .then((order) => {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Authorization', 'Bearer ' + 'a92a16035b1b441897e1654f7e17478a' )
      let body = {
        displayText: `Got it! Would you like to pick it up or deliver it?`,
        data: {},
        contextOut: [],
        source: "Pepe",
        followupEvent: {}
      };
      res.send(body);
    });
};



orderController.unconfirmOrder = (req, res, result, session) => {
orderDAO.unconfirmOrder(session)
  .then((order) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Authorization', 'Bearer ' + 'a92a16035b1b441897e1654f7e17478a' )
    let body = {
      displayText: `Okay order unconfirmed! What kind of changes would you like to make to your order?`,
      data: {},
      contextOut: [],
      source: "Pepe",
      followupEvent: {}
    };
    res.send(body);
  });
};


orderController.deleteMostRecentItem = (req, res, result, session) => {
  orderDAO.deleteMostRecentItemAdded(session)
   .then((item) => {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Authorization', 'Bearer ' + 'a92a16035b1b441897e1654f7e17478a' )
      let displayText;
      if (!item.itemType) {
        displayText = "There's nothing on this order to get rid of!" 
      }
      else {
        displayText = `Ok I got rid of that one ${item.itemType} for you`
      }

      let body = {
        displayText,
        data: {},
        contextOut: [],
        source: "Pepe",
        followupEvent: {}
      };
      res.send(body);
    });
};




module.exports = orderController;