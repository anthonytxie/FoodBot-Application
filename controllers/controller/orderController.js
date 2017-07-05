const orderController = {};
const orderDAO = require('./../../db/DAO/orderDAO');
const {promiseHelper} = require('./..//helpers/helper-functions');


orderController.initializeOrder = (req, res, result, session) => {
  orderDAO.initializeOrder(session)
   .then((order) => {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Authorization', 'Bearer ' + 'a92a16035b1b441897e1654f7e17478a' )
      let body =  {
        speech: 'Get your pepes at Burger Burger!',
        displayText: 'Get your pepes at Burger Burger! Get your pepes!!!',
        data: {},
        contextOut: [],
        source: "Pepe",
        followupEvent: {}
      };
      return res.send(body);    
      });
};





orderController.confirmOrder = (req, res, result, session) => {
	promiseHelper(req, res, orderDAO.confirmOrder(session));
};

orderController.unconfirmOrder = (req, res, result, session) => {
	promiseHelper(req, res, orderDAO.unconfirmOrder(session));
};


orderController.deleteMostRecentItem = (req, res, result, session) => {
	promiseHelper(req, res, orderDAO.deleteMostRecentItemAdded(session));
};




module.exports = orderController;