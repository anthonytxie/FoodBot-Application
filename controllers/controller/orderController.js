const orderController = {};
const orderDAO = require('./../../db/DAO/orderDAO');
const {promiseHelper} = require('./..//helpers/helper-functions');


orderController.initializeOrder = (req, res, result, session) => {
	promiseHelper(req,res, orderDAO.initializeOrder(session));
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