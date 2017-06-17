const {Burger, Fry, Drink, Milkshake, Order, User } = require('./../index');
const mongoose = require('mongoose');
const orderDAO = {};


const populateOrder = function(operation) {
	return operation
		.populate("_drinks")
		.populate("_burgers")
		.populate("_milkshakes")
		.populate("_fries")
};


orderDAO.findAllOrders = function() {
	return new Promise ((resolve, reject) => {
		populateOrder(Order.find().sort({createdAt: -1}))
			.then((orders) => {
				resolve(orders);
			}).catch((err) => reject(err));
	});
};

orderDAO.findAllOrdersFromUser = function(UserID) {
	return new Promise ((resolve, reject) => {
		populateOrder(Order.find({_user: UserID}).sort({createdAt: -1}))
			.then((orders) => {
				resolve(orders);
			}).catch((err) => reject(err));
	});
};


orderDAO.findMostRecentUserOrder = function(userID, isConfirmed=false) {
	return new Promise ((resolve, reject) => {
		populateOrder(Order.findOne({_user: userID, isConfirmed: isConfirmed }).sort({createdAt: -1}))
			.then((order) => {
				resolve(order);
			}).catch((err) => reject(err));
	});
};


orderDAO.findByID = function(orderID) {
	// const ObjectID = mongoose.Types.ObjectId(orderID)
	return new Promise ((resolve, reject) => {
		populateOrder(Order.findOne({_id: orderID}))
		.then((order)=> resolve(order)).catch((err) => reject(err));
	});
};


orderDAO.confirmOrder = function(isConfirmed, orderID) {
	return new Promise ((resolve, reject) => {
		populateOrder(Order.findOneAndUpdate({_id: orderID}, {isConfirmed: isConfirmed}, {new: true}))
			.then((order) => {
				resolve(order);
			}).catch((err) => res.send(err));
	});
};


orderDAO.postNewOrder = function(userID) {
	return new Promise ((resolve, reject) => {
		const newOrder = new Order({
			_user: userID
		});

		newOrder.save()
			.then((order) => {
				resolve(order);
			}).catch((err) => reject(err));
	});
};


orderDAO.isTherePreviousOrderFromUser = function(UserID, isConfirmed=false) {
	return new Promise((resolve, reject) => {
		Order.find({_user: UserID})
			.then((orders) => {
				if (!orders.length) {
					reject(false);
				}
				else {
					resolve(true);
				}
			});
	});
};

module.exports = orderDAO; 