const orderController = {};
const orderDAO = require('./../../db/DAO/orderDAO');
const {promiseHelper} = require('./..//helpers/helper-functions');


orderController.initializeOrder = (req, res, result, session) => {
  orderDAO.initializeOrder(session)
   .then((order) => {
      res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
        res.send(JSON.stringify({ "speech": response, "displayText": response 
        //"speech" is the spoken version of the response, "displayText" is the visual version
        }));
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