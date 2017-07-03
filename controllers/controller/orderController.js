const orderController = {};
const orderDAO = require('./../../db/DAO/orderDAO');
const {promiseHelper, userPromiseHelper, orderPromiseHelper } = require('./..//helpers/helper-functions');



orderController.initializeOrder = (req, res, result, session) => {
	promiseHelper(req,res, orderDAO.initializeOrder(session));
};


orderController.confirmOrder = (req, res, result, session) => {
	orderPromiseHelper(req, res, orderDAO.confirmOrder(session));
};

orderController.unconfirmOrder = (req, res) => {
	orderPromiseHelper(req, res, orderDAO.unconfirmOrder(session));
};

orderController.deleteItem = (req, res) => {
	const order = req.session.order;
	const body = req.body;
	const type = req.body.type;
	orderPromiseHelper(req, res, orderDAO.deleteMostRecentItemAdded(order._id, req.body.type, req.body));
};

orderController.deleteMostRecentItem = (req, res) => {
	const order = req.session.order;
	orderPromiseHelper(req, res, orderDAO.deleteMostRecentItemAdded(order._id));
};




module.exports = orderController;