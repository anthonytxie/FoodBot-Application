const orderController = {};
const orderDAO = require('./../../db/DAO/orderDAO');
const {promiseHelper} = require('./..//helpers/helper-functions');


orderController.initializeOrder = (req, res, result, session) => {
  orderDAO.initializeOrder(session)
   .then((order) => {
      res.setHeader('Content-Type', 'application/json'); 
      let body = {
        "speech": "you just added a burger",
        "displayText": "you just added a burger",
        "data": {},
        "contextOut" : {},
        "source": "foodbot"
      }
      res.send(body);
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