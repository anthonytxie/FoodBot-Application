const orderController = {};
const orderDAO = require('./../../db/DAO/orderDAO');
const {promiseHelper, userPromiseHelper, orderPromiseHelper } = require('./..//helpers/helper-functions');


orderController.userPreviousOrder = (req, res) => {
	const user = req.session.user;
	const { isConfirmed } = req.body;
	orderDAO.findMostRecentUserOrder(user._id, isConfirmed)
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



orderController.postNewOrder = (req, res) => {
  const user = req.session.user;
  orderPromiseHelper(req, res, orderDAO.postNewOrder(user._id));
};


orderController.getAllOrdersFromUser = (req, res) => {
	const user = req.session.user;
	promiseHelper(req, res, orderDAO.findAllOrdersFromUser(user._id));
};

orderController.getAllOrders = (req, res) => {
	promiseHelper(req, res, orderDAO.findAllOrders());
};


orderController.getOrderByID = (req, res) => {
	const order = req.session.order;
	promiseHelper(req, res, orderDAO.findByID(order._id));
};


orderController.getCurrentOrder = (req ,res) => {
	const order = req.session.order;
	res.send(order);
};

orderController.confirmOrder = (req, res) => {
	const order = req.session.order;
	orderPromiseHelper(req, res, orderDAO.confirmOrder(true, order._id));
};

orderController.unconfirmOrder = (req, res) => {
	const order = req.session.order;
	orderPromiseHelper(req, res, orderDAO.confirmOrder(false, order._id));
};

orderController.deleteMostRecentItem = (req, res) => {
	const order = req.session.order;
	orderPromiseHelper(req, res, orderDAO.deleteMostRecentItemAdded(order._id));
}




module.exports = orderController;