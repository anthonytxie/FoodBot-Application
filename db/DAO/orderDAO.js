const {Burger, Fry, Drink, Milkshake, Order, User } = require('./../index');
const mongoose = require('mongoose');
const orderDAO = {};
const populateOrder  = require('./helperFunctions');


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


orderDAO.deleteItem = function(orderID,itemType,itemObject) {
	return new Promise((resolve, reject) => {
		populateOrder(Order.findOne({_id: orderID}))
			.then((order) => {
				if (itemType ==='burger') {
					Burger.findOneAndRemove({itemObject});
				}
				else if (itemType ==='milkshake') {
					Milkshake.findOneAndRemove({itemObject});
				}
				else if (itemType ==='drink') {
					Drink.findOneAndRemove({itemObject});
				}
				else if (itemType ==='fry') {
					Fry.findOneAndRemove({itemObject});
				}
			})
		.then((deletedItem) => {
			resolve(deletedItem);
		});
	});
};


orderDAO.deleteMostRecentItemAdded = function(orderID) {
	return new Promise ((resolve,reject) => {
		populateOrder(Order.findOne({_id: orderID}))
			.then((order) => {
				if (order.itemArray.length <= 0) {
					return resolve(order);
				}
				else {
					let mostRecentOrder = order.itemArray[0];
					return mostRecentOrder;
				}
			}).catch((err) => reject(err))
			.then((mostRecentOrder) => {
				let id = mongoose.Types.ObjectId(mostRecentOrder[0])
				if (mostRecentOrder[2] ==='burger') {
					return Burger.findOneAndRemove({_id: id})
				}
				else if (mostRecentOrder[2] ==='milkshake') {
					return Milkshake.findOneAndRemove({_id: id})
				}
				else if (mostRecentOrder[2] ==='drink') {
					return Drink.findOneAndRemove({_id: id})
				}
				else if (mostRecentOrder[2] ==='fry') {
					return Fry.findOneAndRemove({_id: id})
				}
			})
			.then(() => {
				return populateOrder(Order.findOne({_id: orderID}))
			})
			.then((order) => {
				resolve(order);
			})
	});
};

module.exports = orderDAO; 