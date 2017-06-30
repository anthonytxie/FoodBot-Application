const orderController = {};
const orderDAO = require('./../../db/DAO/orderDAO');
const {promiseHelper, userPromiseHelper, orderPromiseHelper } = require('./..//helpers/helper-functions');


orderController.sessionPreviousOrder = (req, res, result, session) => {
	const { isConfirmed } = result;
	orderDAO.findMostRecentSessionOrder(session, isConfirmed)
		.then((order) => {
			if(!order) {
				return res.send('no previous orders');
			}
			else {
				req.session.order = order;
				res.send(order);
			}
		}).catch((err) => {res.send(err)});
};



orderController.postNewOrder = (req, res, result, session) => {
  promiseHelper(req, res, orderDAO.postNewOrder(session));
};


orderController.findAllOrdersFromSession = (req, res, result, session) => {
	promiseHelper(req, res, orderDAO.findAllOrdersFromUser(session));
};

orderController.getAllOrders = (req, res) => {
	promiseHelper(req, res, orderDAO.findAllOrders());
};


orderController.getOrderByID = (req, res, orderId) => {
	promiseHelper(req, res, orderDAO.findByID(orderId));
};


orderController.confirmOrder = (req, res) => {
	const order = req.session.order;
	orderPromiseHelper(req, res, orderDAO.confirmOrder(true, order._id));
};

orderController.unconfirmOrder = (req, res) => {
	const order = req.session.order;
	orderPromiseHelper(req, res, orderDAO.confirmOrder(false, order._id));
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