const orderController = {};
const orderDAO = require('./../db/dao/orderDAO');
const promiseHelper = require('./helper-functions');



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
  promiseHelper(req,res,orderDAO.postNewOrder(user._id));
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







module.exports = orderController;